'use strict';
/* global hashwasm, TYPES, typeOf, extLabel, el, fmtDate, fmtSize, expiryInfo, needsAttention, mainValue, masked */
// Cassaforte per iPhone — sola consultazione.
// Il file «Cassaforte per iPhone» (preparato dall'app Mac) viene conservato cifrato in questo
// browser; si decifra in memoria con la password e nulla viene mai inviato in rete.

const $ = (id) => document.getElementById(id);
const CATS = [
  ['all', 'Tutti'], ['expiring', 'In scadenza'], ['identita', 'Identità'], ['viaggio', 'Viaggio'],
  ['veicoli', 'Guida e veicoli'], ['salute', 'Salute'], ['altro', 'Altro'],
];
const VIEWABLE_IMG = /^image\/(jpeg|png|gif|webp|bmp|heic|heif|tiff)$/;

const state = {
  pack: null, // { header, get(id) }
  meta: null, // { importedAt, createdAt, name }
  dek: null,
  data: null,
  filter: 'all',
  query: '',
  doc: null,
  blobs: new Map(), // id -> { blob, url }
};

// ---------- Archivio locale (IndexedDB): contiene solo il pacchetto cifrato ----------
function idb() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open('cassaforte', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('pack');
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
async function idbDo(mode, fn) {
  const db = await idb();
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction('pack', mode).objectStore('pack'));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
const idbGet = (k) => idbDo('readonly', (s) => s.get(k));
const idbSet = (k, v) => idbDo('readwrite', (s) => s.put(v, k));
const idbDel = (k) => idbDo('readwrite', (s) => s.delete(k));

// ---------- Pacchetto e cifratura (compatibili con l'app Mac) ----------
function parsePack(buf) {
  const u = new Uint8Array(buf);
  if (u.length < 12 || new TextDecoder().decode(u.subarray(0, 8)) !== 'CFPACK01') {
    throw new Error('Questo non è il file «Cassaforte per iPhone». Lo trovi in iCloud Drive › Cassaforte.');
  }
  const len = new DataView(buf).getUint32(8);
  const header = JSON.parse(new TextDecoder().decode(u.subarray(12, 12 + len)));
  if (header.format !== 'cassaforte-pack' || header.version !== 1) throw new Error('Versione del file non supportata: aggiorna la web app.');
  const base = 12 + len;
  const index = new Map(header.attachments.map((a) => [a.id, a]));
  return {
    header,
    get: (id) => {
      const a = index.get(id);
      return a ? u.slice(base + a.offset, base + a.offset + a.length) : null;
    },
  };
}

const b64d = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const concat = (a, b) => {
  const o = new Uint8Array(a.length + b.length);
  o.set(a);
  o.set(b, a.length);
  return o;
};
const aesKey = (raw) => crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']);
const openBox = async (key, box) =>
  new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64d(box.iv) }, key, concat(b64d(box.ct), b64d(box.tag))));
const openRaw = async (key, raw) =>
  new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: raw.slice(0, 12) }, key, concat(raw.slice(28), raw.slice(12, 28))));

async function unlockWith(password) {
  const v = state.pack.header.vault;
  const { salt, N, r, p } = v.kdf;
  const kek = await hashwasm.scrypt({
    password: password.normalize('NFC'), salt: b64d(salt), costFactor: N, blockSize: r, parallelism: p, hashLength: 32, outputType: 'binary',
  });
  let dekRaw;
  try {
    dekRaw = await openBox(await aesKey(kek), v.key);
  } catch {
    throw Object.assign(new Error('Password errata.'), { wrong: true });
  } finally {
    kek.fill(0);
  }
  const dek = await aesKey(dekRaw);
  dekRaw.fill(0);
  const data = JSON.parse(new TextDecoder().decode(await openBox(dek, v.data)));
  state.dek = dek;
  state.data = data;
}

async function fileBlob(id, mime) {
  if (state.blobs.has(id)) return state.blobs.get(id);
  const raw = state.pack.get(id);
  if (!raw) throw new Error('Allegato non presente in questa copia: aggiornala dal Mac.');
  const blob = new Blob([await openRaw(state.dek, raw)], { type: mime });
  const entry = { blob, url: URL.createObjectURL(blob) };
  state.blobs.set(id, entry);
  return entry;
}

