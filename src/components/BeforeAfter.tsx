"use client";

import { useRef, useState } from "react";
import type { Project } from "@/data/site";
import Media from "./Media";

// Drag to compare: the idea (left) against the finished work (right).
export default function BeforeAfter({ project, before }: { project: Project; before: string }) {
  const [x, setX] = useState(50);
  const [hint, setHint] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={`ba${hint ? " hinting" : ""}`} style={hint ? undefined : ({ ["--x" as string]: `${x}%` } as React.CSSProperties)}>
      <span className="lbl l">the idea</span>
      <span className="lbl r">the execution</span>
      <div className="side before">
        <p>{before}</p>
      </div>
      <div className="side after" style={{ padding: 0 }}>
        <Media project={project} className="ba-media" priority />
      </div>
      <div className="handle" aria-hidden="true">
        <span className="knob">⟷</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={x}
        onChange={(e) => {
          setHint(false);
          setX(Number(e.target.value));
        }}
        onPointerDown={() => setHint(false)}
        aria-label={`Compare the idea with the finished work for ${project.name}`}
        aria-valuetext={`${x}% idea`}
      />
    </div>
  );
}
