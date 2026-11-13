"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Page-level motion: fades sections in as they enter the viewport,
// and pauses autoplaying video for visitors who prefer reduced motion.
export default function Effects() {
  const path = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")];
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }
    if (reduce) document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => v.pause());
  }, [path]);

  return null;
}