// ---------- Schermate ----------
function show(id) {
  for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
}

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 2200);
}

const fmtStamp = (iso) => new Date(iso).toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

function showSetup(error = '') {
  lockNow(true);
  $('setup-err').textContent = error;
  $('install-hint').hidden = standalone();
  show('s-setup');
}

function showLock(message = '') {
  show('s-lock');
  $('lock-sub').textContent = state.meta?.createdAt ? `Copia del ${fmtStamp(state.meta.createdAt)}` : '';
  $('lock-err').textContent = message;
  $('pw').value = '';
}

// ---------- Importazione del file ----------
document.addEventListener('click', (e) => {
  if (e.target.closest('.pick-file')) {
    $('file-input').value = '';
    $('file-input').click();
  }
});

$('file-input').addEventListener('change', async () => {
  const file = $('file-input').files[0];
  if (!file) return;
  try {
    const buf = await file.arrayBuffer();
    const pack = parsePack(buf);
    const meta = { name: file.name, importedAt: new Date().toISOString(), createdAt: pack.header.createdAt };
    await idbSet('current', { buf, meta });
    if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
    const wasOpen = !!state.data;
    lockNow(true);
    state.pack = pack;
    state.meta = meta;
    showLock(wasOpen ? 'Dati aggiornati: inserisci di nuovo la password.' : '');
    toast(`Copia del ${fmtStamp(meta.createdAt)} caricata`);
  } catch (err) {
    if (state.pack) showLock(err.message);
    else showSetup(err.message);
  }
});

$('forget').onclick = async () => {
  if (!confirm('Rimuovere la copia cifrata da questo iPhone? I documenti sul Mac e in iCloud non vengono toccati.')) return;
  await idbDel('current');
  state.pack = null;
  state.meta = null;
  showSetup();
};

// ---------- Sblocco / blocco ----------
$('lock-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pw = $('pw').value;
  if (!pw) return;
  const btn = $('unlock-btn');
  btn.disabled = true;
  btn.textContent = 'Sblocco in corso…';
  $('lock-err').textContent = '';
  await new Promise((r) => setTimeout(r, 30)); // lascia aggiornare il pulsante prima del calcolo
  try {
    await unlockWith(pw);
    $('pw').value = '';
    $('pw').blur();
    state.filter = 'all';
    state.query = '';
    $('search').value = '';
    renderList();
    show('s-list');
    resetIdle();
  } catch (err) {
    $('lock-err').textContent = err.wrong ? 'Password errata.' : 'Impossibile aprire la copia: ' + err.message;
    $('lock-form').classList.remove('shake');
    void $('lock-form').offsetWidth;
    $('lock-form').classList.add('shake');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sblocca';
  }
});

function lockNow(silent = false) {
  state.dek = null;
  state.data = null;
  state.doc = null;
  for (const { url } of state.blobs.values()) URL.revokeObjectURL(url);
  state.blobs.clear();
  closeViewer();
  closeSheet();
  $('list').replaceChildren();
  $('detail').replaceChildren();
  clearTimeout(idleTimer);
  if (!silent && state.pack) showLock();
}
$('lock-btn').onclick = () => lockNow();

// Blocco automatico: inattività (stesso tempo scelto sul Mac) e app in background per oltre un minuto.
let idleTimer = null;
function resetIdle() {
  clearTimeout(idleTimer);
  if (!state.data) return;
  const min = state.data.settings?.autoLockMin || 5;
  idleTimer = setTimeout(() => lockNow(), min * 60000);
}
for (const ev of ['touchstart', 'keydown', 'scroll', 'click']) window.addEventListener(ev, resetIdle, { passive: true, capture: true });
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('veil', document.hidden && !!state.data);
  if (document.hidden) hiddenAt = Date.now();
  else if (state.data && Date.now() - hiddenAt > 60000) lockNow();
});

