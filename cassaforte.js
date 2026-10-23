/*!
 * hash-wasm (https://www.npmjs.com/package/hash-wasm)
 * (c) Dani Biro
 * @license MIT
 */

!function(A,I){"object"==typeof exports&&"undefined"!=typeof module?I(exports):"function"==typeof define&&define.amd?define(["exports"],I):I((A="undefined"!=typeof globalThis?globalThis:A||self).hashwasm=A.hashwasm||{})}(this,(function(A){"use strict";function I(A,I,g,B){return new(g||(g=Promise))((function(E,i){function Q(A){try{d(B.next(A))}catch(A){i(A)}}function c(A){try{d(B.throw(A))}catch(A){i(A)}}function d(A){var I;A.done?E(A.value):(I=A.value,I instanceof g?I:new g((function(A){A(I)}))).then(Q,c)}d((B=B.apply(A,I||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;var g,B={name:"scrypt",data:"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cyICajYCOCAAIAAoAjwgAiAKakESdyAGc2o2AjwLvxIDFX8Bfg5/AkAgAkUNACAAQQd0IgNBQGoiBEEAKAKACCIFIAMgAmwiBmogAyABbGoiByADaiIIaiEJIAAgAkEHdCIKIAFBB3RqIgtsIQwgACALQYABamwhDSAAQQV0IgtBASALQQFLGyILQWBxIQ4gC0EBcSEPIAdBeGohECAHQXBqIREgB0FoaiESIAdBYGohEyAHQVhqIRQgB0FQaiEVIAdBSGohFiAHQUBqIRcgAa1Cf3whGCAEIAdqIRkgByAAQQh0IhpqIRsgACAKQYABamwhHCALQQRJIR1BACEeQQAhHwNAQQAoAoAIIiAgAyAfbGohIQJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgByALaiIEICMgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AIAcgIkECdCILaiAhIAtqKAIANgIACwJAIAFFDQBBACElIBwhIyAGISYDQCAFISQgACEiAkACQCAADQAgGyAXKQMANwMAIBsgFikDADcDCCAbIBUpAwA3AxAgGyAUKQMANwMYIBsgEykDADcDICAbIBIpAwA3AyggGyARKQMANwMwIBsgECkDADcDOAwBCwNAICQgJmoiCyAkIAxqIgQpAwA3AwAgC0EIaiAEQQhqKQMANwMAIAtBEGogBEEQaikDADcDACALQRhqIARBGGopAwA3AwAgC0EgaiAEQSBqKQMANwMAIAtBKGogBEEoaikDADcDACALQTBqIARBMGopAwA3AwAgC0E4aiAEQThqKQMANwMAIAtBwABqIARBwABqKQMANwMAIAtByABqIARByABqKQMANwMAIAtB0ABqIARB0ABqKQMANwMAIAtB2ABqIARB2ABqKQMANwMAIAtB4ABqIARB4ABqKQMANwMAIAtB6ABqIARB6ABqKQMANwMAIAtB8ABqIARB8ABqKQMANwMAIAtB+ABqIARB+ABqKQMANwMAICRBgAFqISQgIkF/aiIiDQALIAcgCCAbIAAQAiAFISQgACEiA0AgJCAjaiILICQgDWoiBCkDADcDACALQQhqIARBCGopAwA3AwAgC0EQaiAEQRBqKQMANwMAIAtBGGogBEEYaikDADcDACALQSBqIARBIGopAwA3AwAgC0EoaiAEQShqKQMANwMAIAtBMGogBEEwaikDADcDACALQThqIARBOGopAwA3AwAgC0HAAGogBEHAAGopAwA3AwAgC0HIAGogBEHIAGopAwA3AwAgC0HQAGogBEHQAGopAwA3AwAgC0HYAGogBEHYAGopAwA3AwAgC0HgAGogBEHgAGopAwA3AwAgC0HoAGogBEHoAGopAwA3AwAgC0HwAGogBEHwAGopAwA3AwAgC0H4AGogBEH4AGopAwA3AwAgJEGAAWohJCAiQX9qIiINAAsLIAggByAbIAAQAiAjIBpqISMgJiAaaiEmICVBAmoiJSABSQ0AC0EAISUDQAJAAkAgAA0AIBsgFykDADcDACAbIBYpAwA3AwggGyAVKQMANwMQIBsgFCkDADcDGCAbIBMpAwA3AyAgGyASKQMANwMoIBsgESkDADcDMCAbIBApAwA3AzgMAQsgACAKIBkpAgAgGIOnQQd0amwhJiAFISQgACEiA0AgJCAMaiILIAspAwAgJCAmaiIEKQMAhTcDACALQQhqIiMgIykDACAEQQhqKQMAhTcDACALQRBqIiMgIykDACAEQRBqKQMAhTcDACALQRhqIiMgIykDACAEQRhqKQMAhTcDACALQSBqIiMgIykDACAEQSBqKQMAhTcDACALQShqIiMgIykDACAEQShqKQMAhTcDACALQTBqIiMgIykDACAEQTBqKQMAhTcDACALQThqIiMgIykDACAEQThqKQMAhTcDACALQcAAaiIjICMpAwAgBEHAAGopAwCFNwMAIAtByABqIiMgIykDACAEQcgAaikDAIU3AwAgC0HQAGoiIyAjKQMAIARB0ABqKQMAhTcDACALQdgAaiIjICMpAwAgBEHYAGopAwCFNwMAIAtB4ABqIiMgIykDACAEQeAAaikDAIU3AwAgC0HoAGoiIyAjKQMAIARB6ABqKQMAhTcDACALQfAAaiIjICMpAwAgBEHwAGopAwCFNwMAIAtB+ABqIgsgCykDACAEQfgAaikDAIU3AwAgJEGAAWohJCAiQX9qIiINAAsgByAIIBsgABACIAAgCiAJKQIAIBiDp0EHdGpsISYgBSEkIAAhIgNAICQgDWoiCyALKQMAICQgJmoiBCkDAIU3AwAgC0EIaiIjICMpAwAgBEEIaikDAIU3AwAgC0EQaiIjICMpAwAgBEEQaikDAIU3AwAgC0EYaiIjICMpAwAgBEEYaikDAIU3AwAgC0EgaiIjICMpAwAgBEEgaikDAIU3AwAgC0EoaiIjICMpAwAgBEEoaikDAIU3AwAgC0EwaiIjICMpAwAgBEEwaikDAIU3AwAgC0E4aiIjICMpAwAgBEE4aikDAIU3AwAgC0HAAGoiIyAjKQMAIARBwABqKQMAhTcDACALQcgAaiIjICMpAwAgBEHIAGopAwCFNwMAIAtB0ABqIiMgIykDACAEQdAAaikDAIU3AwAgC0HYAGoiIyAjKQMAIARB2ABqKQMAhTcDACALQeAAaiIjICMpAwAgBEHgAGopAwCFNwMAIAtB6ABqIiMgIykDACAEQegAaikDAIU3AwAgC0HwAGoiIyAjKQMAIARB8ABqKQMAhTcDACALQfgAaiILIAspAwAgBEH4AGopAwCFNwMAICRBgAFqISQgIkF/aiIiDQALCyAIIAcgGyAAEAIgJUECaiIlIAFJDQALCwJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgIyALaiIEIAcgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AICEgIkECdCILaiAHIAtqKAIANgIACyAeIANqIR4gH0EBaiIfIAJHDQALCws=",hash:"b32721f8"};class E{constructor(){this.mutex=Promise.resolve()}lock(){let A=()=>{};return this.mutex=this.mutex.then((()=>new Promise(A))),new Promise((I=>{A=I}))}dispatch(A){return I(this,void 0,void 0,(function*(){const I=yield this.lock();try{return yield Promise.resolve(A())}finally{I()}}))}}const i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,Q=null!==(g=i.Buffer)&&void 0!==g?g:null,c=i.TextEncoder?new i.TextEncoder:null;function d(A,I){return(15&A)+(A>>6|A>>3&8)<<4|(15&I)+(I>>6|I>>3&8)}const C="a".charCodeAt(0)-10,o="0".charCodeAt(0);function a(A,I,g){let B=0;for(let E=0;E<g;E++){let g=I[E]>>>4;A[B++]=g>9?g+C:g+o,g=15&I[E],A[B++]=g>9?g+C:g+o}return String.fromCharCode.apply(null,A)}const n=null!==Q?A=>{if("string"==typeof A){const I=Q.from(A,"utf8");return new Uint8Array(I.buffer,I.byteOffset,I.length)}if(Q.isBuffer(A))return new Uint8Array(A.buffer,A.byteOffset,A.length);if(ArrayBuffer.isView(A))return new Uint8Array(A.buffer,A.byteOffset,A.byteLength);throw new Error("Invalid data type!")}:A=>{if("string"==typeof A)return c.encode(A);if(ArrayBuffer.isView(A))return new Uint8Array(A.buffer,A.byteOffset,A.byteLength);throw new Error("Invalid data type!")},e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=new Uint8Array(256);for(let A=0;A<e.length;A++)t[e.charCodeAt(A)]=A;function y(A){const I=function(A){let I=Math.floor(.75*A.length);const g=A.length;return"="===A[g-1]&&(I-=1,"="===A[g-2]&&(I-=1)),I}(A),g=A.length,B=new Uint8Array(I);let E=0;for(let I=0;I<g;I+=4){const g=t[A.charCodeAt(I)],i=t[A.charCodeAt(I+1)],Q=t[A.charCodeAt(I+2)],c=t[A.charCodeAt(I+3)];B[E]=g<<2|i>>4,E+=1,B[E]=(15&i)<<4|Q>>2,E+=1,B[E]=(3&Q)<<6|63&c,E+=1}return B}const D=16384,N=new E,r=new Map;function M(A,g){return I(this,void 0,void 0,(function*(){let B=null,E=null,i=!1;if("undefined"==typeof WebAssembly)throw new Error("WebAssembly is not supported in this environment!");const Q=()=>new DataView(B.exports.memory.buffer).getUint32(B.exports.STATE_SIZE,!0),c=N.dispatch((()=>I(this,void 0,void 0,(function*(){if(!r.has(A.name)){const I=y(A.data),g=WebAssembly.compile(I);r.set(A.name,g)}const I=yield r.get(A.name);B=yield WebAssembly.instantiate(I,{})})))),C=(A=null)=>{i=!0,B.exports.Hash_Init(A)},o=A=>{if(!i)throw new Error("update() called before init()");(A=>{let I=0;for(;I<A.length;){const g=A.subarray(I,I+D);I+=g.length,E.set(g),B.exports.Hash_Update(g.length)}})(n(A))},e=new Uint8Array(2*g),t=(A,I=null)=>{if(!i)throw new Error("digest() called before init()");return i=!1,B.exports.Hash_Final(I),"binary"===A?E.slice(0,g):a(e,E,g)},M=A=>"string"==typeof A?A.length<4096:A.byteLength<D;let h=M;switch(A.name){case"argon2":case"scrypt":h=()=>!0;break;case"blake2b":case"blake2s":h=(A,I)=>I<=512&&M(A);break;case"blake3":h=(A,I)=>0===I&&M(A);break;case"xxhash64":case"xxhash3":case"xxhash128":case"crc64":h=()=>!1}return yield(()=>I(this,void 0,void 0,(function*(){B||(yield c);const A=B.exports.Hash_GetBuffer(),I=B.exports.memory.buffer;E=new Uint8Array(I,A,D)})))(),{getMemory:()=>E,writeMemory:(A,I=0)=>{E.set(A,I)},getExports:()=>B.exports,setMemorySize:A=>{B.exports.Hash_SetMemorySize(A);const I=B.exports.Hash_GetBuffer(),g=B.exports.memory.buffer;E=new Uint8Array(g,I,A)},init:C,update:o,digest:t,save:()=>{if(!i)throw new Error("save() can only be called after init() and before digest()");const I=B.exports.Hash_GetState(),g=Q(),E=B.exports.memory.buffer,c=new Uint8Array(E,I,g),C=new Uint8Array(4+g);return function(A,I){const g=I.length>>1;for(let B=0;B<g;B++){const g=B<<1;A[B]=d(I.charCodeAt(g),I.charCodeAt(g+1))}}(C,A.hash),C.set(c,4),C},load:I=>{if(!(I instanceof Uint8Array))throw new Error("load() expects an Uint8Array generated by save()");const g=B.exports.Hash_GetState(),E=Q(),c=4+E,C=B.exports.memory.buffer;if(I.length!==c)throw new Error(`Bad state length (expected ${c} bytes, got ${I.length})`);if(!function(A,I){if(A.length!==2*I.length)return!1;for(let g=0;g<I.length;g++){const B=g<<1;if(I[g]!==d(A.charCodeAt(B),A.charCodeAt(B+1)))return!1}return!0}(A.hash,I.subarray(0,4)))throw new Error("This state was written by an incompatible hash implementation");const o=I.subarray(4);new Uint8Array(C,g,E).set(o),i=!0},calculate:(A,I=null,i=null)=>{if(!h(A,I))return C(I),o(A),t("hex",i);const Q=n(A);return E.set(Q),B.exports.Hash_Calculate(Q.length,I,i),a(e,E,g)},hashLength:g}}))}function h(A,I){A.init();const{blockSize:g}=A,B=function(A,I){const{blockSize:g}=A,B=n(I);if(B.length>g){A.update(B);const I=A.digest("binary");return A.init(),I}return new Uint8Array(B.buffer,B.byteOffset,B.length)}(A,I),E=new Uint8Array(g);E.set(B);const i=new Uint8Array(g);for(let A=0;A<g;A++){const I=E[A];i[A]=92^I,E[A]=54^I}A.update(E);const Q={init:()=>(A.init(),A.update(E),Q),update:I=>(A.update(I),Q),digest:I=>{const g=A.digest("binary");return A.init(),A.update(i),A.update(g),A.digest(I)},save:()=>{throw new Error("save() not supported")},load:()=>{throw new Error("load() not supported")},blockSize:A.blockSize,digestSize:A.digestSize};return Q}function q(A){return I(this,void 0,void 0,(function*(){(A=>{if(!A||"object"!=typeof A)throw new Error("Invalid options parameter. It requires an object.");if(!A.hashFunction||!A.hashFunction.then)throw new Error('Invalid hash function is provided! Usage: pbkdf2("password", "salt", 1000, 32, createSHA1()).');if(!Number.isInteger(A.iterations)||A.iterations<1)throw new Error("Iterations should be a positive number");if(!Number.isInteger(A.hashLength)||A.hashLength<1)throw new Error("Hash length should be a positive number");if(void 0===A.outputType&&(A.outputType="hex"),!["hex","binary"].includes(A.outputType))throw new Error(`Insupported output type ${A.outputType}. Valid values: ['hex', 'binary']`)})(A);return function(A,g,B,E,i){return I(this,void 0,void 0,(function*(){const I=new Uint8Array(E),Q=new Uint8Array(g.length+4),c=new DataView(Q.buffer),d=n(g),C=new Uint8Array(d.buffer,d.byteOffset,d.length);Q.set(C);let o=0;const e=A.digestSize,t=Math.ceil(E/e);let y=null,D=null;for(let i=1;i<=t;i++){c.setUint32(g.length,i),A.init(),A.update(Q),y=A.digest("binary"),D=y.slice();for(let I=1;I<B;I++){A.init(),A.update(D),D=A.digest("binary");for(let A=0;A<e;A++)y[A]^=D[A]}I.set(y.subarray(0,E-o),o),o+=e}return"binary"===i?I:a(new Uint8Array(2*E),I,E)}))}(yield function(A,I){if(!A||!A.then)throw new Error('Invalid hash function is provided! Usage: createHMAC(createMD5(), "key").');return A.then((A=>h(A,I)))}(A.hashFunction,A.password),A.salt,A.iterations,A.hashLength,A.outputType)}))}var p={name:"sha256",data:"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c2pBx6KerX1qIhkgASADcyACcSABIANxcyABQR53IAFBE3dzIAFBCndzaiAaaiICaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakHRxqk2aiIaIAIgAXMgA3EgAiABcXMgAkEedyACQRN3cyACQQp3c2ogGGoiA2oiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pB59KkoQFqIhggAyACcyABcSADIAJxcyADQR53IANBE3dzIANBCndzaiAUaiIBaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGFldy9AmoiFCABIANzIAJxIAEgA3FzIAFBHncgAUETd3MgAUEKd3NqIBdqIgJqIhMgI2ogJiASaiAiIBFqICUgCWogEyASIBFzcSARc2ogE0EadyATQRV3cyATQQd3c2pBuMLs8AJqIhcgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAZaiIDaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakH827HpBGoiGSADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBpqIgFqIhEgCSATc3EgE3NqIBFBGncgEUEVd3MgEUEHd3NqQZOa4JkFaiIaIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGGoiAmoiEiARIAlzcSAJc2ogEkEadyASQRV3cyASQQd3c2pB1OapqAZqIhggAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAUaiIDaiITaiAoIBJqICQgEWogJyAJaiATIBIgEXNxIBFzaiATQRp3IBNBFXdzIBNBB3dzakG7laizB2oiFCADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBdqIgFqIgkgEyASc3EgEnNqIAlBGncgCUEVd3MgCUEHd3NqQa6Si454aiIXIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGWoiAmoiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pBhdnIk3lqIhkgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAaaiIDaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGh0f+VemoiGiADIAJz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",hash:"8c18dd94"};function s(A){return I(this,void 0,void 0,(function*(){const{costFactor:I,blockSize:g,parallelism:E,hashLength:i}=A,Q=M(p,32).then((A=>{A.init(256);const I={init:()=>(A.init(256),I),update:g=>(A.update(g),I),digest:I=>A.digest(I),save:()=>A.save(),load:g=>(A.load(g),I),blockSize:64,digestSize:32};return I})),c=yield q({password:A.password,salt:A.salt,iterations:1,hashLength:128*g*E,hashFunction:Q,outputType:"binary"}),d=yield M(B,0),C=128*g*I,o=256*g;d.setMemorySize(c.length+C+o),d.writeMemory(c,0),d.getExports().scrypt(g,I,E);const n=d.getMemory().subarray(0,128*g*E),e=yield q({password:A.password,salt:n,iterations:1,hashLength:i,hashFunction:Q,outputType:"binary"});if("hex"===A.outputType){return a(new Uint8Array(2*i),e,i)}return e}))}new E;A.scrypt=function(A){return I(this,void 0,void 0,(function*(){return(A=>{if(!A||"object"!=typeof A)throw new Error("Invalid options parameter. It requires an object.");if(!Number.isInteger(A.blockSize)||A.blockSize<1)throw new Error("Block size should be a positive number");if(!Number.isInteger(A.costFactor)||A.costFactor<2||!(I=A.costFactor)||I&I-1)throw new Error("Cost factor should be a power of 2, greater than 1");var I;if(!Number.isInteger(A.parallelism)||A.parallelism<1)throw new Error("Parallelism should be a positive number");if(!Number.isInteger(A.hashLength)||A.hashLength<1)throw new Error("Hash length should be a positive number.");if(void 0===A.outputType&&(A.outputType="hex"),!["hex","binary"].includes(A.outputType))throw new Error(`Insupported output type ${A.outputType}. Valid values: ['hex', 'binary']`)})(A),s(A)}))}}));

;
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

// ---------- Persone ----------
// Ogni documento appartiene a una persona (data.people). doc.holder resta come copia
// del nome, per compatibilità con le versioni precedenti.
const PERSON_HUES = [205, 340, 28, 150, 265, 185, 45, 305, 100, 5];
const RELATIONS = ['Io', 'Coniuge', 'Compagno/a', 'Figlio/a', 'Genitore', 'Fratello/Sorella', 'Nonno/a', 'Nipote', 'Altro'];

const newId = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));

function nextHue(people) {
  const used = new Set(people.map((p) => p.hue));
  return PERSON_HUES.find((h) => !used.has(h)) ?? PERSON_HUES[people.length % PERSON_HUES.length];
}

// Converte i dati delle versioni precedenti (intestatario scritto a mano) in persone.
// Restituisce true se ha modificato qualcosa.
function normalizePeople(data) {
  let changed = false;
  if (!Array.isArray(data.people)) {
    data.people = [];
    changed = true;
  }
  const byName = new Map(data.people.map((p) => [p.name.trim().toLowerCase(), p]));
  for (const d of data.documents || []) {
    if (d.personId && data.people.some((p) => p.id === d.personId)) continue;
    if (d.personId) {
      d.personId = null;
      changed = true;
    }
    const name = (d.holder || '').trim();
    if (!name) continue;
    let p = byName.get(name.toLowerCase());
    if (!p) {
      p = { id: newId(), name, relation: '', birth: '', hue: nextHue(data.people), createdAt: new Date().toISOString() };
      data.people.push(p);
      byName.set(name.toLowerCase(), p);
    }
    d.personId = p.id;
    changed = true;
  }
  return changed;
}

function sortedPeople(data) {
  return (data.people || [])
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (a.p.relation === 'Io' ? -1 : 0) - (b.p.relation === 'Io' ? -1 : 0) || a.i - b.i)
    .map((x) => x.p);
}

const personOf = (data, doc) => (doc.personId && (data.people || []).find((p) => p.id === doc.personId)) || null;
const holderName = (data, doc) => personOf(data, doc)?.name || doc.holder || '';

function initials(name) {
  const parts = String(name || '?').trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '?') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

function avatar(person, cls = '') {
  return person
    ? el('span', { class: 'avatar ' + cls, style: `--h:${person.hue ?? 205}`, title: person.name }, initials(person.name))
    : el('span', { class: 'avatar none ' + cls, title: 'Senza intestatario' }, '?');
}

function ageOf(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const now = new Date();
  let a = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) a--;
  return a >= 0 ? a : null;
}

function personSubtitle(p) {
  const age = ageOf(p.birth);
  return [p.relation, age != null ? (age === 1 ? '1 anno' : `${age} anni`) : ''].filter(Boolean).join(' · ');
}

;
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
  person: 'all',
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
  if (typeof hashwasm === 'undefined') throw new Error('manca una parte della web app. Ricarica su GitHub tutti i file della cartella iphone-web.');
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
  try {
    await openWithDek(dekRaw);
  } finally {
    dekRaw.fill(0);
  }
}

// La chiave dati resta in memoria finché la cassaforte è aperta (serve per attivare Face ID).
async function openWithDek(dekRaw) {
  const dek = await crypto.subtle.importKey('raw', dekRaw, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
  const data = JSON.parse(new TextDecoder().decode(await openBox(dek, state.pack.header.vault.data)));
  state.dek = dek;
  normalizePeople(data);
  state.data = data;
}

// ---------- Face ID (passkey con estensione PRF) ----------
// Dopo Face ID la passkey restituisce un segreto che esiste solo nel Portachiavi iCloud;
// da quel segreto si ricava la chiave che protegge, su questo iPhone, la chiave dati.
const FACE_INFO = new TextEncoder().encode('cassaforte-faceid-v1');
const rnd = (n) => crypto.getRandomValues(new Uint8Array(n));

async function faceIdSupported() {
  if (!window.PublicKeyCredential || !window.isSecureContext) return false;
  try {
    if (PublicKeyCredential.getClientCapabilities) {
      const caps = await PublicKeyCredential.getClientCapabilities();
      if (caps['extension:prf'] === false) return false;
    }
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

async function prfWrapKey(secret) {
  const base = await crypto.subtle.importKey('raw', secret, 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(32), info: FACE_INFO }, base,
    { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

const NO_PRF = 'Questo iPhone non permette Face ID nelle web app: serve iOS 18 o successivo, con il Portachiavi iCloud attivo.';

async function prfSecret(credId, salt) {
  const cred = await navigator.credentials.get({ publicKey: {
    challenge: rnd(32), allowCredentials: [{ type: 'public-key', id: credId }], userVerification: 'required', timeout: 60000,
    extensions: { prf: { eval: { first: salt } } },
  } });
  const out = cred.getClientExtensionResults()?.prf?.results?.first;
  if (!out) throw new Error(NO_PRF);
  return new Uint8Array(out);
}

let pendingFace = null;

// Passo 1 (da un tocco): crea la passkey. Se iOS restituisce già il segreto si chiude qui,
// altrimenti serve un secondo tocco di conferma (passo 2).
async function startFaceId() {
  const salt = rnd(32);
  const cred = await navigator.credentials.create({ publicKey: {
    rp: { name: 'Cassaforte' },
    user: { id: rnd(16), name: 'Cassaforte', displayName: 'Cassaforte' },
    challenge: rnd(32),
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
    authenticatorSelection: { authenticatorAttachment: 'platform', residentKey: 'required', userVerification: 'required' },
    timeout: 60000,
    extensions: { prf: { eval: { first: salt } } },
  } });
  const prf = cred.getClientExtensionResults()?.prf;
  if (prf && prf.enabled === false) throw new Error(NO_PRF);
  pendingFace = { credId: new Uint8Array(cred.rawId), salt };
  if (prf?.results?.first) {
    await finishFaceId(new Uint8Array(prf.results.first));
    return true;
  }
  return false;
}

async function confirmFaceId() {
  await finishFaceId(await prfSecret(pendingFace.credId, pendingFace.salt));
}

async function finishFaceId(secret) {
  const key = await prfWrapKey(secret);
  secret.fill(0);
  const dekRaw = new Uint8Array(await crypto.subtle.exportKey('raw', state.dek));
  const iv = rnd(12);
  const wrapped = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, dekRaw));
  dekRaw.fill(0);
  await idbSet('faceid', { credId: pendingFace.credId, salt: pendingFace.salt, iv, wrapped, createdAt: new Date().toISOString() });
  pendingFace = null;
}

async function faceUnlock() {
  const rec = await idbGet('faceid').catch(() => null);
  if (!rec || !state.pack) return;
  const btn = $('face-btn');
  btn.disabled = true;
  $('lock-err').textContent = '';
  try {
    const key = await prfWrapKey(await prfSecret(rec.credId, rec.salt));
    let dekRaw;
    try {
      dekRaw = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: rec.iv }, key, rec.wrapped));
      await openWithDek(dekRaw);
    } catch {
      await idbDel('faceid');
      btn.hidden = true;
      throw new Error('Face ID non vale più per questa copia: usa la password, poi riattivalo.');
    } finally {
      if (dekRaw) dekRaw.fill(0);
    }
    enterApp();
  } catch (err) {
    if (err.name !== 'NotAllowedError' && err.name !== 'AbortError') $('lock-err').textContent = err.message;
  } finally {
    btn.disabled = false;
  }
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
  $('face-btn').hidden = true;
  idbGet('faceid').then((rec) => { $('face-btn').hidden = !rec; }).catch(() => {});
}
$('face-btn').onclick = faceUnlock;

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
  await idbDel('faceid').catch(() => {});
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
    enterApp();
    offerFaceId();
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

function enterApp() {
  $('pw').value = '';
  $('pw').blur();
  state.filter = 'all';
  state.person = 'all';
  state.query = '';
  $('search').value = '';
  renderList();
  show('s-list');
  resetIdle();
}

// Dopo uno sblocco con password propone Face ID (una volta, finché non si risponde).
async function offerFaceId() {
  if (await idbGet('faceid').catch(() => null)) return;
  if (await idbGet('faceid-no').catch(() => null)) return;
  if (!(await faceIdSupported())) return;
  setTimeout(() => {
    if (!state.data) return;
    openFaceSheet('Vuoi aprire Cassaforte con Face ID la prossima volta? La password resterà sempre valida.', true);
  }, 400);
}

function openFaceSheet(message, withDecline) {
  $('sheet-title').textContent = message;
  $('sheet-actions').replaceChildren(...[
    el('button', { type: 'button', class: 'sheet-btn strong', onclick: async (e) => {
      e.currentTarget.disabled = true;
      try {
        const done = pendingFace ? (await confirmFaceId(), true) : await startFaceId();
        if (done) {
          closeSheet();
          toast('Face ID attivato');
          renderList();
        } else {
          openFaceSheet('Ultimo passaggio: conferma con Face ID per completare l’attivazione.', false);
        }
      } catch (err) {
        closeSheet();
        pendingFace = null;
        if (err.name !== 'NotAllowedError' && err.name !== 'AbortError') toast(err.message);
      }
    } }, pendingFace ? 'Conferma con Face ID' : 'Attiva Face ID'),
    withDecline ? el('button', { type: 'button', class: 'sheet-btn', onclick: async () => {
      await idbSet('faceid-no', true).catch(() => {});
      closeSheet();
    } }, 'Non chiederlo più') : null,
  ].filter(Boolean));
  $('sheet').hidden = false;
}

function lockNow(silent = false) {
  pendingFace = null;
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
  let docs = personDocs();
  if (state.filter === 'expiring') docs = docs.filter(needsAttention);
  else if (state.filter !== 'all') docs = docs.filter((d) => typeOf(d).cat === state.filter);
  if (q) {
    docs = docs.filter((d) =>
      [d.title, holderName(state.data, d), d.notes, typeOf(d).label, ...Object.values(d.fields || {}), ...(d.custom || []).flatMap((c) => [c.label, c.value])]
        .join(' ').toLowerCase().includes(q));
  }
  const ord = Object.keys(TYPES);
  const pOrd = new Map(sortedPeople(state.data).map((p, i) => [p.id, i]));
  const po = (d) => pOrd.get(d.personId) ?? 1e6;
  return docs.sort((a, b) =>
    state.filter === 'expiring'
      ? (expiryInfo(a)?.days ?? 1e9) - (expiryInfo(b)?.days ?? 1e9)
      : po(a) - po(b) || ord.indexOf(a.type) - ord.indexOf(b.type) || a.title.localeCompare(b.title));
}

function personDocs() {
  const docs = state.data.documents;
  if (state.person === 'all') return docs.slice();
  if (state.person === 'none') return docs.filter((d) => !personOf(state.data, d));
  return docs.filter((d) => d.personId === state.person);
}

function renderList() {
  const people = sortedPeople(state.data);
  const unassigned = state.data.documents.filter((d) => !personOf(state.data, d)).length;
  const pchip = (id, label, av, n, warn) => el('button', {
    type: 'button', class: 'pchip' + (state.person === id ? ' on' : ''),
    onclick: () => { state.person = id; state.filter = 'all'; renderList(); $('list-scroll').scrollTop = 0; },
  }, av, el('span', { class: 'pn' }, label), n != null ? el('span', { class: 'n' + (warn ? ' hot' : '') }, n) : null);
  $('people').hidden = people.length < 2 && !unassigned;
  $('people').replaceChildren(...[
    pchip('all', 'Tutti', el('span', { class: 'avatar all' }, '★'), null),
    ...people.map((p) => {
      const mine = state.data.documents.filter((d) => d.personId === p.id);
      return pchip(p.id, p.name.split(' ')[0], avatar(p), mine.length, mine.some(needsAttention));
    }),
    unassigned ? pchip('none', 'Altri', avatar(null), unassigned) : null].filter(Boolean));

  const all = personDocs();
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
  const grouped = state.person === 'all' && state.filter !== 'expiring' && people.length > 1;
  const showPerson = state.person === 'all' && !grouped;
  const item = (d) => {
    const t = typeOf(d);
    const exp = expiryInfo(d);
    return el('li', {}, el('button', { class: 'item', type: 'button', onclick: () => openDetail(d) },
      el('div', { class: 'badge', style: `--h:${t.hue}` }, t.emoji),
      el('div', { class: 'item-main' },
        el('div', { class: 'item-title' }, d.title),
        el('div', { class: 'item-sub' }, [showPerson ? holderName(state.data, d) : '', masked(mainValue(d))].filter(Boolean).join(' · ') || t.label),
        exp || d.files?.length ? el('div', { class: 'item-meta' },
          exp ? el('span', { class: 'pill ' + exp.cls }, exp.short) : null,
          d.files?.length ? el('span', { class: 'pill neutral' }, `📎 ${d.files.length}`) : null) : null),
      el('span', { class: 'chev', html: '<svg viewBox="0 0 20 20"><path d="M7.5 4l6 6-6 6"/></svg>' })));
  };
  const sections = [];
  if (!docs.length) {
    sections.push(el('ul', { class: 'list' }, el('li', { class: 'empty' }, all.length ? 'Nessun risultato.' : 'Nessun documento qui.')));
  } else if (!grouped) {
    sections.push(el('ul', { class: 'list' }, ...docs.map(item)));
  } else {
    const groups = new Map();
    for (const d of docs) {
      const k = personOf(state.data, d)?.id ?? 'none';
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(d);
    }
    for (const [k, list] of groups) {
      const p = people.find((x) => x.id === k) || null;
      sections.push(el('div', { class: 'list-title' }, avatar(p, 'xs'), p ? p.name : 'Senza intestatario'), el('ul', { class: 'list' }, ...list.map(item)));
    }
  }
  $('list').replaceChildren(...sections);

  $('pack-date').textContent = state.meta?.createdAt ? `Dati del ${fmtStamp(state.meta.createdAt)}` : '';
  renderFaceToggle();
}

async function renderFaceToggle() {
  const btn = $('face-toggle');
  const rec = await idbGet('faceid').catch(() => null);
  btn.hidden = !rec && !(await faceIdSupported());
  btn.textContent = rec ? 'Disattiva Face ID' : 'Attiva Face ID';
  btn.onclick = async () => {
    if (rec) {
      if (!confirm('Disattivare lo sblocco con Face ID su questo iPhone? Potrai eliminare la passkey «Cassaforte» dall’app Password.')) return;
      await idbDel('faceid');
      toast('Face ID disattivato');
      renderFaceToggle();
    } else {
      pendingFace = null;
      openFaceSheet('Attivando Face ID, iOS ti chiederà di salvare una passkey «Cassaforte». La password resterà sempre valida.', false);
    }
  };
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
  if (holderName(state.data, doc)) row('Intestatario', holderName(state.data, doc));
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
      el('div', { class: 'd-sub' }, personOf(state.data, doc) ? el('span', { class: 'owner' }, avatar(personOf(state.data, doc), 'xs'), holderName(state.data, doc)) : null, t.label),
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
  const who = holderName(state.data, doc);
  const lines = [`${doc.title}${who ? ' — ' + who : ''}`, t.label, ''];
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
