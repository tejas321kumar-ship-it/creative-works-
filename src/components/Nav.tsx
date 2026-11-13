"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CubeMark from "./CubeMark";
import { nav, site, whatsappLink } from "@/data/site";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  const isCurrent = (href: string) => (path === href || path + "/" === href || (href !== "/" && path.startsWith(href)) ? "page" : undefined);

  return (
    <header className="wrap site-nav">
      <Link href="/" className="logo" aria-label="Creative Works, home">
        <CubeMark />
        {site.name}
      </Link>

      <nav aria-label="Main">
        <ul className="nav-links">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="ul" aria-current={isCurrent(n.href)}>
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={whatsappLink()} className="ul" target="_blank" rel="noopener">
              WhatsApp
            </a>
          </li>
        </ul>
      </nav>

      <div className="nav-actions">
        <Link href="/contact/" className="btn">
          Get a quote <span className="arr" aria-hidden="true">→</span>
        </Link>
        <button ref={openRef} className="menu-btn" aria-label="Open menu" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <span />
        </button>
      </div>

      {open && (
        <div className="sheet" id="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <button ref={closeRef} className="close" aria-label="Close menu" onClick={() => setOpen(false)}>
            ✕
          </button>
          <ul>
            <li><Link href="/" onClick={close}>Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isCurrent(n.href)} onClick={close}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <div className="meta">
            <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp {site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      )}
    </header>
  );
}
