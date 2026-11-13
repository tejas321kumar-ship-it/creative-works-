import Link from "next/link";
import { projects, site, whatsappLink } from "@/data/site";
import Media from "./Media";

// Closing call to action: big line, round WhatsApp button, a few work tiles floating around it.
const tiles = [
  { slug: "sds-tourism", style: { left: "6%", top: "14%", width: "clamp(120px, 13vw, 200px)", aspectRatio: "4 / 5", rotate: "-7deg" } },
  { slug: "metricspatio", style: { left: "11%", bottom: "10%", width: "clamp(110px, 11vw, 170px)", aspectRatio: "1", rotate: "5deg" } },
  { slug: "my-holidays-happiness", style: { right: "7%", top: "10%", width: "clamp(120px, 12vw, 190px)", aspectRatio: "4 / 3", rotate: "6deg" } },
];

export default function Cta({ title = "Got an idea? Let's build it." }: { title?: string }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      {tiles.map((t) => {
        const p = projects.find((x) => x.slug === t.slug);
        return p ? (
          <div key={t.slug} className="tile" style={t.style as React.CSSProperties} aria-hidden="true">
            <Media project={p} className="fill" />
          </div>
        ) : null;
      })}
      <div className="wrap" style={{ position: "relative" }}>
        <span className="tag">{site.availability}</span>
        <h2 className="h2" id="cta-title" style={{ marginTop: 18 }}>{title}</h2>
        <p className="lead">Tell us what you&rsquo;re making and we&rsquo;ll come back with a plan and a price.</p>
        <div className="cta-actions">
          <Link className="btn" href="/contact/">Send an enquiry <span className="arr" aria-hidden="true">→</span></Link>
          <a className="btn btn-line" href={`tel:+${site.phoneRaw}`}>Call {site.phone}</a>
        </div>
      </div>
      <a className="round" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp<br />us</a>
    </section>
  );
}
