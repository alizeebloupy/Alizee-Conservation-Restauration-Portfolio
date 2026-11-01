/* =====================================================================
   MOTEUR DU SITE — normalement, pas besoin de toucher à ce fichier.
   Tout le contenu (textes, images, sections) se trouve dans contenu.js.
   ===================================================================== */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const GOLD = '#E8D48A';

/* ---------- langue ---------- */
let lang = 'fr';
try { lang = localStorage.getItem('lang') || 'fr'; } catch (_) {}
const tr = v => v == null ? '' : (typeof v === 'object' && !Array.isArray(v)) ? (v[lang] ?? v.fr ?? '') : v;
const word = w => lang === 'en' ? (TRADUCTIONS[w] || w) : w;          // technique / matériau
const attr = s => String(s).replace(/<[^>]*>/g, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const paras = v => { const x = tr(v); return (Array.isArray(x) ? x.map(tr) : String(x).split(/\n\s*\n/)).filter(Boolean); };

const UI = {
  fr: { avant: 'Avant', apres: 'Après', tout: 'Tout', technique: 'Technique', materiau: 'Matériau', detail: 'Détail', agrandir: 'Agrandir',
        prec: 'Précédent', suiv: 'Suivant', enCours: 'en cours', missions: 'Missions', copier: 'Copier l’adresse', copie: 'Adresse copiée',
        bientot: 'Bientôt', telecharger: 'Télécharger le CV (PDF)', memoire: 'Sujet de recherche de mémoire', formation: 'Formation',
        langues: 'Langues', logiciels: 'Logiciels', aucun: 'Aucune réalisation ne correspond à ce filtre.', hint: 'Clique sur le vase',
        vase: 'Vase réparé au kintsugi', vues: 'vues', accueil: 'Accueil', hint3d: 'Clique pour rejouer · glisse pour tourner', comparer: 'Avant / après', fermer: 'Fermer', autre: 'EN' },
  en: { avant: 'Before', apres: 'After', tout: 'All', technique: 'Technique', materiau: 'Material', detail: 'Details', agrandir: 'Enlarge',
        prec: 'Previous', suiv: 'Next', enCours: 'ongoing', missions: 'Duties', copier: 'Copy address', copie: 'Address copied',
        bientot: 'Coming soon', telecharger: 'Download CV (PDF)', memoire: 'Thesis research topic', formation: 'Education',
        langues: 'Languages', logiciels: 'Software', aucun: 'No work matches this filter.', hint: 'Click the vase',
        vase: 'Vase repaired with kintsugi', vues: 'views', accueil: 'Home', hint3d: 'Click to replay · drag to turn', comparer: 'Before / after', fermer: 'Close', autre: 'FR' }
};
const u = k => UI[lang][k];

/* ---------- ornements (dessinés en SVG, très légers) ---------- */
const svg = (vb, inner) => `<svg class="orn" viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;
function petal(n, rx, ry, cy, rot, fill, stroke, sw) { let p = ''; for (let i = 0; i < n; i++) p += `<ellipse cx="0" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot + i * 360 / n})"/>`; return `<g fill="${fill}" stroke="${stroke}" stroke-width="${sw}">${p}</g>`; }
const peonyInner = (s = GOLD, w = '#5E2B3B') => petal(8, 17, 28, -30, 0, '#E3AEB6', w, 1.6) + petal(6, 13, 21, -20, 30, '#FBF4DA', w, 1.5) + petal(5, 9, 14, -11, 0, '#E3AEB6', w, 1.4) + `<circle r="7" fill="${s}"/><circle r="2.6" fill="${w}"/>`;
const ORN = {
  fan: (c = {}) => { const f = c.fill || '#E3AEB6', s = c.stroke || GOLD, n = 9, R = 96, cx = 100, cy = 104, P = i => [cx + R * Math.cos(Math.PI + Math.PI * i / n), cy + R * Math.sin(Math.PI + Math.PI * i / n)];
    const r = (R * Math.sin(Math.PI / (2 * n)) * 1.12).toFixed(1); let d = `M${cx} ${cy} L${P(0)[0].toFixed(1)} ${P(0)[1].toFixed(1)}`;
    for (let i = 1; i <= n; i++) d += ` A${r} ${r} 0 0 1 ${P(i)[0].toFixed(1)} ${P(i)[1].toFixed(1)}`; d += ' Z';
    let ribs = ''; for (let i = 1; i < n; i++) { const a = Math.PI + Math.PI * i / n; ribs += `<path d="M${cx} ${cy} L${(cx + R * .86 * Math.cos(a)).toFixed(1)} ${(cy + R * .86 * Math.sin(a)).toFixed(1)}"/>`; }
    return svg('0 0 200 110', `<path d="${d}" fill="${f}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/><g stroke="${s}" stroke-width="2" fill="none">${ribs}<path d="M${cx - R * .5} ${cy} A${R * .5} ${R * .5} 0 0 1 ${cx + R * .5} ${cy}"/></g>`); },
  flower: (c = {}) => svg('-52 -52 104 104', petal(6, 15, 26, -26, 0, c.fill || '#E3AEB6', c.stroke || GOLD, 2.6) + `<circle r="10" fill="${c.stroke || GOLD}"/><circle r="4" fill="${c.core || '#5E2B3B'}"/>`),
  spark: (c = {}) => svg('-12 -12 24 24', `<path d="M0 -11 Q1 -1 11 0 Q1 1 0 11 Q-1 1 -11 0 Q-1 -1 0 -11Z" fill="${c.fill || GOLD}"/>`)
};

