'use strict';
// Modello dei documenti condiviso tra l'app Mac e la web app iPhone:
// tipi, campi, scadenze e formattazione. Modificalo qui e rigenera la web app.

// ---------- Tipi di documento ----------
const TYPES = {
  cie: {
    label: "Carta d'identità", emoji: '🪪', hue: 200, cat: 'identita',
    fields: [
      { k: 'numero', l: 'Numero documento', mono: true, main: true },
      { k: 'comune', l: 'Comune di rilascio' },
      { k: 'rilascio', l: 'Data di rilascio', t: 'date' },
      { k: 'scadenza', l: 'Scadenza', t: 'date', expiry: true },
    ],
  },
  passaporto: {
    label: 'Passaporto', emoji: '🛂', hue: 340, cat: 'viaggio',
    fields: [
      { k: 'numero', l: 'Numero passaporto', mono: true, main: true },
      { k: 'autorita', l: 'Autorità di rilascio' },
      { k: 'rilascio', l: 'Data di rilascio', t: 'date' },
      { k: 'scadenza', l: 'Scadenza', t: 'date', expiry: true },
    ],
  },
  patente: {
    label: 'Patente di guida', emoji: '🚗', hue: 28, cat: 'veicoli',
    fields: [
      { k: 'numero', l: 'Numero patente', mono: true, main: true },
      { k: 'categorie', l: 'Categorie', ph: 'es. B, AM' },
      { k: 'rilasciataDa', l: 'Rilasciata da', ph: 'es. MIT-UCO' },
      { k: 'rilascio', l: 'Data di rilascio', t: 'date' },
      { k: 'scadenza', l: 'Scadenza', t: 'date', expiry: true },
    ],
  },
  sanitaria: {
    label: 'Tessera sanitaria', emoji: '🏥', hue: 150, cat: 'salute',
    fields: [
      { k: 'codiceFiscale', l: 'Codice fiscale', mono: true, main: true, upper: true },
      { k: 'numeroTessera', l: 'N. identificazione tessera', mono: true },
      { k: 'scadenza', l: 'Scadenza', t: 'date', expiry: true },
    ],
  },
  elettorale: {
    label: 'Tessera elettorale', emoji: '🗳️', hue: 260, cat: 'identita',
    fields: [
      { k: 'numero', l: 'Numero tessera', mono: true, main: true },
      { k: 'comune', l: 'Comune' },
      { k: 'sezione', l: 'Sezione' },
    ],
  },
  veicolo: {
    label: 'Libretto veicolo', emoji: '📘', hue: 215, cat: 'veicoli',
    fields: [
      { k: 'targa', l: 'Targa', mono: true, main: true, upper: true },
      { k: 'modello', l: 'Marca e modello' },
      { k: 'telaio', l: 'Numero di telaio', mono: true, upper: true },
      { k: 'revisione', l: 'Prossima revisione', t: 'date', expiry: true },
    ],
  },
  polizza: {
    label: 'Assicurazione', emoji: '🛡️', hue: 180, cat: 'altro',
    fields: [
      { k: 'compagnia', l: 'Compagnia' },
      { k: 'numero', l: 'Numero polizza', mono: true, main: true },
      { k: 'scadenza', l: 'Scadenza', t: 'date', expiry: true },
    ],
  },
  altro: { label: 'Altro documento', emoji: '📄', hue: 40, cat: 'altro', fields: [
    { k: 'numero', l: 'Numero', mono: true, main: true },
    { k: 'scadenza', l: 'Scadenza', t: 'date', expiry: true },
  ] },
};

const SOON_DAYS = 90;

const typeOf = (doc) => TYPES[doc.type] || TYPES.altro;
const extLabel = (f) => (f.name.split('.').pop() || '').toUpperCase().slice(0, 5);

function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v; // solo per icone SVG statiche
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (k === 'style') n.style.cssText = v;
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) n.append(c.nodeType ? c : String(c));
  return n;
}

const fmtDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
};
const fmtSize = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');

function expiryDate(doc) {
  const f = typeOf(doc).fields.find((x) => x.expiry);
  return (f && doc.fields[f.k]) || null;
}
function expiryInfo(doc) {
  const iso = expiryDate(doc);
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((new Date(y, m - 1, d) - today) / 86400000);
  if (days < 0) return { cls: 'expired', days, label: `Scaduto da ${-days === 1 ? '1 giorno' : -days + ' giorni'}`, short: 'Scaduto' };
  if (days === 0) return { cls: 'expired', days, label: 'Scade oggi', short: 'Scade oggi' };
  if (days <= SOON_DAYS) return { cls: 'soon', days, label: `Scade tra ${days === 1 ? '1 giorno' : days + ' giorni'}`, short: `Tra ${days} gg` };
  return { cls: 'ok', days, label: `Valido fino al ${fmtDate(iso)}`, short: new Date(y, m - 1, d).toLocaleDateString('it-IT', { month: 'short', year: 'numeric' }) };
}
const needsAttention = (doc) => {
  const e = expiryInfo(doc);
  return e && (e.cls === 'expired' || e.cls === 'soon');
};

function mainValue(doc) {
  const f = typeOf(doc).fields.find((x) => x.main);
  return f ? doc.fields[f.k] || '' : '';
}
function masked(v) {
  if (!v) return '';
  return v.length <= 4 ? v : '•••• ' + v.slice(-4);
}
