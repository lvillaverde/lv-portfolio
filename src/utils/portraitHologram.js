// Pixel portrait hologram for the end of the hero animation.
// The photo's light sets each pixel's colour; its depth comes from three hand-tuned
// profile lines (left cheek, centre axis, right cheek) blended across the face.
// createPortrait(src) returns { ready(), draw(b, opts) }; draw works in buffer pixels.

const LINES = [
  { x: 0.324, profile: [[0, 0.24], [0.032, 0.569], [0.107, 0.678], [0.219, 0.708], [0.259, 0.615], [0.297, 0.684], [0.35, 0.676], [0.378, 0.627], [0.395, 0.597], [0.412, 0.579], [0.428, 0.565], [0.446, 0.538], [0.47, 0.408], [0.475, 0.405], [0.622, 0.477], [0.787, 0.41], [1, 0.613]] },
  { x: 0.446, profile: [[0, 0.3], [0.028, 0.7], [0.095, 0.88], [0.176, 0.859], [0.242, 0.839], [0.282, 0.889], [0.365, 0.958], [0.372, 0.857], [0.388, 0.872], [0.395, 0.803], [0.417, 0.786], [0.435, 0.79], [0.47, 0.737], [0.475, 0.478], [0.612, 0.566], [0.7, 0.36], [1, 0.64]] },
  { x: 0.557, profile: [[0, 0.24], [0.076, 0.403], [0.081, 0.635], [0.195, 0.694], [0.24, 0.62], [0.292, 0.681], [0.367, 0.654], [0.383, 0.613], [0.395, 0.595], [0.413, 0.586], [0.43, 0.554], [0.46, 0.491], [0.47, 0.408], [0.475, 0.405], [0.612, 0.561], [0.7, 0.447], [1, 0.613]] },
];
// half the head/body width at each height, as a share of the crop width
const HALF_WIDTH = [[0, 0.12], [0.047, 0.18], [0.15, 0.25], [0.27, 0.27], [0.35, 0.27], [0.42, 0.22], [0.47, 0.15], [0.52, 0.14], [0.58, 0.3], [0.66, 0.5], [1, 0.55]];

// settings chosen in the study: 86 columns, 45% depth, axis at 44.6%
export const COLS = 86;
const DEPTH = 0.45;

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
const table = (T, x) => {
  if (x <= T[0][0]) return T[0][1];
  for (let i = 1; i < T.length; i++) if (x <= T[i][0]) { const [a, pa] = T[i - 1], [b, pb] = T[i]; return pa + (pb - pa) * (x - a) / (b - a); }
  return T[T.length - 1][1];
};
// Catmull-Rom through the profile nodes (same curve the editor drew)
const smooth = (T, x) => {
  if (x <= T[0][0]) return T[0][1];
  for (let i = 1; i < T.length; i++) if (x <= T[i][0]) {
    const p0 = T[Math.max(0, i - 2)][1], p1 = T[i - 1][1], p2 = T[i][1], p3 = T[Math.min(T.length - 1, i + 1)][1];
    const t = (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]), t2 = t * t, t3 = t2 * t;
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  return T[T.length - 1][1];
};

function headDepth(u, v, light) {
  const [L, C, R] = LINES, w = table(HALF_WIDTH, v), dx = (u - C.x) / w, round = 1 - dx * dx;
  if (round <= 0) return 0.05;
  const edge = (g) => Math.min(1, Math.sqrt(round / Math.max(0.05, 1 - ((g.x - C.x) / w) ** 2)));
  const pl = smooth(L.profile, v), pc = smooth(C.profile, v), pr = smooth(R.profile, v);
  let d;
  if (u <= L.x) d = pl * edge(L);
  else if (u >= R.x) d = pr * edge(R);
  else if (u < C.x) d = pl + (pc - pl) * ss(0, 1, (u - L.x) / (C.x - L.x));
  else d = pc + (pr - pc) * ss(0, 1, (u - C.x) / (R.x - C.x));
  return d + (light - 0.5) * 0.06;
}

const LO = [15, 158, 75], HI = [190, 255, 214];
// gain: the panel brightens everything to make up for the mesh; the portrait is pre-darkened
// by the same factor so its highlights keep their detail instead of clipping to white
let palette = null, paletteGain = 0;
const colors = (gain) => {
  if (gain !== paletteGain) {
    paletteGain = gain;
    palette = Array.from({ length: 33 }, (_, i) => {
      const k = Math.pow(i / 32, 2.1);   // steeper than the study: the panel glow lifts the shadows
      return `rgb(${LO.map((lo, j) => Math.round((lo + (HI[j] - lo) * k) / gain))})`;
    });
  }
  return palette;
};

