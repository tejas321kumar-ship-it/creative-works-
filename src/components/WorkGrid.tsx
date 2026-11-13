"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/site";
import Media from "./Media";

export default function WorkGrid({ items }: { items: Project[] }) {
  const cats = ["All", ...new Set(items.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? items : items.filter((p) => p.category === cat);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {cats.map((c) => (
          <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{`${shown.length} projects shown`}</p>
      <div className="work-grid">
        {shown.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}/`} className="work-card">
            <Media project={p} />
            <div className="meta">
              <h3>{p.name}</h3>
              <span>{p.demo ? `${p.category} · Showcase build` : p.category}</span>
            </div>
            <p>{p.summary}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
