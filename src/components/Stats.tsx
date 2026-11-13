"use client";

import { useState } from "react";
import { stats } from "@/data/site";

// Open Ledger: every number opens its source. Stats without a real value are not shown.
export default function Stats() {
  const [open, setOpen] = useState<number | null>(null);
  const shown = stats.filter((s) => s.value !== null);
  return (
    <div className="stats" style={{ "--cols": Math.min(shown.length, 3) } as React.CSSProperties}>
      {shown.map((s, i) => (
        <div className="stat" key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
          <button className="src-btn" aria-expanded={open === i} aria-controls={`src-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            {open === i ? "Hide source" : "See source"}
          </button>
          <p className="src" id={`src-${i}`} hidden={open !== i}>
            {s.source}
          </p>
        </div>
      ))}
    </div>
  );
}
