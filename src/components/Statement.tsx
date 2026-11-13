"use client";

import { useEffect, useRef } from "react";

export type Part = { text: string; hl?: boolean };

// Words go from grey to ink as the paragraph scrolls through the viewport (GSAP ScrollTrigger).
// Server-rendered as plain text; with reduced motion or no JS it is fully readable.
export default function Statement({ parts, as: Tag = "p" }: { parts: Part[]; as?: "p" | "h2" }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let kill = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const words = [...el.querySelectorAll<HTMLElement>(".w")];
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 45%",
        scrub: true,
        onUpdate: (self) => {
          const k = Math.round(self.progress * words.length);
          words.forEach((w, i) => w.classList.toggle("on", i < k));
        },
      });
      kill = () => st.kill();
    })();
    return () => kill();
  }, []);

  let n = 0;
  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement & HTMLHeadingElement>} className="statement">
      {parts.map((p, pi) =>
        `${p.text}${pi < parts.length - 1 ? " " : ""}`.split(/(\s+)/).map((w, wi) =>
          w.trim() ? (
            <span key={`${pi}-${wi}`} className={p.hl ? "w hl" : "w"} data-i={n++}>
              {w}
            </span>
          ) : (
            w
          ),
        ),
      )}
    </Tag>
  );
}
