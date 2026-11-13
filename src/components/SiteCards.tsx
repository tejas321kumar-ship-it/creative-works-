import Link from "next/link";
import type { Project } from "@/data/site";

const host = (u: string) => new URL(u).hostname.replace(/^www\./, "");

// Websites we built, each in a browser frame with its real home screen.
export default function SiteCards({ items }: { items: Project[] }) {
  return (
    <ul className="sites">
      {items.map((p) => (
        <li key={p.slug} className="site" data-reveal>
          <Link href={`/work/${p.slug}/`} className="site-frame" aria-label={`${p.name} case study`}>
            <span className="site-bar" aria-hidden="true">
              <i /><i /><i />
              <span>{host(p.live!)}</span>
            </span>
            <span className="site-shot">
              {p.media.poster && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.media.poster} alt={`${p.name} website, home screen`} loading="lazy" decoding="async" />
              )}
            </span>
          </Link>
          <div className="site-meta">
            <div>
              <h3>{p.name}</h3>
              <small>{p.demo ? "Showcase build" : "Live client site"} · {p.industry}</small>
            </div>
            <a className="ul" href={p.live} target="_blank" rel="noopener">
              Open site <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p>{p.summary}</p>
        </li>
      ))}
    </ul>
  );
}
