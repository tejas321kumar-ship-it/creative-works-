import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHead from "@/components/PageHead";
import { site, whatsappLink } from "@/data/site";
import { publicFileExists } from "@/lib/files";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with Creative Works in Vijayanagar, Bengaluru. Call or WhatsApp ${site.phone}, email ${site.email}, or send an enquiry.`,
  alternates: { canonical: "/contact/" },
};

const a = site.address;
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.locality}, ${a.city} ${a.postalCode}`)}`;

export default function ContactPage() {
  const brochure = publicFileExists(site.brochure);
  return (
    <>
      <PageHead tag="Contact" title="let's talk" lead="Tell us about your project. Fill in the form, or skip it and message us on WhatsApp." />
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-label="Contact">
        <div className="contact-grid">
          <div data-reveal>
            <h2 className="h3" style={{ marginBottom: 24 }}>Send an enquiry</h2>
            <EnquiryForm />
          </div>
          <aside aria-label="Contact details" data-reveal>
            <ul className="contact-list">
              <li>
                <small>WhatsApp</small>
                <a href={whatsappLink()} target="_blank" rel="noopener">Message us →</a>
              </li>
              <li>
                <small>Phone</small>
                <a href={`tel:+${site.phoneRaw}`}>{site.phone}</a>
              </li>
              <li>
                <small>Email</small>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <small>Studio</small>
                <a href={mapUrl} target="_blank" rel="noopener">
                  {a.street}, {a.locality}, {a.city} {a.postalCode} ↗
                </a>
              </li>
              {brochure && (
                <li>
                  <small>Company profile</small>
                  <a href={site.brochure} download>Download the brochure (PDF)</a>
                </li>
              )}
            </ul>
            <p style={{ marginTop: 20, color: "var(--muted)", fontSize: 15 }}>{site.availability}. We work with clients across India and abroad.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
