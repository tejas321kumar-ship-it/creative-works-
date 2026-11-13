"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Film, Project } from "@/data/site";

type Item = Film & { project: Project };

// Vertical films we made. Short muted loops play while on screen (never with reduced motion);
// a click opens the full film with sound.
export default function Reels({ items, showClient = true }: { items: Item[]; showClient?: boolean }) {
  const list = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.35 },
    );
    el.querySelectorAll("video").forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <ul className="reels" ref={list}>
        {items.map((f) => (
          <li key={f.id} className="reel">
            <button type="button" className="reel-btn" onClick={() => setOpen(f)} aria-label={`Play film: ${f.title}`}>
              <video src={f.loop} poster={f.poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
              <span className="reel-play" aria-hidden="true">▶</span>
            </button>
            <div className="reel-meta">
              <small>{f.kind}{showClient && <> · <Link href={`/work/${f.project.slug}/`} className="ul">{f.project.name}</Link></>}</small>
              <b>{f.title}</b>
            </div>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="player" aria-label={open ? open.title : "Film"} onClose={() => setOpen(null)} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {open && (
          <div className="player-in">
            <video key={open.id} src={open.src} poster={open.poster} controls autoPlay playsInline />
            <div className="player-bar">
              <span>{open.project.name}: {open.title}</span>
              <button type="button" className="close" onClick={() => setOpen(null)} aria-label="Close film">✕</button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