export default function createPortrait(src) {
  let luma = null, lw = 0, lh = 0, cells = [], key = '';
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas'); lw = c.width = img.width; lh = c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, lw, lh).data;
    luma = new Float32Array(lw * lh);
    for (let i = 0; i < lw * lh; i++) luma[i] = d[i * 4] / 255;
  };
  img.src = src;
  const L = (x, y) => luma[clamp(Math.round(y), 0, lh - 1) * lw + clamp(Math.round(x), 0, lw - 1)];

  function build(cols, rows) {
    cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const u = (c + 0.5) / cols * lw, v = (r + 0.5) / rows * lh, hw = lw / cols / 2, hh = lh / rows / 2;
      let sum = 0, n = 0;
      for (let yy = v - hh; yy <= v + hh; yy += 1) for (let xx = u - hw; xx <= u + hw; xx += 1) { sum += L(xx, yy); n++; }
      const l = sum / n;
      let ns = 0, nn = 0;
      for (let yy = v - hh * 5; yy <= v + hh * 5; yy += hh) for (let xx = u - hw * 5; xx <= u + hw * 5; xx += hw) { ns += L(xx, yy); nn++; }
      const gx = L(u + hw * 2, v) - L(u - hw * 2, v), gy = L(u, v + hh * 2) - L(u, v - hh * 2);
      const edge = ss(0.015, 0.09, Math.hypot(gx, gy)) * (1 - ss(0.08, 0.18, ns / nn));
      const val = Math.max(Math.pow(ss(0.04, 0.72, l), 0.9), edge * 0.55);
      if (val < 0.07) continue;
      const ang = Math.random() * 6.283, far = 1.2 + Math.random() * 1.4;
      cells.push({
        c, r, val, depth: headDepth((c + 0.5) / cols, (r + 0.5) / rows, val),
        ci: Math.round(val * 32), ox: Math.cos(ang) * far, oy: Math.sin(ang) * far,
        delay: (r / rows) * 0.9 + Math.random() * 0.35, ph: Math.random() * 6.283, z2: 0,
      });
    }
  }

  // b: buffer context (identity transform); rect = phone screen in buffer px;
  // t = seconds since the portrait started forming; rot = {x, y} radians; alpha = device alpha
  function draw(b, { x: sx, y: sy, w: sw, h: sh }, t, rot, alpha, gain = 1) {
    const pal = colors(gain);
    if (!luma || sw < 8) return;
    // one cell per whole number of buffer pixels (fewer columns only if the phone is too small)
    const cols = Math.min(COLS, Math.max(12, Math.floor(sw))), step = Math.max(1, Math.floor(sw / cols)), rows = Math.round(sh / (sw / cols)), k0 = cols + 'x' + rows;
    if (k0 !== key) { key = k0; build(cols, rows); }
    const cw = sw / cols, cx = sx + sw / 2, cy = sy + sh * 0.4, Sd = sw * 0.5 * DEPTH, F = sw * 3.2;
    const cyR = Math.cos(rot.y), syR = Math.sin(rot.y), cxR = Math.cos(rot.x), sxR = Math.sin(rot.x);
    b.save();
    b.beginPath(); b.rect(sx, sy, sw, sh); b.clip();
    cells.sort((a, c) => a.z2 - c.z2);
    for (const c of cells) {
      const k = easeOut((t - c.delay) / 1.1);
      if (k <= 0) continue;
      const X = sx + (c.c + 0.5) * cw - cx, Y = sy + (c.r + 0.5) * cw - cy, z = Sd * (c.depth - 0.55);
      const x1 = X * cyR + z * syR, z1 = -X * syR + z * cyR, y1 = Y * cxR - z1 * sxR, z2 = Y * sxR + z1 * cxR;
      const p = F / (F - z2); c.z2 = z2;
      const px = cx + x1 * p, py = cy + y1 * p;
      const x = px + c.ox * sw * (1 - k), y = py + c.oy * sw * (1 - k);
      const tw = 0.88 + 0.12 * Math.sin(t * 2 + c.ph);
      b.globalAlpha = alpha * clamp((0.05 + 0.95 * c.val * c.val) * tw) * Math.min(1, k * 1.4);
      b.fillStyle = pal[c.ci];
      // size follows perspective and rounds up, so neighbours never leave gaps (that caused the moire)
      const size = Math.max(step, Math.ceil(cw * p));
      b.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size);
    }
    b.restore();
    b.globalAlpha = 1;
  }

  return { ready: () => !!luma, draw };
}