// ---------- Elenco ----------
function visibleDocs() {
  const q = state.query.trim().toLowerCase();
  let docs = state.data.documents.slice();
  if (state.filter === 'expiring') docs = docs.filter(needsAttention);
  else if (state.filter !== 'all') docs = docs.filter((d) => typeOf(d).cat === state.filter);
  if (q) {
    docs = docs.filter((d) =>
      [d.title, d.holder, d.notes, typeOf(d).label, ...Object.values(d.fields || {}), ...(d.custom || []).flatMap((c) => [c.label, c.value])]
        .join(' ').toLowerCase().includes(q));
  }
  const ord = Object.keys(TYPES);
  return docs.sort((a, b) =>
    state.filter === 'expiring'
      ? (expiryInfo(a)?.days ?? 1e9) - (expiryInfo(b)?.days ?? 1e9)
      : ord.indexOf(a.type) - ord.indexOf(b.type) || (a.holder || '').localeCompare(b.holder || '') || a.title.localeCompare(b.title));
}

function renderList() {
  const all = state.data.documents;
  const hot = all.filter(needsAttention);
  $('chips').replaceChildren(...CATS.map(([id, label]) => {
    const n = id === 'all' ? all.length : id === 'expiring' ? hot.length : all.filter((d) => typeOf(d).cat === id).length;
    if (!n && id !== 'all' && id !== state.filter) return null;
    return el('button', {
      type: 'button', class: 'chip' + (state.filter === id ? ' on' : '') + (id === 'expiring' && n ? ' hot' : ''),
      onclick: () => { state.filter = id; renderList(); },
    }, label, el('span', { class: 'n' }, n));
  }).filter(Boolean));

  const alert = $('alert');
  const expired = hot.filter((d) => expiryInfo(d).cls === 'expired').length;
  alert.hidden = !hot.length || state.filter === 'expiring';
  alert.textContent = expired
    ? `⚠︎ ${expired === 1 ? '1 documento scaduto' : expired + ' documenti scaduti'}${hot.length > expired ? ` e ${hot.length - expired} in scadenza` : ''}`
    : `⏳ ${hot.length === 1 ? '1 documento scade' : hot.length + ' documenti scadono'} entro 90 giorni`;
  alert.onclick = () => { state.filter = 'expiring'; renderList(); };

  const docs = visibleDocs();
  $('list').replaceChildren(...(docs.length ? docs.map((d) => {
    const t = typeOf(d);
    const exp = expiryInfo(d);
    return el('li', {}, el('button', { class: 'item', type: 'button', onclick: () => openDetail(d) },
      el('div', { class: 'badge', style: `--h:${t.hue}` }, t.emoji),
      el('div', { class: 'item-main' },
        el('div', { class: 'item-title' }, d.title),
        el('div', { class: 'item-sub' }, [d.holder, masked(mainValue(d))].filter(Boolean).join(' · ') || t.label),
        exp || d.files?.length ? el('div', { class: 'item-meta' },
          exp ? el('span', { class: 'pill ' + exp.cls }, exp.short) : null,
          d.files?.length ? el('span', { class: 'pill neutral' }, `📎 ${d.files.length}`) : null) : null),
      el('span', { class: 'chev', html: '<svg viewBox="0 0 20 20"><path d="M7.5 4l6 6-6 6"/></svg>' })));
  }) : [el('li', { class: 'empty' }, all.length ? 'Nessun risultato.' : 'Nessun documento in questa copia.')]));

  $('pack-date').textContent = state.meta?.createdAt ? `Dati del ${fmtStamp(state.meta.createdAt)}` : '';
}

$('search').addEventListener('input', (e) => { state.query = e.target.value; renderList(); });

// ---------- Dettaglio ----------
async function copy(label, value) {
  try {
    await navigator.clipboard.writeText(value);
    toast(`${label} copiato`);
  } catch {
    toast('Copia non riuscita');
  }
}