/* ---------- vase de l'accueil : les éclats se rassemblent, puis les joints d'or se dessinent ---------- */
function buildVase() {
  const shape = 'M138 18 L262 18 C264 44 242 64 238 104 C236 150 336 190 340 292 C344 392 292 462 274 506 L288 544 L112 544 L126 506 C108 462 56 392 60 292 C64 190 164 150 162 104 C158 64 136 44 138 18 Z';
  const A = [[0,175],[90,190],[150,170],[210,200],[280,178],[400,195]], B = [[0,370],[70,355],[140,385],[200,360],[270,390],[400,372]],
        C = [[210,200],[235,250],[200,300],[225,330],[200,360]], D = [[140,385],[165,440],[130,490],[150,560]];
  const pts = a => a.map(p => p.join(' ')).join(' L');
  const polys = [
    [[0,0],[400,0],[400,195],[280,178],[210,200],[150,170],[90,190],[0,175]],
    [[0,175],[90,190],[150,170],[210,200],[235,250],[200,300],[225,330],[200,360],[140,385],[70,355],[0,370]],
    [[210,200],[280,178],[400,195],[400,372],[270,390],[200,360],[225,330],[200,300],[235,250]],
    [[0,370],[70,355],[140,385],[165,440],[130,490],[150,560],[0,560]],
    [[140,385],[200,360],[270,390],[400,372],[400,560],[150,560],[130,490],[165,440]]
  ];
  const leaf = (x, y, r, s = 1) => `<ellipse cx="0" cy="-18" rx="9" ry="22" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="#FBF4DA" stroke="#5E2B3B" stroke-width="1.6"/>`;
  const small = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${petal(6, 15, 26, -26, 0, '#E3AEB6', '#5E2B3B', 2.6)}<circle r="10" fill="#E8D48A"/></g>`;
  const art = `<linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#9DB8C8"/><stop offset=".32" stop-color="#E9F0F3"/><stop offset=".6" stop-color="#E3AEB6"/><stop offset="1" stop-color="#8FAABB"/></linearGradient>
    <g id="vaseArt"><rect width="400" height="560" fill="url(#tg)"/>
    <rect x="100" y="12" width="200" height="30" fill="#5E2B3B"/><rect x="100" y="42" width="200" height="5" fill="#E3AEB6"/>
    <rect x="120" y="70" width="160" height="9" fill="#FBF4DA"/><rect x="120" y="84" width="160" height="3" fill="#5E2B3B"/>
    <path d="M70 140 Q135 118 200 134 Q265 118 330 140 L330 152 Q265 130 200 146 Q135 130 70 152Z" fill="#5E2B3B"/>
    ${leaf(132,262,-60)}${leaf(262,238,50)}${leaf(120,352,-110)}${leaf(282,352,120)}${leaf(200,230,10,1.2)}${leaf(200,372,180,1.1)}
    <g transform="translate(200 300) scale(1.45)">${peonyInner()}</g>
    ${small(108,232,.5)}${small(292,300,.5)}${small(262,430,.42)}${small(140,440,.42)}
    <path d="M110 478 q10 -22 28 -8 q10 -24 28 -6" fill="none" stroke="#5E2B3B" stroke-width="2.4" stroke-linecap="round"/><path d="M236 192 q10 -20 26 -8 q12 -22 28 -4" fill="none" stroke="#5E2B3B" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="90" y="498" width="220" height="6" fill="#E3AEB6"/><rect x="90" y="506" width="220" height="40" fill="#5E2B3B"/>
    <path d="M92 270 C90 340 108 410 138 470" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="9" stroke-linecap="round"/></g>`;
  const mv = [['-24px','-130px','-10deg'],['-130px','30px','-14deg'],['130px','-20px','12deg'],['-90px','150px','10deg'],['110px','160px','-9deg']];
  const clips = polys.map((p, i) => `<clipPath id="cl${i}"><path d="M${pts(p)} Z"/></clipPath>`).join('');
  const shards = polys.map((_, i) => `<g class="shard" style="--i:${i};--tx:${mv[i][0]};--ty:${mv[i][1]};--r:${mv[i][2]}"><g clip-path="url(#cl${i})"><g clip-path="url(#vc)"><use href="#vaseArt"/></g></g></g>`).join('');
  const seam = a => `<path class="seam" pathLength="1" d="M${pts(a)}"/>`;
  $('#vase').innerHTML = `<defs><clipPath id="vc"><path d="${shape}"/></clipPath>${clips}${art}</defs>${shards}<g clip-path="url(#vc)">${seam(A)}${seam(B)}${seam(C)}${seam(D)}</g>`;
}
function playVase() { const v = $('#vase'); v.classList.remove('play'); void v.getBoundingClientRect(); if (!reduce) v.classList.add('play'); }
function heroDeco() {
  const art = $('#heroArt');
  [['fan', {}, 160, 'bottom:4%;right:-20%', 26, '-2s'],
   ['flower', { fill: '#FBF4DA' }, 80, 'top:8%;right:-12%', 40, '-1s'], ['spark', {}, 32, 'top:42%;left:-18%', 18, '-3s'], ['spark', {}, 22, 'top:4%;right:24%', 30, '-5s'],
   ['spark', {}, 26, 'bottom:30%;right:-18%', 20, '-2.5s'], ['spark', {}, 18, 'bottom:10%;left:24%', 14, '-6s']]
  .forEach(([t, c, w, pos, depth, delay]) => { const d = document.createElement('span'); d.className = 'deco'; d.dataset.depth = depth; d.style.cssText = `${pos};width:${w}px;--d:${delay}`; d.innerHTML = ORN[t](c); art.appendChild(d); });
  if (reduce || !matchMedia('(pointer:fine)').matches) return;
  let raf = 0;
  const hero = $('.hero');
  hero.addEventListener('pointermove', e => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0;
      const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $$('.deco', art).forEach(d => { const k = d.dataset.depth / 5; d.style.setProperty('--px', (x * k).toFixed(1)); d.style.setProperty('--py', (y * k).toFixed(1)); });
    });
  });
}

/* ---------- identifiants et état de chaque bloc ---------- */
const STATE = {}, BLOC = {};
let n = 0;
(function walk(blocs) { blocs.forEach(b => { b._id = 'b' + (n++); BLOC[b._id] = b; if (b.type === 'onglets') b.onglets.forEach(o => walk(o.blocs || [])); }); })(SECTIONS.flatMap(s => s.blocs || []));
const S = (b, init) => STATE[b._id] || (STATE[b._id] = init);

/* ---------- éléments réutilisables ---------- */
const tagColors = ['#C98793', 'var(--goldDeep)', '#7E9AAE', '#8FAA7E', '#B08AB5', '#D09A6A', '#6FA3A0'];
const techniqueList = [...new Set(SECTIONS.flatMap(function all(x) { return (x.blocs || []).flatMap(b => b.type === 'onglets' ? b.onglets.flatMap(all) : (b.projets || []).flatMap(p => p.techniques || [])); }))];
const tagColor = t => tagColors[techniqueList.indexOf(t) % tagColors.length];
const tags = list => (list || []).length ? `<ul class="tags">${list.map(t => `<li style="--c:${tagColor(t)}">${word(t)}</li>`).join('')}</ul>` : '';
const ratioStyle = r => r ? `--ar:${r}` : '';
const auto = r => r ? '' : ' data-auto';
const head = b => (b.titre || b.sousTitre || b.intro) ? `<div class="bh">${b.titre ? `<h3>${tr(b.titre)}</h3>` : ''}${b.sousTitre ? `<p class="meta">${tr(b.sousTitre)}</p>` : ''}${b.intro ? `<p class="lead">${tr(b.intro)}</p>` : ''}</div>` : '';
const labelsOf = p => (p.etiquettes && tr(p.etiquettes)) || [u('avant'), u('apres')];

function compare(avant, apres, ratio, labels, alt) {
  return `<div class="ba" data-ba style="${ratioStyle(ratio)}"${auto(ratio)}>
    <img class="a" src="${apres}" alt="${attr(alt)} – ${attr(labels[1])}" loading="lazy" decoding="async" draggable="false">
    <img class="b" src="${avant}" alt="${attr(alt)} – ${attr(labels[0])}" loading="lazy" decoding="async" draggable="false">
    <span class="ba-line"></span><span class="ba-tag l">${labels[0]}</span><span class="ba-tag r">${labels[1]}</span>
    <span class="knob" role="slider" tabindex="0" aria-label="${attr(labels[0])} / ${attr(labels[1])}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">${ORN.flower({ fill: '#FBF4DA', stroke: '#5E2B3B', core: '#5E2B3B' })}</span></div>`;
}
const single = (src, ratio, alt) => `<div class="solo-img" style="${ratioStyle(ratio)}"${auto(ratio)}><img src="${src}" alt="${attr(alt)}" loading="lazy" decoding="async"></div>`;
const media = (p, ratio) => p.avant && p.apres ? compare(p.avant, p.apres, ratio, labelsOf(p), tr(p.titre)) : single(p.image || p.apres || p.avant, ratio, tr(p.titre));

/* ---------- types de blocs ---------- */
const BLOCS = {
  texte(b) {
    const body = `<div class="prose">${b.titre ? `<h2>${tr(b.titre)}</h2>` : ''}${paras(b.texte).map(p => `<p>${p}</p>`).join('')}${b.etiquettes ? `<ul class="chips">${b.etiquettes.map(e => `<li>${tr(e)}</li>`).join('')}</ul>` : ''}</div>`;
    if (!b.image) return body;
    return `<div class="split"><div class="arch-wrap"><div class="arch"><img src="${b.image}" alt="${attr(tr(b.legendeImage))}" loading="lazy" decoding="async"></div></div>${body}</div>`;
  },

  galerie(b) {
    const st = S(b, { tech: 'all', mat: 'all' });
    let list = b.projets.map((p, i) => [p, i]);
    let filters = '';
    if (b.filtres) {
      const count = (k, v) => b.projets.filter(p => k === 'tech' ? (p.techniques || []).includes(v) : p.materiau === v).length;
      const techs = [...new Set(b.projets.flatMap(p => p.techniques || []))], mats = [...new Set(b.projets.map(p => p.materiau).filter(Boolean))];
      const row = (lab, k, vals) => `<div class="frow" role="group" aria-label="${lab}"><span class="flab">${lab}</span>${[['all', u('tout')], ...vals.map(v => [v, word(v)])].map(([v, l]) =>
        `<button class="chip" type="button" data-filter="${b._id}" data-k="${k}" data-v="${attr(v)}" aria-pressed="${st[k] === v}">${l}${v !== 'all' ? `<small>${count(k, v)}</small>` : ''}</button>`).join('')}</div>`;
      filters = `<div class="filters">${row(u('technique'), 'tech', techs)}${row(u('materiau'), 'mat', mats)}</div>`;
      list = list.filter(([p]) => (st.tech === 'all' || (p.techniques || []).includes(st.tech)) && (st.mat === 'all' || p.materiau === st.mat));
    }
    st.visible = list.map(([, i]) => i);
    const cards = list.map(([p, i], k) => {
      const nv = (p.vues || []).length;
      return `<article class="proj" style="--i:${k}">${media(p, p.ratio)}
        <button class="open" type="button" data-open="${b._id}" data-p="${i}" aria-label="${u('agrandir')} : ${attr(tr(p.titre))}"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="7.5" cy="7.5" r="5"/><path d="M11.5 11.5L16 16"/></svg>${nv ? `+${nv}` : ''}</button>
        <h4>${tr(p.titre)}</h4>${p.materiau ? `<p class="meta">${word(p.materiau)}</p>` : ''}${tags(p.techniques)}</article>`;
    }).join('');
    return head(b) + filters + (cards ? `<div class="grid">${cards}</div>` : `<p class="none">${u('aucun')}</p>`);
  },

  etapes(b) {
    const st = S(b, { i: 0, j: 0 });
    return head(b) + `<div class="steps"><div class="stage" style="--ar:${b.ratio || .8}" data-stage="${b._id}">${stage(b)}</div>
      <ol class="slist">${b.etapes.map((e, i) => `<li><button class="step" type="button" data-step="${b._id}" data-i="${i}" aria-current="${i === st.i}"><span><span class="st-t">${tr(e.titre)}</span><span class="st-p"><span>${tr(e.texte)}</span></span></span></button></li>`).join('')}</ol></div>`;
  },

  photos(b) {
    return head(b) + `<div class="photos">${b.images.map((im, i) => `<figure class="tile${im.fond ? ' fond' : ''}" style="${ratioStyle(im.ratio)}; margin:0"${auto(im.ratio)}>
      <button class="tile-btn" type="button" data-photo="${b._id}" data-i="${i}" aria-label="${u('agrandir')} : ${attr(tr(im.legende))}"></button>
      <img src="${im.src}" alt="${attr(tr(im.legende))}" loading="lazy" decoding="async">${im.legende ? `<figcaption>${tr(im.legende)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  },

  experiences(b) {
    const L = CV.experiences.filter(e => e.categorie === b.categorie);
    return L.length ? `<div class="xcards">${L.map(e => `<div class="xcard"><span class="when">${tr(e.date)}${e.enCours ? `<em class="badge-now">${u('enCours')}</em>` : ''}</span><h4>${tr(e.titre)}</h4><p>${tr(e.lieu)}</p></div>`).join('')}</div>` : '';
  },

  memoire() { const m = CV.memoire; return `<div class="card mem big"><span class="when">${tr(m.date)}</span><h3 style="margin-top:.3rem">${tr(m.titre)}</h3>${paras(m.texte).map(p => `<p>${p}</p>`).join('')}</div>`; },

  bientot(b) {
    const o = (b.ornements || ['fan']).filter(x => ORN[x]);
    return `<div class="empty"><div><h3>${tr(b.titre)}</h3><p>${tr(b.texte)}</p><span class="soon">${u('bientot')}</span></div><div class="art">${o.map(x => ORN[x]({ fill: x === 'fan' ? '#E3AEB6' : '#FBF4DA' })).join('')}</div></div>`;
  },

  cv() {
    // couleur de la punaise et du fond de « photo » selon la catégorie de l'expérience
    const cat = { musee: ['var(--skyDeep)', 'var(--p-sky)', 'fan'], atelier: ['var(--roseDeep)', 'var(--p-rose)', 'flower'], kintsugi: ['var(--goldDeep)', 'var(--p-cream)', 'flower'] };
    const rot = [-2.5, 2, -1.4, 2.6, -2, 1.5], js = ['start', 'end', 'center', 'center'], m = CV.memoire;
    const card = (e, i) => {
      const [pinc, pc, orn] = cat[e.categorie] || ['var(--sageDeep)', 'var(--p-sage)', 'fan'];
      return `<li class="pcard${e.enCours ? ' now' : ''}" style="--col:${i % 2 + 1};--row:${i + 1};--js:${js[i % 4]};--jsm:${i % 2 ? 'end' : 'start'};--rot:${rot[i % rot.length]}deg;--px:${i % 2 ? 24 : 76}%;--pinc:${pinc};--pc:${pc}">
        <span class="pin" aria-hidden="true"></span>
        <div class="ph">${e.image ? `<img src="${e.image}" alt="" loading="lazy" decoding="async">` : ORN[orn]({ stroke: '#5E2B3B' })}</div>
        <div class="cap"><span class="when">${tr(e.date)}</span>${e.enCours ? `<span class="badge-now">${u('enCours')}</span>` : ''}
          <h3>${tr(e.titre)}</h3><p class="where">${tr(e.lieu)}</p>
          ${e.missions ? `<details><summary>${u('missions')}</summary><ul>${tr(e.missions).map(x => `<li>${x}</li>`).join('')}</ul></details>` : ''}</div></li>`;
    };
    const doodles = [['spark', 'top:22px;right:6%;width:30px'], ['spark', 'top:26%;left:47%;width:26px'], ['spark', 'bottom:34%;left:3%;width:22px'], ['spark', 'bottom:40%;right:3%;width:20px']]
      .map(([o, s]) => `<span class="doodle" style="${s}" aria-hidden="true">${ORN[o]()}</span>`).join('');
    return `<div class="cv-top"><p class="sub">${tr(CV.poste)}</p>${CV.pdf ? `<a class="dl" href="${CV.pdf}" download>${u('telecharger')}</a>` : ''}</div>
      <p class="cv-sum">${tr(CV.resume)}</p>
      <div class="board" data-board>${doodles}<svg class="threads" aria-hidden="true"></svg><svg class="threads heads" aria-hidden="true"></svg>
        <ol class="pins">${CV.experiences.map(card).join('')}</ol>
        <div class="notes">
          <div class="note" style="--nc:#DCE7EE;--rot:-1.4deg"><h3>${u('memoire')}</h3><span class="when">${tr(m.date)}</span><b style="margin-top:.4rem">${tr(m.titre)}</b>${paras(m.texte).map(p => `<p>${p}</p>`).join('')}</div>
          <div class="note" style="--nc:#F4EDCB;--rot:1.2deg"><h3>${u('formation')}</h3>${CV.formations.map(f => `<div><span class="when">${tr(f.date)}</span><b>${tr(f.titre)}</b><span class="meta">${tr(f.ecole)}</span><p>${tr(f.texte)}</p></div>`).join('')}</div>
          <div class="note" style="--nc:#F4DADF;--rot:-.8deg"><h3>${u('langues')}</h3>${CV.langues.map(l => `<div class="lang"><span>${tr(l.nom)} <span class="meta">· ${tr(l.detail)}</span></span><span class="lvl" aria-label="${l.niveau}/5">${[1, 2, 3, 4, 5].map(x => `<i class="${x <= l.niveau ? 'on' : ''}"></i>`).join('')}</span></div>`).join('')}
            <h3 style="margin-top:1.1rem">${u('logiciels')}</h3><div class="tools">${CV.logiciels.map(x => `<span>${x}</span>`).join('')}</div></div>
        </div></div>`;
  },

  contact() {
    const c = SITE.contact;
    return `<div class="contact-grid contact"><div class="ring"><div class="face"><img src="${c.portrait}" alt="${attr(SITE.nom)}" loading="lazy" decoding="async"></div><span class="orn-a">${ORN.flower()}</span><span class="orn-b">${ORN.fan()}</span></div>
      <div><h2>Contact</h2><p class="who">${SITE.nom}</p>
        <div class="mail"><a class="addr" href="mailto:${c.email}">${c.email}</a><button class="copy" type="button" id="copy">${u('copier')}</button></div>
        <div class="links">${c.telephone ? `<a href="tel:${c.telephone.replace(/\s/g, '')}">${c.telephone}</a>` : ''}${(c.liens || []).map(l => l.lien ? `<a href="${l.lien}" target="_blank" rel="noopener">${tr(l.texte)}</a>` : `<span>${tr(l.texte)}</span>`).join('')}</div>
      </div></div>`;
  },

  onglets(b) {
    const st = S(b, { i: 0 }), icons = ['flower', 'fan', 'spark', 'flower'];
    return `<div class="tabs" role="tablist" data-tabs="${b._id}"><span class="tab-thumb"></span>${b.onglets.map((o, i) =>
      `<button class="tab" type="button" role="tab" id="${b._id}-t${i}" aria-controls="${b._id}-p${i}" aria-selected="${i === st.i}" tabindex="${i === st.i ? 0 : -1}" data-tab="${b._id}" data-i="${i}">${(ORN[o.ornement] || ORN[icons[i % 4]])({ fill: i % 2 ? '#FBF4DA' : '#E3AEB6', stroke: '#5E2B3B' })}${tr(o.titre)}</button>`).join('')}</div>
      ${b.onglets.map((o, i) => `<div class="panel" role="tabpanel" id="${b._id}-p${i}" aria-labelledby="${b._id}-t${i}"${i === st.i ? '' : ' hidden'}>${(o.blocs || []).map(bloc).join('')}</div>`).join('')}`;
  }
};

function bloc(b) {
  const f = BLOCS[b.type];
  if (!f) { console.warn('Type de bloc inconnu dans contenu.js :', b.type); return ''; }
  return `<div class="bloc bloc-${b.type}${b.type === 'onglets' ? '' : ' rise'}" data-bloc="${b._id}">${f(b)}</div>`;
}
const rerender = id => { const el = $(`[data-bloc="${id}"]`); if (el) el.innerHTML = BLOCS[BLOC[id].type](BLOC[id]); };

/* ---------- pas à pas : image de l'étape ---------- */
function stage(b) {
  const st = S(b, { i: 0, j: 0 }), e = b.etapes[st.i], alt = tr(e.titre);
  if (e.avant && e.apres) return compare(e.avant, e.apres, b.ratio || .8, [u('avant'), u('apres')], alt);
  if (e.images) { const j = Math.min(st.j, e.images.length - 1);
    return `<div class="still"><img src="${e.images[j]}" alt="${attr(alt)} (${j + 1}/${e.images.length})" decoding="async"><div class="sdots">${e.images.map((_, k) => `<button type="button" data-sub="${b._id}" data-j="${k}" aria-label="${attr(alt)} ${k + 1}/${e.images.length}" aria-pressed="${k === j}">${k + 1}</button>`).join('')}</div></div>`; }
  return `<div class="still"><img src="${e.image}" alt="${attr(alt)}" decoding="async"></div>`;
}
const drawStage = b => { const el = $(`[data-stage="${b._id}"]`); if (el) el.innerHTML = stage(b); };

/* ---------- onglets : pastille qui glisse ---------- */
function placeThumbs() {
  $$('[data-tabs]').forEach(t => { const a = $('.tab[aria-selected="true"]', t), th = $('.tab-thumb', t); if (!a || !th) return;
    th.style.width = a.offsetWidth + 'px'; th.style.height = a.offsetHeight + 'px'; th.style.transform = `translate(${a.offsetLeft}px,${a.offsetTop}px)`; });
}
function showTab(id, i, focus) {
  const b = BLOC[id]; S(b, { i: 0 }).i = i;
  $$(`[data-tab="${id}"]`).forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
  b.onglets.forEach((_, k) => { $(`#${id}-p${k}`).hidden = k !== i; });
  placeThumbs(); if (focus) $(`#${id}-t${i}`).focus();
}

/* ---------- curseur avant / après ---------- */
function setPos(el, v) { v = Math.max(0, Math.min(100, v)); el.style.setProperty('--pos', v + '%'); el.classList.toggle('hl', v < 20); el.classList.toggle('hr', v > 80); const k = $('.knob', el); k && k.setAttribute('aria-valuenow', Math.round(v)); }
let dragEl = null;
document.addEventListener('pointerdown', e => {
  const el = e.target.closest('[data-ba]'); if (!el || e.target.closest('.open')) return;
  dragEl = el; el.classList.add('used'); el.setPointerCapture?.(e.pointerId);
  const r = el.getBoundingClientRect(); setPos(el, (e.clientX - r.left) / r.width * 100);
});
document.addEventListener('pointermove', e => { if (!dragEl) return; const r = dragEl.getBoundingClientRect(); setPos(dragEl, (e.clientX - r.left) / r.width * 100); });
['pointerup', 'pointercancel'].forEach(t => document.addEventListener(t, () => { dragEl = null; }));
document.addEventListener('keydown', e => {
  const k = e.target.closest?.('.knob'); if (!k) return; const el = k.closest('[data-ba]');
  const v = parseFloat(el.style.getPropertyValue('--pos')) || 50, m = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 }[e.key];
  if (m) { e.preventDefault(); setPos(el, v + m); } else if (e.key === 'Home') { e.preventDefault(); setPos(el, 0); } else if (e.key === 'End') { e.preventDefault(); setPos(el, 100); }
});
/* ratio automatique : quand une photo sans « ratio » se charge, on adopte ses proportions */
document.addEventListener('load', e => {
  const img = e.target; if (img.tagName !== 'IMG') return; const box = img.closest('[data-auto]');
  if (box && img.naturalWidth && !box.dataset.done) { box.style.setProperty('--ar', (img.naturalWidth / img.naturalHeight).toFixed(4)); box.dataset.done = 1; }
}, true);

/* ---------- fenêtre de détail ---------- */
const dlg = $('#lb'), lbb = $('#lbb');
let cur = null;   // { kind:'proj', id, p, v }  ou  { kind:'photo', id, i }
function openProject(id, p, v = 0) {
  const b = BLOC[id], pr = b.projets[p], views = pr.vues || [];
  cur = { kind: 'proj', id, p, v };
  const vs = views.map(x => typeof x === 'string' ? { src: x } : x);
  const big = v === 0 ? media(pr, pr.ratio) : `<img class="big" src="${vs[v - 1].src}" alt="${attr(tr(vs[v - 1].legende) || tr(pr.titre))}">`;
  const cap = v > 0 && vs[v - 1].legende ? `<p class="lb-cap meta">${tr(vs[v - 1].legende)}</p>` : '';
  const thumbs = vs.length ? `<ul class="thumbs"><li><button type="button" data-view="0" aria-pressed="${v === 0}" aria-label="${u('comparer')}"><img src="${pr.apres || pr.image}" alt=""><span class="ba-mini">${pr.avant ? u('comparer') : ''}</span></button></li>${vs.map((x, k) =>
    `<li><button type="button" data-view="${k + 1}" aria-pressed="${v === k + 1}" aria-label="${attr(tr(x.legende) || u('agrandir') + ' ' + (k + 1))}"><img src="${x.src}" alt="" loading="lazy"></button></li>`).join('')}</ul>` : '';
  lbb.className = 'lb-body';
  lbb.innerHTML = `<div class="lb-media">${big}${cap}</div><div class="lb-info"><h3>${tr(pr.titre)}</h3>${pr.materiau ? `<p class="meta">${word(pr.materiau)}</p>` : ''}${tags(pr.techniques)}${pr.description ? `<p class="desc">${tr(pr.description)}</p>` : ''}${thumbs}
    ${(S(b, {}).visible || []).length > 1 ? `<div class="lb-nav"><button type="button" data-nav="-1">${u('prec')}</button><button type="button" data-nav="1">${u('suiv')}</button></div>` : ''}</div>`;
  if (!dlg.open) dlg.showModal();
}
function openPhoto(id, i) {
  const L = BLOC[id].images, N = L.length; i = (i + N) % N; cur = { kind: 'photo', id, i }; const im = L[i];
  lbb.className = 'lb-body solo';
  lbb.innerHTML = `<div class="lb-media"><img class="big" src="${im.src}" alt="${attr(tr(im.legende))}">${im.legende ? `<p class="lb-cap">${tr(im.legende)}</p>` : ''}${N > 1 ? `<div class="lb-nav"><button type="button" data-nav="-1">${u('prec')}</button><button type="button" data-nav="1">${u('suiv')}</button></div>` : ''}</div>`;
  if (!dlg.open) dlg.showModal();
}
function navigate(d) {
  if (!cur) return;
  if (cur.kind === 'photo') return openPhoto(cur.id, cur.i + d);
  const vis = S(BLOC[cur.id], {}).visible || [], k = vis.indexOf(cur.p);
  openProject(cur.id, vis[(k + d + vis.length) % vis.length]);
}
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { cur = null; });
$('#lbx').addEventListener('click', () => dlg.close());
document.addEventListener('keydown', e => { if (!dlg.open || e.target.closest?.('.knob')) return; const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); navigate(d); } });
let sx = null;   // balayage du doigt sur mobile
dlg.addEventListener('touchstart', e => { sx = e.target.closest('[data-ba]') ? null : e.touches[0].clientX; }, { passive: true });
dlg.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 60) navigate(dx < 0 ? 1 : -1); sx = null; });

