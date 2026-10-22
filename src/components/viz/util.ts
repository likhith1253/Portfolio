export type P = [number, number];

export const qb = (a: P, c: P, b: P, t: number): P => {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
};

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

const NS = "http://www.w3.org/2000/svg";
export function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent?: Element) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  parent?.appendChild(n);
  return n;
}

export const ACID = "#c8ff3e";
export const BLUE = "#7c9cff";
export const RED = "#ff5a3c";
export const AMBER = "#ffb547";
export const TEXT = "#eceae4";
export const MUTED = "#9aa0ab";
export const DIM = "#626875";
export const LINE = "rgba(236,234,228,0.12)";
export const MONO = "'JetBrains Mono Variable', ui-monospace, monospace";
