import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import PageHead from "@/components/PageHead";
import Statement from "@/components/Statement";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Creative Works helps businesses establish and grow their digital presence by combining creativity, technology and marketing. A unit of SaiDurga Enterprises, based in Vijayanagar, Bengaluru.",
  alternates: { canonical: "/about/" },
};

const steps = [
  { name: "Idea", text: "We start with what you want people to feel and do, then shape it into a plan, a script or a design." },
  { name: "Execution", text: "Videos, posters, websites and apps made in-house, so the idea survives all the way to launch." },
  { name: "Growth", text: "Campaigns, publishing and reporting that tie the work back to reach, enquiries and sales." },
];

// TODO(client): team photos with names and roles, vision and mission. Sections appear once added.
export default function AboutPage() {
  return (
    <>
      <PageHead
        tag="About"
        title="ideas that grow businesses"
        lead="Creative Works was started to help businesses establish and grow their digital presence. We combine creativity, technology and marketing strategy to turn creative ideas into business growth."
      />

      <section className="wrap" aria-label="Our story" style={{ paddingBottom: "var(--section)" }}>
        <div className="two-col">
          <div>
            <span className="tag">Our story</span>
            <p className="hand" style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.15, marginTop: 18, color: "var(--chalk)", transform: "rotate(-1.5deg)" }}>
              Innovation | Design | Marketing
            </p>
          </div>
          <div className="prose">
            <p>
              From building websites to creating engaging videos and managing complete digital campaigns, we help brands connect with their audiences.
            </p>
            <p>
              Most businesses juggle a designer, a video editor, a developer and an ad agency. We put all of that under one roof, so the poster, the reel, the website and the ad all tell the same story.
            </p>
            <p>
              We work from {site.address.locality}, {site.address.city}, and with clients across India and abroad, remotely. {site.parent}.
            </p>
          </div>
        </div>
      </section>

      <section className="section on-board" aria-labelledby="how-title">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="tag">How we work</span>
              <h2 className="h2" id="how-title">Idea. Execution. Growth.</h2>
            </div>
            <p className="lead" style={{ maxWidth: "38ch" }}>{site.tagline.join(" ")}</p>
          </div>
          <div className="steps" data-reveal>
            {steps.map((s) => (
              <div className="step" key={s.name}>
                <b>{s.name}</b>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" aria-label="What we believe">
        <Statement
          parts={[
            { text: "Creativity gets noticed." },
            { text: "Technology makes it work.", hl: true },
            { text: "Growth is the point." },
          ]}
        />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
          <Link className="btn" href="/work/">See the work <span className="arr" aria-hidden="true">→</span></Link>
          <Link className="btn btn-line" href="/services/">Services &amp; prices</Link>
        </div>
      </section>

      <Cta />
    </>
  );
}
