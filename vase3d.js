/* =====================================================================
   VASE 3D DE L'ACCUEIL — normalement, pas besoin de modifier ce fichier.
   Paire de petits vases ornés de grues en vol, musée Manggha (Cracovie), via Sketchfab.
   Le vase se fissure, éclate, ses morceaux se rassemblent, puis l'or du kintsugi
   remplit les cassures. Chargé seulement quand l'accueil est affiché.
   ===================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// la géométrie est un fichier binaire maison (pas du WebAssembly) : l'extension .wasm garantit seulement
// qu'il est servi tel quel par n'importe quel hébergeur
const MODEL = '3d/vase-grues.wasm', TEXTURE = '3d/vase-grues.jpg';
const SHARDS = 9;   // nombre de morceaux
// moments clés de l'animation, en secondes
const T = { crack0: .8, crack1: 1.7, burst0: 1.7, burst1: 2.7, back0: 3.7, back1: 5.3, gold0: 5.5, gold1: 7.8, end: 8.6 };

const clamp01 = v => Math.max(0, Math.min(1, v));
const span = (t, a, b) => clamp01((t - a) / (b - a));
const easeOut = k => 1 - Math.pow(1 - k, 3);
const easeIO = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
let seed = 1142; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;

/* même déformation côté JS (découpe des morceaux) et côté GPU (tracé des joints) : des cassures irrégulières */
function warp(x, y, z) {
  return [x + .06 * Math.sin(3.1 * y + 1.7 * z + .3) + .018 * Math.sin(11.3 * y + 7.1 * z + 1.3),
          y + .06 * Math.sin(2.7 * z + 2.3 * x + 1.1) + .018 * Math.sin(10.7 * z + 8.9 * x + .4),
          z + .06 * Math.sin(2.9 * x + 1.9 * y + 2.2) + .018 * Math.sin(12.1 * x + 9.7 * y + 2.9)];
}
const GLSL = `
uniform vec3 uSeeds[${SHARDS}];
uniform int uShard;
uniform float uCrack, uGold, uShine, uTime;
varying vec3 vRest;
vec3 warpP(vec3 p){
  return p + vec3(.06*sin(3.1*p.y+1.7*p.z+.3) + .018*sin(11.3*p.y+7.1*p.z+1.3),
                  .06*sin(2.7*p.z+2.3*p.x+1.1) + .018*sin(10.7*p.z+8.9*p.x+.4),
                  .06*sin(2.9*p.x+1.9*p.y+2.2) + .018*sin(12.1*p.x+9.7*p.y+2.9));
}
float seamDist(vec3 p, out int best){         // distance à la frontière la plus proche + morceau auquel appartient le point
  vec3 q = warpP(p); float bd = 1e9; vec3 a = vec3(0.); best = 0;
  for(int i=0;i<${SHARDS};i++){ vec3 d=q-uSeeds[i]; float dd=dot(d,d); if(dd<bd){bd=dd;a=uSeeds[i];best=i;} }
  float m = 1e9;
  for(int i=0;i<${SHARDS};i++){ if(i==best) continue; vec3 b=uSeeds[i]; vec3 n=normalize(b-a); m=min(m,abs(dot(q-(a+b)*.5,n))); }
  return m;
}`;

async function loadGeometry() {
  const buf = await (await fetch(MODEL)).arrayBuffer();
  const h = new DataView(buf), n = h.getUint32(0, true), ni = h.getUint32(4, true), s = h.getFloat32(8, true);
  let o = 12;
  const qp = new Int16Array(buf, o, n * 3); o += n * 6;
  const qu = new Uint16Array(buf, o, n * 2); o += n * 4;
  const qn = new Int8Array(buf, o, n * 3); o += n * 3; o = (o + 3) & ~3;
  const idx = n < 65536 ? new Uint16Array(buf, o, ni) : new Uint32Array(buf, o, ni);
  const pos = Float32Array.from(qp, v => v * s), uv = Float32Array.from(qu, v => v / 65535), nor = Float32Array.from(qn, v => v / 127);
  return { n, pos, uv, nor, idx };
}