/* ---------- clics ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  let x;
  if ((x = t.closest('[data-open]'))) return openProject(x.dataset.open, +x.dataset.p);
  if ((x = t.closest('[data-view]')) && cur?.kind === 'proj') return openProject(cur.id, cur.p, +x.dataset.view);
  if ((x = t.closest('[data-nav]'))) return navigate(+x.dataset.nav);
  if ((x = t.closest('[data-photo]'))) return openPhoto(x.dataset.photo, +x.dataset.i);
  if ((x = t.closest('[data-filter]'))) { const st = STATE[x.dataset.filter]; st[x.dataset.k] = x.dataset.v; return rerender(x.dataset.filter); }
  if ((x = t.closest('[data-step]'))) { const b = BLOC[x.dataset.step], st = S(b, {}); st.i = +x.dataset.i; st.j = 0;
    $$(`[data-step="${b._id}"]`).forEach((s, k) => s.setAttribute('aria-current', k === st.i)); return drawStage(b); }
  if ((x = t.closest('[data-sub]'))) { const b = BLOC[x.dataset.sub]; S(b, {}).j = +x.dataset.j; return drawStage(b); }
  if ((x = t.closest('[data-tab]'))) return showTab(x.dataset.tab, +x.dataset.i);
  if (t.closest('#copy')) return copyMail();
  if (t.closest('#vase')) return playVase();
  if (t.closest('#links a')) { $('#nav').classList.remove('open'); $('#menu').setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', e => {
  const tab = e.target.closest?.('[data-tab]'); if (!tab) return; const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return;
  e.preventDefault(); const N = BLOC[tab.dataset.tab].onglets.length; showTab(tab.dataset.tab, (+tab.dataset.i + d + N) % N, true);
});

async function copyMail() {
  const mail = SITE.contact.email;
  try { await navigator.clipboard.writeText(mail); } catch (_) { const r = document.createRange(); r.selectNodeContents($('.addr')); getSelection().removeAllRanges(); getSelection().addRange(r); }
  const to = $('#toast'); to.textContent = u('copie'); to.classList.add('on'); setTimeout(() => to.classList.remove('on'), 1800);
}

/* ---------- CV : fil tendu entre les punaises, avec un léger affaissement ---------- */
function drawThreads(board) {
  const svgEl = $('.threads:not(.heads)', board), br = board.getBoundingClientRect();
  // les .pin des cartes servent de repères ; les punaises visibles sont redessinées ici, au-dessus du fil
  const pins = $$('.pin', board), P = pins.map(p => { const r = p.getBoundingClientRect(); return [r.left + r.width / 2 - br.left, r.top + r.height / 2 - br.top]; });
  svgEl.setAttribute('viewBox', `0 0 ${br.width} ${br.height}`);
  let out = '', heads = '', defs = '';
  for (let i = 1; i < P.length; i++) {
    const [x1, y1] = P[i - 1], [x2, y2] = P[i], sag = Math.min(46, Math.hypot(x2 - x1, y2 - y1) * .14);
    const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${((x1 + x2) / 2).toFixed(1)} ${(Math.max(y1, y2) + sag).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    out += `<path class="s" pathLength="1" style="--i:${i - 1}" d="${d}"/><path class="t" pathLength="1" style="--i:${i - 1}" d="${d}"/>`;
  }
  P.forEach(([x, y], i) => {
    const c = pins[i].closest('.pcard').style.getPropertyValue('--pinc'), now = pins[i].closest('.now');
    defs += `<radialGradient id="pg${i}" cx=".34" cy=".3" r=".75"><stop offset=".09" stop-color="#fff"/><stop offset=".35" style="stop-color:${c}"/><stop offset="1" style="stop-color:color-mix(in srgb,${c} 60%,#1d1a22)"/></radialGradient>`;
    heads += `<circle cx="${(x + 4).toFixed(1)}" cy="${(y + 7).toFixed(1)}" r="12" fill="rgba(40,30,40,.22)"/>${now ? `<circle class="ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="18" style="stroke:${c}"/>` : ''}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="url(#pg${i})"/>`;
  });
  svgEl.innerHTML = out;
  const headsEl = $('.heads', board); headsEl.setAttribute('viewBox', `0 0 ${br.width} ${br.height}`);
  headsEl.innerHTML = `<defs>${defs}</defs>${heads}`;
}
const boardRO = new ResizeObserver(es => es.forEach(e => drawThreads(e.target)));
const boardIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('seen'); boardIO.unobserve(e.target); } }), { threshold: .15 });
function setupBoards() {
  $$('[data-board]').forEach(b => {
    drawThreads(b); boardRO.observe(b);
    $$('details', b).forEach(d => d.addEventListener('toggle', () => drawThreads(b)));
    // le fil se déroule quand le tableau arrive à l'écran (seulement s'il est encore plus bas au chargement)
    if (!reduce && b.getBoundingClientRect().top > innerHeight) { b.classList.add('armed'); boardIO.observe(b); }
  });
}

