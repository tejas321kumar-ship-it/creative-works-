import Link from "next/link";
import Wordmark from "./Wordmark";
import { nav, site, whatsappLink } from "@/data/site";
import { publicFileExists } from "@/lib/files";

const socialLabels: Record<keyof typeof site.social, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export default function Footer() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);
  const brochure = publicFileExists(site.brochure);
  return (
    <footer className="site-footer on-board">
      <div className="stripe" aria-hidden="true" />
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h2>
              Got an idea?
              <br />
              Let&rsquo;s build it.
            </h2>
            <p style={{ color: "var(--board-muted)", marginTop: 16, maxWidth: "34ch" }}>
              {site.descriptor}. {site.availability}.
            </p>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>
              <li><Link href="/" className="ul">Home</Link></li>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="ul">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Talk to us</h3>
            <ul>
              <li><a href={whatsappLink()} className="ul" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href={`tel:+${site.phoneRaw}`} className="ul">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="ul" style={{ overflowWrap: "anywhere" }}>Email us</a></li>
              {brochure && <li><a href={site.brochure} className="ul" download>Brochure (PDF)</a></li>}
            </ul>
          </div>
          <div>
            <h3>Studio</h3>
            <address style={{ fontStyle: "normal", color: "var(--board-muted)" }}>
              {site.address.street},<br />
              {site.address.locality}, {site.address.city} {site.address.postalCode}
            </address>
            {socials.length > 0 && (
              <ul style={{ marginTop: 14 }}>
                {socials.map((k) => (
                  <li key={k}><a href={site.social[k]} className="ul" target="_blank" rel="noopener">{socialLabels[k]}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="foot-legal">
          <span>© {new Date().getFullYear()} {site.legalName}. {site.parent}.</span>
          <span>{site.tagline.join(" ")}</span>
        </div>
      </div>
      <div className="wrap">
        <Wordmark className="foot-word" enter={false} />
      </div>
    </footer>
  );
}
