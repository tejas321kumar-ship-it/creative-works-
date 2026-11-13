// Isometric Rubik's cube mark, drawn from the logo's colours.
// Stand-in until the client's logo file arrives (content/brand/). Mid-solve, like the logo.

type P = [number, number];
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// Bilinear point on quad a(0,0) b(1,0) c(1,1) d(0,1)
const at = (q: P[], u: number, v: number): P => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);

function stickers(q: P[], colours: string[], gap = 0.07) {
  const out: { pts: string; fill: string }[] = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++) {
      const u0 = c / 3 + gap / 3, u1 = (c + 1) / 3 - gap / 3;
      const v0 = r / 3 + gap / 3, v1 = (r + 1) / 3 - gap / 3;
      const pts = [at(q, u0, v0), at(q, u1, v0), at(q, u1, v1), at(q, u0, v1)]
        .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ");
      out.push({ pts, fill: colours[r * 3 + c] });
    }
  return out;
}

const B = "#2357D6", G = "#16794A", R = "#C8322A", Y = "#F5C518", W = "#F4F2EC";
const top: P[] = [[16, 2], [29, 9.5], [16, 17], [3, 9.5]];
const left: P[] = [[3, 9.5], [16, 17], [16, 31], [3, 23.5]];
const right: P[] = [[16, 17], [29, 9.5], [29, 23.5], [16, 31]];

const faces = [
  ...stickers(top, [B, B, Y, B, B, B, W, B, B]),
  ...stickers(left, [G, G, G, G, R, G, G, G, G]),
  ...stickers(right, [R, R, B, R, R, R, R, Y, R]),
];

export default function CubeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 33" className={className} aria-hidden="true" focusable="false">
      <polygon points="16,1 30,9 30,24.2 16,32 2,24.2 2,9" fill="#121614" />
      {faces.map((f, i) => (
        <polygon key={i} points={f.pts} fill={f.fill} />
      ))}
    </svg>
  );
}