function openDetail(doc) {
  state.doc = doc;
  const t = typeOf(doc);
  const exp = expiryInfo(doc);
  const rows = [];
  const row = (label, value, mono) => rows.push(el('button', { class: 'field', type: 'button', onclick: () => copy(label, value) },
    el('span', { class: 'k' }, label), el('span', { class: 'v' + (mono ? ' mono' : '') }, value), el('span', { class: 'cp' }, 'Copia')));
  if (doc.holder) row('Intestatario', doc.holder);
  for (const f of t.fields) if (doc.fields[f.k]) row(f.l, f.t === 'date' ? fmtDate(doc.fields[f.k]) : doc.fields[f.k], f.mono);
  for (const c of doc.custom || []) if (c.value) row(c.label || 'Campo', c.value);

  const thumbs = (doc.files || []).map((f, i) => {
    const img = el('div', { class: 'thumb-img loading' });
    const id = f.thumb || (VIEWABLE_IMG.test(f.mime) ? f.id : null);
    if (id) {
      fileBlob(id, f.thumb ? 'image/jpeg' : f.mime)
        .then(({ url }) => { img.style.backgroundImage = `url("${url}")`; })
        .catch(() => img.append(el('span', { class: 'ph' }, '⚠︎')))
        .finally(() => img.classList.remove('loading'));
    } else {
      img.classList.remove('loading');
      img.append(el('span', { class: 'ph' }, extLabel(f) || 'FILE'));
    }
    return el('button', { class: 'thumb', type: 'button', onclick: () => openViewer(doc, i) },
      img, el('span', { class: 'thumb-name' }, el('b', {}, extLabel(f)), ' ', f.name));
  });

  $('detail').replaceChildren(...[
    el('div', { class: 'd-head' },
      el('div', { class: 'badge lg', style: `--h:${t.hue}` }, t.emoji),
      el('h2', {}, doc.title),
      el('div', { class: 'd-sub' }, t.label),
      exp ? el('span', { class: 'pill ' + exp.cls }, exp.label) : null),
    rows.length ? el('div', { class: 'group' }, ...rows) : el('p', { class: 'hint' }, 'Nessun dato inserito.'),
    rows.length ? el('p', { class: 'hint' }, 'Tocca un dato per copiarlo.') : null,
    doc.notes ? [el('div', { class: 'group-title' }, 'Note'), el('div', { class: 'group notes' }, doc.notes)] : null,
    thumbs.length ? [el('div', { class: 'group-title' }, `Scansioni e foto (${thumbs.length})`), el('div', { class: 'thumbs' }, ...thumbs)] : null,
  ].flat().filter(Boolean));
  $('detail').scrollTop = 0;
  show('s-detail');
}

$('back').onclick = () => {
  state.doc = null;
  renderList();
  show('s-list');
};

// ---------- Visualizzatore ----------
const viewer = { doc: null, index: 0, file: null };

async function openViewer(doc, index) {
  const n = doc.files.length;
  viewer.doc = doc;
  viewer.index = (index + n) % n;
  const f = doc.files[viewer.index];
  viewer.file = null;
  $('viewer-name').textContent = f.name;
  $('viewer-dots').replaceChildren(...(n > 1 ? doc.files.map((_, i) => el('span', { class: i === viewer.index ? 'on' : '' })) : []));
  const body = $('viewer-body');
  body.replaceChildren(el('div', { class: 'spinner' }));
  $('viewer').hidden = false;
  try {
    const { blob, url } = await fileBlob(f.id, f.mime);
    if (viewer.doc !== doc || doc.files[viewer.index] !== f) return;
    viewer.file = new File([blob], f.name, { type: f.mime });
    if (f.mime === 'application/pdf') {
      body.replaceChildren(
        el('iframe', { src: url, title: f.name }),
        el('button', { class: 'vbtn solid open-pdf', type: 'button', onclick: shareViewerFile }, 'Apri il PDF completo'));
    } else {
      const img = el('img', { src: url, alt: f.name });
      img.onerror = async () => {
        // formato non supportato da questo iPhone: si mostra l'anteprima creata dal Mac
        if (f.thumb) img.src = (await fileBlob(f.thumb, 'image/jpeg')).url;
      };
      body.replaceChildren(img);
    }
  } catch (err) {
    body.replaceChildren(el('p', { class: 'viewer-msg' }, err.message));
  }
}

function closeViewer() {
  $('viewer').hidden = true;
  $('viewer-body').replaceChildren();
  viewer.doc = null;
  viewer.file = null;
}
$('viewer-close').onclick = closeViewer;

