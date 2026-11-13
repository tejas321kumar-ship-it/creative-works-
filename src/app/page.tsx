import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import Cta from "@/components/Cta";
import Statement from "@/components/Statement";
import Stats from "@/components/Stats";
import Wordmark from "@/components/Wordmark";
import WorkLedger from "@/components/WorkLedger";
import Reels from "@/components/Reels";
import SiteCards from "@/components/SiteCards";
import { clients, films, projects, services, site, testimonials, type Pillar } from "@/data/site";

const sites = projects.filter((p) => p.live);

const pillars: { name: Pillar; colour: string; line: string }[] = [
  { name: "Creativity", colour: "var(--red)", line: "Ideas people stop scrolling for." },
  { name: "Technology", colour: "var(--blue)", line: "Websites and apps that do the work." },
  { name: "Growth", colour: "var(--green)", line: "Campaigns measured in enquiries." },
];

const teaser = [
  { label: "Websites", price: "₹15,000", note: "Static site, one-time", href: "/services/#websites" },
  { label: "Social media", price: "₹15,000", note: "Per month, 12 posters + 3 reels", href: "/services/#social" },
  { label: "Apps", price: "₹1.75L", note: "Android + iOS, store launch", href: "/services/#apps" },
];

export default function Home() {
  const hero = projects.find((p) => p.slug === "sevarpane")!;
  return (
    <>
      {/* Hero: the name, then the idea against the execution */}
      <section className="wrap" aria-labelledby="hero-title">
        <Wordmark />
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="tag">Vijayanagar, Bengaluru</span>
            <h1 className="h1" id="hero-title" style={{ marginTop: 16 }}>
              Digital marketing &amp; technology studio for <em>brands that want to grow</em>
            </h1>
            <p className="lead">
              {site.tagline.join(" ")} Videos, design, websites, apps and ads under one roof, so your idea reaches people without changing hands five times.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact/">Start a project <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn btn-line" href="/work/">See our work</Link>
            </div>
            <div className="pillars-line" aria-label="What we do">
              {pillars.map((p) => (
                <span key={p.name}><i style={{ background: p.colour }} aria-hidden="true" />{p.name}</span>
              ))}
            </div>
          </div>
          <div>
            <BeforeAfter project={hero} before={hero.brief ?? "The idea: let devotees book temple sevas and poojas online."} />
            <p style={{ marginTop: 12, fontSize: 14, color: "var(--muted)" }}>
              Drag to see the brief become the work. <Link className="ul" href={`/work/${hero.slug}/`} style={{ color: "var(--ink)", fontWeight: 600 }}>Open {hero.name} →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Statement: the promise, read as you scroll */}
      <section className="section wrap" style={{ paddingTop: 0 }} aria-label="Our approach">
        <Statement
          as="p"
          parts={[
            { text: "Most brands have the idea." },
            { text: "Few get it made well,", hl: true },
            { text: "seen by the right people," },
            { text: "and counted.", hl: true },
            { text: "We do all three." },
          ]}
        />
      </section>

      {/* Selected work */}
      <section className="section wrap" style={{ paddingTop: 0 }} aria-labelledby="work-title">
        <div className="head-row">
          <div>
            <span className="tag">Selected work</span>
            <h2 className="h2" id="work-title">Brands we&rsquo;ve built for</h2>
          </div>
          <Link className="btn btn-line" href="/work/">All projects <span className="arr" aria-hidden="true">→</span></Link>
        </div>
        <div data-reveal>
          <WorkLedger items={clients} />
        </div>
      </section>

      {/* Films: the real reels */}
      <section className="section wrap" style={{ paddingTop: 0 }} aria-labelledby="films-title">
        <div className="head-row">
          <div>
            <span className="tag">Films we made</span>
            <h2 className="h2" id="films-title">Made for the feed</h2>
          </div>
          <p className="lead" style={{ margin: 0, maxWidth: "34ch" }}>Vertical films for seva bookings and tours. Tap one to watch it with sound.</p>
        </div>
        <Reels items={films} />
      </section>

      {/* Websites we built */}
      <section className="section wrap" style={{ paddingTop: 0 }} aria-labelledby="sites-title">
        <div className="head-row">
          <div>
            <span className="tag">Websites we&rsquo;ve built</span>
            <h2 className="h2" id="sites-title">Sites that take bookings and orders</h2>
          </div>
        </div>
        <SiteCards items={sites} />
      </section>

      {/* Services in three pillars */}
      <section className="section wrap" style={{ paddingTop: 0 }} aria-labelledby="svc-title">
        <div className="head-row">
          <div>
            <span className="tag">What we do</span>
            <h2 className="h2" id="svc-title">Nine services, three jobs</h2>
          </div>
          <Link className="btn btn-line" href="/services/">Services &amp; prices <span className="arr" aria-hidden="true">→</span></Link>
        </div>
        <div className="pillars" data-reveal>
          {pillars.map((p) => (
            <div className="pillar" key={p.name}>
              <h3><i style={{ background: p.colour }} aria-hidden="true" />{p.name}</h3>
              <p style={{ color: "var(--muted)", marginTop: 8 }}>{p.line}</p>
              <ul>
                {services.filter((s) => s.pillar === p.name).map((s) => (
                  <li key={s.name}>
                    <b>{s.name}</b>
                    <span>{s.line}</span>
                    {s.from && <em>{s.from}</em>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Open Ledger numbers */}
      <section className="section on-board" aria-labelledby="num-title">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="tag">Open ledger</span>
              <h2 className="h2" id="num-title">Numbers you can check</h2>
            </div>
            <p className="lead" style={{ maxWidth: "38ch" }}>Every figure on this site shows where it comes from. If we can&rsquo;t source it, we don&rsquo;t print it.</p>
          </div>
          <Stats />
        </div>
      </section>

      {/* Price teaser */}
      <section className="section wrap" aria-labelledby="price-title">
        <div className="head-row">
          <div>
            <span className="tag">Prices, in public</span>
            <h2 className="h2" id="price-title">Know the cost before the call</h2>
          </div>
          <Link className="btn btn-line" href="/services/#estimate">Estimate your budget <span className="arr" aria-hidden="true">→</span></Link>
        </div>
        <div className="prices" data-reveal>
          {teaser.map((t) => (
            <Link className="price" href={t.href} key={t.label}>
              <small>{t.label} from</small>
              <b>{t.price}</b>
              <span>{t.note}</span>
            </Link>
          ))}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section wrap" style={{ paddingTop: 0 }} aria-labelledby="t-title">
          <span className="tag">In their words</span>
          <h2 className="h2" id="t-title" style={{ marginTop: 14, marginBottom: 40 }}>What clients say</h2>
          <div className="plans">
            {testimonials.map((t) => (
              <figure className="quote" key={t.name} style={{ fontSize: 22 }}>
                <blockquote>{t.text}</blockquote>
                <figcaption>{t.name}, {t.role}, {t.company}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <Cta />
    </>
  );
}
