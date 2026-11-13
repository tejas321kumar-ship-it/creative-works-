import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfter from "@/components/BeforeAfter";
import Cta from "@/components/Cta";
import Media from "@/components/Media";
import PageHead from "@/components/PageHead";
import Reels from "@/components/Reels";
import { projects } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name}: ${p.category}`,
    description: `${p.name} (${p.industry}). ${p.summary} A Creative Works project.`,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: `${p.name} | Creative Works`, description: p.summary, images: p.media.poster ? [p.media.poster] : undefined },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const images = p.media.images ?? [];
  const films = (p.films ?? []).map((f) => ({ ...f, project: p }));

  return (
    <>
      <PageHead tag={p.name} title={p.name.toLowerCase()} lead={p.summary} crumb={{ href: "/work/", label: "Work" }} />

      <section className="wrap" aria-label="Project">
        {p.brief ? (
          <BeforeAfter project={p} before={p.brief} />
        ) : (
          <Media project={p} className="cover" priority />
        )}
        <dl className="facts">
          <div>
            <dt>Category</dt>
            <dd>{p.category}</dd>
          </div>
          <div>
            <dt>Industry</dt>
            <dd>{p.industry}{p.demo && <><br />Showcase build</>}</dd>
          </div>
          <div>
            <dt>What we made</dt>
            <dd>
              <ul>{p.services.map((s) => <li key={s}>{s}</li>)}</ul>
            </dd>
          </div>
        </dl>
        {p.live && (
          <p style={{ marginTop: 28 }}>
            <a className="btn" href={p.live} target="_blank" rel="noopener">
              Visit {new URL(p.live).hostname.replace(/^www\./, "")} <span className="arr" aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        )}
      </section>

      {films.length > 0 && (
        <section className="section wrap" aria-labelledby="films-title">
          <span className="tag">Films</span>
          <h2 className="h2" id="films-title" style={{ marginTop: 14, marginBottom: 40 }}>
            {films.length === 1 ? "The film" : `${films.length} films`}
          </h2>
          <Reels items={films} showClient={false} />
        </section>
      )}

      {(p.brief || p.approach) && (
        <section className="section wrap" aria-label="Brief and approach">
          <div className="two-col">
            <div>
              <span className="tag">The idea</span>
              <h2 className="h2" style={{ marginTop: 14 }}>From brief to build</h2>
            </div>
            <div className="prose">
              {p.brief && <p><b>The brief.</b> {p.brief}</p>}
              {p.approach && <p><b>What we did.</b> {p.approach}</p>}
            </div>
          </div>
        </section>
      )}

      {p.results && p.results.length > 0 && (
        <section className="section on-board" aria-labelledby="res-title">
          <div className="wrap">
            <span className="tag">Open ledger</span>
            <h2 className="h2" id="res-title" style={{ marginTop: 14, marginBottom: 40 }}>What changed</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="results">
                <thead>
                  <tr><th>Metric</th><th>Before</th><th>After</th><th>Timeframe</th><th>Source</th></tr>
                </thead>
                <tbody>
                  {p.results.map((r) => (
                    <tr key={r.metric}>
                      <td>{r.metric}</td>
                      <td>{r.before ?? "–"}</td>
                      <td className="big">{r.after}</td>
                      <td>{r.timeframe}</td>
                      <td>{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="section wrap" aria-label="Gallery">
          <div className="gallery">
            {images.map((src, k) => (
              <div className="media shot" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${p.name}, screen ${k + 1}`} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </section>
      )}

      {p.quote && (
        <section className="section wrap" aria-label="Client quote">
          <figure className="quote">
            <blockquote>&ldquo;{p.quote.text}&rdquo;</blockquote>
            <figcaption>{p.quote.name}, {p.quote.role}</figcaption>
          </figure>
        </section>
      )}

      <div className="wrap" style={{ borderTop: "1px solid var(--line)", marginTop: "var(--section)" }}>
        <Link className="next-link" href={`/work/${next.slug}/`}>
          <span className="tag">Next project</span>
          <b>{next.name} →</b>
        </Link>
      </div>

      <Cta title="Want work like this? Let's talk." />
    </>
  );
}
