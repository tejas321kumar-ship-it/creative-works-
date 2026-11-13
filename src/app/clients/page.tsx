import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import PageHead from "@/components/PageHead";
import { clients } from "@/data/site";

export const metadata: Metadata = {
  title: "Clients",
  description: "Brands Creative Works has worked with: Sevarpane, SDS Tourism, Metricspatio Solutions, Falcon Tours & Travels, My Holidays Happiness and insurance campaigns.",
  alternates: { canonical: "/clients/" },
};

const toneBg: Record<string, string> = {
  red: "var(--red)", blue: "var(--blue)", green: "var(--green)", yellow: "var(--yellow)", board: "var(--board)", ink: "var(--ink)", chalk: "var(--chalk)",
};
const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

export default function ClientsPage() {
  return (
    <>
      <PageHead tag="Clients" title="who we work with" lead="Travel companies, an education-technology firm, insurance products and a spiritual seva platform. Different audiences, same goal: be seen and be chosen." />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...clients, ...clients].map((c, k) => <span key={`${c.slug}-${k}`}>{c.name}</span>)}
        </div>
      </div>

      <section className="section wrap" aria-label="Client list">
        <div className="client-list" data-reveal>
          {clients.map((c) => (
            <Link className="client-row" href={`/work/${c.slug}/`} key={c.slug}>
              <span className="mono" style={{ background: toneBg[c.tone], color: c.tone === "yellow" ? "var(--ink)" : "#fff" }} aria-hidden="true">
                {initials(c.name)}
              </span>
              <b>{c.name}</b>
              <span className="m">{c.industry}</span>
              <span className="m">{c.services.join(" · ")}</span>
              <span className="go" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <Cta title="Your brand could be next." />
    </>
  );
}
