"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/site";
import Media from "./Media";

// Project list; hovering a row floats that project's picture beside the cursor.
export default function WorkLedger({ items }: { items: Project[] }) {
  const box = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  const move = (e: React.PointerEvent) => {
    const b = box.current?.getBoundingClientRect();
    if (!b || !peek.current) return;
    peek.current.style.setProperty("--px", `${e.clientX - b.left + 28}px`);
    peek.current.style.setProperty("--py", `${e.clientY - b.top - 120}px`);
  };

  return (
    <div className="ledger" ref={box} onPointerMove={move} onPointerLeave={() => setActive(null)}>
      <div className="ledger-head" aria-hidden="true">
        <span>Client</span>
        <span className="ind">Industry</span>
        <span className="what">What we made</span>
        <span />
      </div>
      {items.map((p) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}/`}
          className="ledger-row"
          onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p)}
          onFocus={() => setActive(null)}
        >
          <span className="n">{p.name}</span>
          <span className="m ind">{p.industry}</span>
          <span className="m what">{p.services.join(" · ")}</span>
          <span className="go" aria-hidden="true">→</span>
        </Link>
      ))}
      <div ref={peek} className={`peek${active ? " on" : ""}`} aria-hidden="true">
        {active && <Media project={active} className="peek-media" />}
      </div>
    </div>
  );
}