/* points de départ des morceaux, répartis régulièrement sur le vase (échantillonnage du plus éloigné) */
function pickSeeds(pos, n) {
  const sample = []; for (let i = 0; i < 1500; i++) { const k = Math.floor(rnd() * n) * 3; sample.push(warp(pos[k], pos[k + 1], pos[k + 2])); }
  const seeds = [sample[0]], dist = sample.map(() => Infinity);
  while (seeds.length < SHARDS) {
    const last = seeds[seeds.length - 1]; let far = 0;
    sample.forEach((p, i) => { dist[i] = Math.min(dist[i], (p[0] - last[0]) ** 2 + (p[1] - last[1]) ** 2 + (p[2] - last[2]) ** 2); if (dist[i] > dist[far]) far = i; });
    seeds.push(sample[far]);
  }
  return seeds;
}

/* découpe : chaque morceau reçoit ses triangles plus ceux qui touchent sa frontière ;
   le shader coupe ensuite au pixel près le long de la frontière exacte (bords lisses, sans trou) */
function cut(g, seeds) {
  const MARGIN = .03;
  const owners = new Array(g.n);   // pour chaque sommet : les morceaux dont il est proche
  for (let v = 0; v < g.n; v++) {
    const q = warp(g.pos[v * 3], g.pos[v * 3 + 1], g.pos[v * 3 + 2]);
    let best = 0, bd = Infinity;
    seeds.forEach((s, i) => { const d = (q[0] - s[0]) ** 2 + (q[1] - s[1]) ** 2 + (q[2] - s[2]) ** 2; if (d < bd) { bd = d; best = i; } });
    const a = seeds[best], set = [best];
    seeds.forEach((b, i) => {
      if (i === best) return;
      const n = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], l = Math.hypot(...n);
      const dist = Math.abs(((q[0] - (a[0] + b[0]) / 2) * n[0] + (q[1] - (a[1] + b[1]) / 2) * n[1] + (q[2] - (a[2] + b[2]) / 2) * n[2]) / l);
      if (dist < MARGIN) set.push(i);
    });
    owners[v] = set;
  }
  const tris = Array.from({ length: SHARDS }, () => []);
  for (let t = 0; t < g.idx.length; t += 3) {
    const s = new Set([...owners[g.idx[t]], ...owners[g.idx[t + 1]], ...owners[g.idx[t + 2]]]);
    for (const i of s) tris[i].push(g.idx[t], g.idx[t + 1], g.idx[t + 2]);
  }
  return tris.map((list, shard) => ({ list, shard })).filter(o => o.list.length).map(({ list, shard }) => {
    const remap = new Map(), P = [], U = [], N = [], I = [];
    for (const v of list) {
      if (!remap.has(v)) { remap.set(v, P.length / 3); P.push(g.pos[v * 3], g.pos[v * 3 + 1], g.pos[v * 3 + 2]); U.push(g.uv[v * 2], g.uv[v * 2 + 1]); N.push(g.nor[v * 3], g.nor[v * 3 + 1], g.nor[v * 3 + 2]); }
      I.push(remap.get(v));
    }
    const ctr = new THREE.Vector3(); for (let i = 0; i < P.length; i += 3) ctr.add(new THREE.Vector3(P[i], P[i + 1], P[i + 2])); ctr.divideScalar(P.length / 3);
    for (let i = 0; i < P.length; i += 3) { P[i] -= ctr.x; P[i + 1] -= ctr.y; P[i + 2] -= ctr.z; }   // pivot au centre du morceau
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
    geo.setIndex(I);
    return { geo, ctr, shard };
  });
}