async function shareViewerFile() {
  if (!viewer.file) return;
  if (navigator.canShare?.({ files: [viewer.file] })) {
    try { await navigator.share({ files: [viewer.file] }); } catch { /* annullato */ }
  } else toast('La condivisione dei file non è disponibile su questo browser');
}
$('viewer-share').onclick = shareViewerFile;

// scorrimento orizzontale tra gli allegati
let touchX = null;
$('viewer-body').addEventListener('touchstart', (e) => {
  touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
}, { passive: true });
$('viewer-body').addEventListener('touchend', (e) => {
  if (touchX == null || !viewer.doc || viewer.doc.files.length < 2) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 60 && window.visualViewport?.scale <= 1.01) openViewer(viewer.doc, viewer.index + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

// ---------- Condivisione ----------
function sheetText(doc) {
  const t = typeOf(doc);
  const lines = [`${doc.title}${doc.holder ? ' — ' + doc.holder : ''}`, t.label, ''];
  for (const f of t.fields) if (doc.fields[f.k]) lines.push(`${f.l}: ${f.t === 'date' ? fmtDate(doc.fields[f.k]) : doc.fields[f.k]}`);
  for (const c of doc.custom || []) if (c.value) lines.push(`${c.label || 'Campo'}: ${c.value}`);
  if (doc.notes) lines.push('', 'Note: ' + doc.notes);
  return lines.join('\n');
}

function closeSheet() {
  $('sheet').hidden = true;
}
$('sheet').addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeSheet(); });

// I file vengono preparati all'apertura del foglio: iOS permette di condividere
// solo in risposta diretta a un tocco, senza attese intermedie.
async function openShareSheet(doc) {
  const n = doc.files?.length || 0;
  let files = null;
  const filesBtn = el('button', { type: 'button', class: 'sheet-btn', disabled: true, onclick: async () => {
    if (!files) return;
    if (!navigator.canShare?.({ files })) return toast('La condivisione dei file non è disponibile su questo browser');
    closeSheet();
    try { await navigator.share({ files }); } catch { /* annullato */ }
  } }, n ? `Scansioni e foto (${n})` : 'Nessuna scansione');
  $('sheet-title').textContent = 'I dati condivisi escono dalla cassaforte non cifrati';
  $('sheet-actions').replaceChildren(
    filesBtn,
    el('button', { type: 'button', class: 'sheet-btn', onclick: async () => {
      closeSheet();
      if (navigator.share) {
        try { await navigator.share({ title: doc.title, text: sheetText(doc) }); } catch { /* annullato */ }
      } else copy('Testo', sheetText(doc));
    } }, 'Dati come testo'),
    el('button', { type: 'button', class: 'sheet-btn', onclick: () => { closeSheet(); copy('Dati', sheetText(doc)); } }, 'Copia tutti i dati'));
  $('sheet').hidden = false;
  if (n) {
    filesBtn.textContent = 'Preparazione…';
    try {
      files = await Promise.all(doc.files.map(async (f) => new File([(await fileBlob(f.id, f.mime)).blob], f.name, { type: f.mime })));
      filesBtn.disabled = false;
      filesBtn.textContent = `Scansioni e foto (${n})`;
    } catch (err) {
      filesBtn.textContent = err.message;
    }
  }
}
$('detail-share').onclick = () => state.doc && openShareSheet(state.doc);

// ---------- Avvio ----------
async function start() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  if (!window.crypto?.subtle) return showSetup('Apri la web app da un indirizzo https (es. GitHub Pages).');
  try {
    const saved = await idbGet('current');
    if (saved) {
      state.pack = parsePack(saved.buf);
      state.meta = saved.meta;
      return showLock();
    }
  } catch {
    /* copia illeggibile: si riparte dalla scelta del file */
  }
  showSetup();
}

// usato dai test automatici per caricare un pacchetto senza il selettore di iOS
window.__loadPackForTest = async (buf) => {
  const pack = parsePack(buf);
  const meta = { name: 'test', importedAt: new Date().toISOString(), createdAt: pack.header.createdAt };
  await idbSet('current', { buf, meta });
  state.pack = pack;
  state.meta = meta;
  showLock();
};

start();