/* ---------- affichage de toute la page ---------- */
function render() {
  document.documentElement.lang = lang;
  $('#brand').textContent = SITE.nom;
  $('#heroName').innerHTML = SITE.nom.replace(' ', '<br>');
  $('#heroRole').textContent = tr(SITE.metier);
  $('#heroLede').textContent = tr(SITE.accroche);
  $('#heroBtn').textContent = tr(SITE.boutonAccueil.texte); $('#heroBtn').href = SITE.boutonAccueil.lien;
  $('#hint').textContent = vase3d ? u('hint3d') : $('#heroArt').classList.contains('no3d') ? u('hint') : ''; $('#vase').setAttribute('aria-label', u('vase'));
  $('#lang').textContent = u('autre'); $('#lbx').setAttribute('aria-label', u('fermer'));
  $('#links').innerHTML = `<a href="#accueil">${u('accueil')}</a>` + SECTIONS.filter(s => s.menu).map(s => `<a href="#${s.id}">${tr(s.menu)}</a>`).join('');
  // chaque section devient une page à part, affichée seule (voir show())
  $('#sections').innerHTML = SECTIONS.map(s => `<section class="sec page ${s.fond || 'clair'}" id="${s.id}" data-view hidden><div class="wrap">
    ${s.titre ? `<header class="sec-head" style="--k:0"><h2>${tr(s.titre)}</h2>${s.sousTitre ? `<p class="sub">${tr(s.sousTitre)}</p>` : ''}</header>` : ''}
    <div class="blocs">${(s.blocs || []).map(bloc).join('')}</div></div></section>`).join('');
  $$('#sections .blocs').forEach(l => [...l.children].forEach((b, i) => b.style.setProperty('--k', i + 1)));
  $('#footer').textContent = `© ${new Date().getFullYear()} ${SITE.nom}`;
  setupBoards();
  if (current) show(current, false);
}