function makeMaterial(map, shared, ctr, shard) {
  const m = new THREE.MeshStandardMaterial({ map, roughness: .32, metalness: 0, side: THREE.DoubleSide, envMapIntensity: .9 });
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, shared, { uC: { value: ctr }, uShard: { value: shard } });
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nuniform vec3 uC;\nvarying vec3 vRest;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRest = position + uC;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + GLSL)
      .replace('#include <map_fragment>', `#include <map_fragment>
        int own; float sd = seamDist(vRest, own);
        if (own != uShard) discard;   // bord du morceau découpé au pixel près : une courbe lisse, pas des dents de triangles
        // 1. fêlures sombres
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.04,.025,.03), (1. - smoothstep(.0, .007, sd)) * uCrack);
        // 2. l'or remplit les joints, du pied vers le col
        float grow = clamp((uGold * 2.8 - (vRest.y + 1.)) / .45, 0., 1.);
        float w = .016 * grow;
        float gk = w > 0. ? 1. - smoothstep(w * .5, w, sd) : 0.;
        vec3 goldC = vec3(1., .78, .34);
        diffuseColor.rgb = mix(diffuseColor.rgb, goldC, gk);`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, .2, gk);')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = mix(metalnessFactor, 1., gk);')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += goldC * gk * (.06 + .55 * pow(max(0., sin(vRest.y * 5. - uTime * 2.2)), 14.) * uShine);`);
  };
  return m;
}

export async function startVase(box, { onReady, reduce }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  box.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
  const key = new THREE.DirectionalLight(0xfff4e6, 1.6); key.position.set(2.5, 3, 4); scene.add(key);
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 50); camera.position.set(0, .25, 5.6); camera.lookAt(0, -.02, 0);

  const [g, map] = await Promise.all([loadGeometry(), new THREE.TextureLoader().loadAsync(TEXTURE)]);
  map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
  const seeds = pickSeeds(g.pos, g.n);
  const shared = { uSeeds: { value: seeds.map(s => new THREE.Vector3(...s)) }, uCrack: { value: 0 }, uGold: { value: 0 }, uShine: { value: 0 }, uTime: { value: 0 } };

  const vase = new THREE.Group(); vase.rotation.y = -.5; scene.add(vase);
  const pieces = cut(g, seeds).map(({ geo, ctr, shard }) => {
    const mesh = new THREE.Mesh(geo, makeMaterial(map, shared, ctr, shard)); mesh.position.copy(ctr); vase.add(mesh);
    const out = new THREE.Vector3(ctr.x, 0, ctr.z); if (out.lengthSq() < 1e-4) out.set(rnd() - .5, 0, rnd() - .5);
    out.normalize().multiplyScalar(.32 + rnd() * .34); out.y = (ctr.y * .35) + (rnd() - .3) * .35;
    return { mesh, ctr, out, axis: new THREE.Vector3(rnd() - .5, rnd() - .5, rnd() - .5).normalize(), turn: (rnd() - .5) * 1.6, delay: rnd() * .25 };
  });

  function size() { const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(size).observe(box); size();

  const q = new THREE.Quaternion();
  function pose(t) {
    shared.uCrack.value = span(t, T.crack0, T.crack1) * (1 - span(t, T.gold0, T.gold1));
    shared.uGold.value = easeIO(span(t, T.gold0, T.gold1));
    shared.uShine.value = span(t, T.gold1 - .6, T.end);
    for (const p of pieces) {
      const k = easeOut(span(t, T.burst0 + p.delay * .4, T.burst1)) * (1 - easeIO(span(t, T.back0 + p.delay, T.back1 - .25 + p.delay)));
      const hover = Math.sin(t * 1.7 + p.delay * 20) * .03 * k;
      p.mesh.position.copy(p.ctr).addScaledVector(p.out, k); p.mesh.position.y += hover;
      p.mesh.quaternion.copy(q.setFromAxisAngle(p.axis, p.turn * k));
    }
  }

  // interactions : glisser pour tourner le vase, cliquer pour rejouer
  let t = reduce ? T.end : 0, spin = 0, drag = null, moved = 0;
  box.addEventListener('pointerdown', e => { drag = e.clientX; moved = 0; box.setPointerCapture(e.pointerId); });
  box.addEventListener('pointermove', e => { if (drag == null) return; const dx = e.clientX - drag; drag = e.clientX; moved += Math.abs(dx); spin += dx * .012; });
  box.addEventListener('pointerup', () => { if (drag != null && moved < 5) t = 0; drag = null; });

  let visible = true, last = performance.now();
  new IntersectionObserver(es => { visible = es[0].isIntersecting; last = performance.now(); }).observe(box);
  pose(t); renderer.compile(scene, camera);
  renderer.setAnimationLoop(now => {
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!reduce && t < T.end + 1) t += dt;
    vase.rotation.y += (reduce ? 0 : dt * .28) + spin * .15; spin *= .85;
    shared.uTime.value = now / 1000;
    pose(t); renderer.render(scene, camera);
  });
  onReady?.();
  return { replay: () => { t = 0; } };
}
