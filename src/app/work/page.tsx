import type { Metadata } from "next";
import Cta from "@/components/Cta";
import PageHead from "@/components/PageHead";
import WorkGrid from "@/components/WorkGrid";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Campaigns, videos, creatives and websites by Creative Works for brands in travel, education technology, insurance and spiritual seva.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <PageHead tag="Work" title="the work" lead="Every project starts as a brief and ends as something people can watch, click or buy. Open one to see how it went from idea to execution." />
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-label="Projects">
        <WorkGrid items={projects} />
      </section>
      <Cta />
    </>
  );
}