/* ---------- vase 3D : module chargé à la demande, le dessin SVG reste affiché en attendant ou en cas d'échec ---------- */
let vase3d = null, started3d = false;
function fallback2d() { $('#heroArt').classList.add('no3d'); $('#hint').textContent = u('hint'); playVase(); }
function start3d() {
  if (started3d) return;
  started3d = true;
  if (location.protocol === 'file:') return fallback2d();   // les modules ne se chargent pas en ouvrant le fichier directement
  import('./vase3d.js')
    .then(m => m.startVase($('#vase3d'), { reduce, onReady: () => { $('#heroArt').classList.add('has3d'); $('#hint').textContent = u('hint3d'); } }))
    .then(h => { vase3d = h; })
    .catch(err => { console.warn('Vase 3D indisponible, le dessin s\'affiche à la place :', err); fallback2d(); });
}

/* ---------- onglets du site : une page visible à la fois, choisie dans le menu ---------- */
let current = null;
const views = () => $$('[data-view]').map(v => v.id);
function show(id, animate = true) {
  if (!views().includes(id)) id = 'accueil';
  const first = current === null, same = id === current; current = id;
  const swap = () => {
    $$('[data-view]').forEach(v => { v.hidden = v.id !== id; });
    $$('#links a').forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + id));
    if (!same) scrollTo({ top: 0, behavior: 'instant' });
    const v = $('#' + id);
    // les blocs de la page arrivent l'un après l'autre
    v.classList.remove('enter'); void v.offsetWidth; if (!reduce) v.classList.add('enter');
    clearTimeout(v._t); v._t = setTimeout(() => v.classList.remove('enter'), 1400);
    placeThumbs();
    if (id === 'accueil' && !same) { if ($('#heroArt').classList.contains('no3d')) playVase(); vase3d?.replay(); start3d(); }
    $$('[data-board]', v).forEach(b => { drawThreads(b); if (!reduce && !same) { b.classList.remove('seen'); b.classList.add('armed'); setTimeout(() => b.classList.add('seen'), 250); } });
  };
  if (first && id === 'accueil') start3d();
  if (!animate || first || same || reduce) return swap();
  if (document.startViewTransition) document.startViewTransition(swap); else swap();
}
addEventListener('hashchange', () => show(location.hash.slice(1)));

