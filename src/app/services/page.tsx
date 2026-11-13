import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import Estimator from "@/components/Estimator";
import PageHead from "@/components/PageHead";
import { extras, pricing, services, type Pillar } from "@/data/site";

export const metadata: Metadata = {
  title: "Services & Prices",
  description:
    "Video production, graphic design, websites, apps, social media management and digital marketing in Bengaluru, with published prices and a budget estimator.",
  alternates: { canonical: "/services/" },
};

const pillars: { name: Pillar; colour: string }[] = [
  { name: "Creativity", colour: "var(--red)" },
  { name: "Technology", colour: "var(--blue)" },
  { name: "Growth", colour: "var(--green)" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHead
        tag="Services"
        title="services & prices"
        lead="Nine services in three groups, with the prices printed. Pick a plan, add what you need, and see your budget before we talk."
      />

      <section className="wrap" aria-label="All services">
        <div className="pillars" data-reveal>
          {pillars.map((p) => (
            <div className="pillar" key={p.name}>
              <h2 className="h3" style={{ display: "flex", alignItems: "center", gap: 12, textTransform: "uppercase", fontSize: "clamp(26px, 2.6vw, 38px)" }}>
                <i style={{ width: 18, height: 18, borderRadius: 4, background: p.colour }} aria-hidden="true" />
                {p.name}
              </h2>
              <ul>
                {services.filter((s) => s.pillar === p.name).map((s) => (
                  <li key={s.name}>
                    <b>{s.name}</b>
                    <span>{s.line}</span>
                    <Link className="ul" href={`/contact/?service=${encodeURIComponent(s.name)}`} style={{ display: "inline-block", marginTop: 8, fontSize: 14, fontWeight: 600 }}>
                      {s.from ? `${s.from} · Enquire →` : "Enquire →"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" aria-label="Price list">
        {pricing.map((block) => (
          <div className="price-block" id={block.id} key={block.id} style={{ scrollMarginTop: 24 }}>
            <div className="head-row">
              <div>
                <span className="tag">Plans</span>
                <h2 className="h2">{block.title}</h2>
              </div>
              <p className="lead" style={{ maxWidth: "40ch" }}>{block.intro}</p>
            </div>
            <div className="plans" data-reveal>
              {block.plans.map((plan) => (
                <article className={`plan${plan.popular ? " popular" : ""}`} key={plan.name}>
                  {plan.popular && <span className="badge">Most chosen</span>}
                  <h3>{plan.name}</h3>
                  <p className="plan-price">{plan.price}</p>
                  {plan.note && <p className="plan-note">{plan.note}</p>}
                  <ul>
                    {plan.includes.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        ))}

        <div className="price-block" id="extras">
          <div className="head-row">
            <div>
              <span className="tag">Add-ons</span>
              <h2 className="h2">Extras, priced alone</h2>
            </div>
          </div>
          <table className="extras" data-reveal>
            <caption className="sr-only">Add-on services and prices</caption>
            <tbody>
              {extras.map((e) => (
                <tr key={e.name}>
                  <td>{e.name}</td>
                  <td>{e.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section on-board" id="estimate" aria-labelledby="est-title" style={{ scrollMarginTop: 0 }}>
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="tag">Budget estimator</span>
              <h2 className="h2" id="est-title">Build your budget</h2>
            </div>
            <p className="lead" style={{ maxWidth: "38ch" }}>Choose a plan in each group and any add-ons. The range uses the prices above.</p>
          </div>
          <Estimator />
        </div>
      </section>

      <Cta title="Not sure what you need? Ask us." />
    </>
  );
}
