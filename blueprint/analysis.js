// Phân tích đồ thị lưới ô (CELL m) dựng lại từ WALLS — dùng cho bản vẽ blueprint. Thuần, chạy được trong node.
import { WALLS, MAZE, ONEWAY, CELL, GRID } from '../src/layout.js';

export const COLS = GRID.cols, ROWS = GRID.rows;
export const key = c => c.join(',');
const H = new Set(), V = new Set(); // H "x,z": tường ngang trên đường z từ x; V "x,z": tường dọc trên đường x từ z (đơn vị ô)
const cellOf = v => { const c = v / CELL, r = Math.round(c); return Math.abs(c - r) < 1e-3 ? r : null; };
for (const w of WALLS) {
  const [x1, z1, x2, z2] = w.map(cellOf); if ([x1, z1, x2, z2].includes(null)) continue; // tường Làng lệch lưới: bỏ
  if (z1 === z2) for (let x = x1; x < x2; x++) H.add(`${x},${z1}`);
  else for (let z = z1; z < z2; z++) V.add(`${x1},${z}`);
}
const inBox = ([x, z], [a, b, c, d]) => x >= a && x < c && z >= b && z < d;

export function nbs([x, z]) {
  const r = [];
  if (z > 0 && !H.has(`${x},${z}`)) r.push([x, z - 1]);
  if (z < ROWS - 1 && !H.has(`${x},${z + 1}`)) r.push([x, z + 1]);
  if (x > 0 && !V.has(`${x},${z}`)) r.push([x - 1, z]);
  if (x < COLS - 1 && !V.has(`${x + 1},${z}`)) r.push([x + 1, z]);
  return r;
}

// ô hành lang mê cung (đơn vị ô): z < MAZE.depth (trên Làng), ngoài 3 phòng
export const isMaze = ([x, z]) => x >= 0 && x < COLS && z >= 0 && z < MAZE.depth && !Object.values(MAZE.roomCells).some(b => inBox([x, z], b));

export const exitCell = () => MAZE.exit;

export function bfsPath(s, t, allow = () => true) {
  const prev = new Map([[key(s), null]]), q = [s];
  while (q.length) {
    const c = q.shift(); if (key(c) === key(t)) break;
    for (const n of nbs(c)) { if (!allow(n) || prev.has(key(n))) continue; prev.set(key(n), c); q.push(n); }
  }
  if (!prev.has(key(t))) return null;
  const p = []; for (let c = t; c; c = prev.get(key(c))) p.unshift(c);
  return p;
}

// nhánh: loang từ từng ô kề cổng, không đi qua ô cổng
export function branchOf() {
  const b = new Map(), gk = key(MAZE.gate);
  nbs(MAZE.gate).filter(isMaze).forEach((s, i) => {
    const q = [s]; b.set(key(s), i);
    while (q.length) for (const n of nbs(q.shift())) { if (!isMaze(n) || key(n) === gk || b.has(key(n))) continue; b.set(key(n), i); q.push(n); }
  });
  return b;
}

const countTurns = cells => {
  let t = 0;
  for (let i = 1; i < cells.length - 1; i++) {
    const [a, b, c] = [cells[i - 1], cells[i], cells[i + 1]];
    if (b[0] - a[0] !== c[0] - b[0] || b[1] - a[1] !== c[1] - b[1]) t++;
  }
  return t;
};

// nhánh cụt: từ ô ngõ cụt (bậc 1) đi ngược tới ngã ba / ô cổng / ô trước cửa phòng
export function deadEndBranches() {
  const stops = new Set([key(MAZE.gate), ...Object.values(MAZE.rooms).map(key)]);
  const ek = key(exitCell());
  const out = [];
  for (let z = 0; z < MAZE.depth; z++) for (let x = 0; x < COLS; x++) {
    const c = [x, z];
    if (!isMaze(c) || nbs(c).length !== 1 || stops.has(key(c)) || key(c) === ek) continue;
    const cells = [c]; let prev = null, cur = c;
    while (true) {
      const next = nbs(cur).filter(n => !(prev && key(n) === key(prev)));
      if (cur !== c && (nbs(cur).length >= 3 || stops.has(key(cur)))) break;
      if (next.length !== 1) break;
      prev = cur; cur = next[0]; cells.push(cur);
    }
    out.push({ cells, length: cells.length - 1, turns: countTurns(cells) });
  }
  return out.sort((a, b) => a.cells[0][1] - b.cells[0][1] || a.cells[0][0] - b.cells[0][0]);
}

// đồ thị có hướng ở một trạng thái (phần tử STAGES): cặp ô trong stage.closed bị khóa / tường xoay chặn, cửa một chiều chỉ đi from -> to
export function stateOut(stage) {
  const ek = (a, b) => `${key(a)}>${key(b)}`;
  const closed = new Set(), blocked = new Set(ONEWAY.map(o => ek(o.to, o.from)));
  for (const [a, b] of stage.closed) { closed.add(ek(a, b)); closed.add(ek(b, a)); }
  return c => nbs(c).filter(n => !closed.has(ek(c, n)) && !blocked.has(ek(c, n)));
}
export function pathIn(s, t, out, allow = isMaze) {
  const prev = new Map([[key(s), null]]), q = [s];
  while (q.length) { const c = q.shift(); if (key(c) === key(t)) break; for (const n of out(c)) { if (!allow(n) || prev.has(key(n))) continue; prev.set(key(n), c); q.push(n); } }
  if (!prev.has(key(t))) return null;
  const p = []; for (let c = t; c; c = prev.get(key(c))) p.unshift(c);
  return p;
}