/* ---------- barre de progression (défilement dans la page affichée) ---------- */
const prog = $('#progress'); let tick = false;
addEventListener('scroll', () => { if (tick) return; tick = true; requestAnimationFrame(() => { const h = document.documentElement; prog.style.transform = `scaleX(${Math.min(1, scrollY / (h.scrollHeight - innerHeight || 1))})`; tick = false; }); }, { passive: true });

$('#lang').addEventListener('click', () => { lang = lang === 'fr' ? 'en' : 'fr'; try { localStorage.setItem('lang', lang); } catch (_) {} render(); });
$('#menu').addEventListener('click', () => { const o = $('#nav').classList.toggle('open'); $('#menu').setAttribute('aria-expanded', o); });
addEventListener('resize', placeThumbs);
document.fonts?.ready.then(() => { placeThumbs(); $$('[data-board]').forEach(drawThreads); });

/* ---------- fond : dégradé pastel + grain mat, peints une seule fois en image, posés en fond fixe ---------- */
function paintGlass() {
  const W = 1600, H = Math.round(W * Math.min(2.2, Math.max(.5, innerHeight / innerWidth)));
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  // 1. le dégradé pastel (mêmes couleurs que body::before)
  const lin = x.createLinearGradient(W * .44, 0, W * .56, H);
  lin.addColorStop(0, css('--glass-top')); lin.addColorStop(.48, css('--glass-mid')); lin.addColorStop(1, css('--glass-low'));
  x.fillStyle = lin; x.fillRect(0, 0, W, H);
  const blob = (cx, cy, rx, ry, col) => { x.save(); x.translate(cx, cy); x.scale(1, ry / rx);
    const g = x.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, col); g.addColorStop(1, col + '00');
    x.fillStyle = g; x.fillRect(-rx, -rx, rx * 2, rx * 2); x.restore(); };
  blob(W * .96, H * .04, W * .6, H * .5, css('--glass-sage')); blob(W, H, W * .55, H * .45, css('--glass-lilac')); blob(0, H, W * .6, H * .5, '#DC9DAB');
  // 2. le grain mat : un léger bruit sur chaque pixel
  const img = x.getImageData(0, 0, W, H), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - .5) * 14; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  x.putImageData(img, 0, 0);
  c.toBlob(b => { if (!b) return; const g = $('#glass'); g.style.setProperty('--drops', `url(${URL.createObjectURL(b)})`); g.classList.add('ready'); }, 'image/jpeg', .9);
}

buildVase(); heroDeco(); render(); show(location.hash.slice(1), false);
(window.requestIdleCallback || setTimeout)(paintGlass);
})();
