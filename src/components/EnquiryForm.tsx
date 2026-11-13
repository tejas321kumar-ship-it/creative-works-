"use client";

import { useState, useSyncExternalStore } from "react";
import { services, site, whatsappLink } from "@/data/site";

type Fields = { name: string; company: string; email: string; phone: string; service: string; description: string };
const empty: Fields = { name: "", company: "", email: "", phone: "", service: "", description: "" };

// Where enquiries go. Set NEXT_PUBLIC_FORM_ENDPOINT to a form service URL that accepts JSON
// (for example Formspree or Web3Forms). Without it, the form opens WhatsApp with the details filled in.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim() && !f.phone.trim()) e.email = "Give us an email or a phone number so we can reply.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look right, for example name@company.com.";
  if (f.phone && f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a 10-digit phone number.";
  if (!f.service) e.service = "Choose a service, or 'Not sure yet'.";
  if (f.description.trim().length < 10) e.description = "Tell us a little about the project (a sentence is enough).";
  return e;
}

// Reads ?service= from the URL (links on the Services page) without breaking static prerendering.
const noop = () => () => {};
function useServiceParam() {
  const s = useSyncExternalStore(noop, () => new URLSearchParams(location.search).get("service") ?? "", () => "");
  return services.some((x) => x.name === s) ? s : "";
}

export default function EnquiryForm() {
  const service = useServiceParam();
  return <Form key={service} service={service} />;
}

function Form({ service }: { service: string }) {
  const [f, setF] = useState<Fields>({ ...empty, service });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "whatsapp" | "error">("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const message = () =>
    `New enquiry from the website\nName: ${f.name}\nCompany: ${f.company || "-"}\nEmail: ${f.email || "-"}\nPhone: ${f.phone || "-"}\nService: ${f.service}\nProject: ${f.description}`;

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    if (!ENDPOINT) {
      window.open(whatsappLink(message()), "_blank", "noopener");
      setStatus("whatsapp");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f, _subject: `Website enquiry: ${f.service}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setF(empty);
    } catch {
      setStatus("error");
    }
  }

  const field = (k: keyof Fields, label: string, input: React.ReactNode, opts: { full?: boolean; optional?: boolean } = {}) => (
    <div className={`field${opts.full ? " full" : ""}`}>
      <label htmlFor={`f-${k}`}>
        {label} {opts.optional && <span className="opt">(optional)</span>}
      </label>
      {input}
      {errors[k] && <p className="err" id={`e-${k}`}>{errors[k]}</p>}
    </div>
  );
  const a = (k: keyof Fields) => ({ id: `f-${k}`, name: k, value: f[k], onChange: set(k), "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form className="form" onSubmit={submit} noValidate>
      {field("name", "Your name", <input {...a("name")} autoComplete="name" />)}
      {field("company", "Company", <input {...a("company")} autoComplete="organization" />, { optional: true })}
      {field("email", "Email", <input {...a("email")} type="email" autoComplete="email" inputMode="email" />)}
      {field("phone", "Phone / WhatsApp", <input {...a("phone")} type="tel" autoComplete="tel" inputMode="tel" />)}
      {field(
        "service",
        "Service required",
        <select {...a("service")}>
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
          <option>Not sure yet</option>
        </select>,
        { full: true },
      )}
      {field("description", "Project description", <textarea {...a("description")} placeholder="What are you making, who is it for, and when do you need it?" />, { full: true })}
      <div className="form-foot">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"} <span className="arr" aria-hidden="true">→</span>
        </button>
        <p className="form-status" role="status">
          {status === "sent" && "Thanks! Your enquiry is with us and we'll get back to you soon."}
          {status === "whatsapp" && "WhatsApp opened with your details. Just press send."}
          {status === "error" && (
            <>Something went wrong sending the form. Please email <a href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp us.</>
          )}
        </p>
      </div>
    </form>
  );
}
