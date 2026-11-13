"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { estimateItems, whatsappLink, type EstimateItem } from "@/data/site";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const range = (lo: number, hi: number) => (lo === hi ? inr(lo) : `${inr(lo)} – ${inr(hi)}`);

const single = ["Website", "Social media", "App"]; // pick one in these groups
const groups = [...new Set(estimateItems.map((i) => i.group))];

// Budget estimator built from the published brochure prices.
export default function Estimator() {
  const [pick, setPick] = useState<Record<string, string>>({});
  const [addons, setAddons] = useState<string[]>([]);

  const chosen: EstimateItem[] = useMemo(
    () => estimateItems.filter((i) => Object.values(pick).includes(i.id) || addons.includes(i.id)),
    [pick, addons],
  );

  const sum = (per: EstimateItem["per"]) => {
    const xs = chosen.filter((i) => i.per === per);
    return xs.length ? [xs.reduce((a, i) => a + i.low, 0), xs.reduce((a, i) => a + i.high, 0)] : null;
  };
  const once = sum("once"), month = sum("month"), year = sum("year");

  const summary = chosen.length
    ? `Hi Creative Works, I used your estimator. I'm interested in: ${chosen.map((c) => c.label).join(", ")}.` +
      (once ? ` One-time: ${range(once[0], once[1])}.` : "") +
      (month ? ` Monthly: ${range(month[0], month[1])}.` : "")
    : "";

  return (
    <div className="est">
      <div>
        {groups.map((g) => (
          <fieldset key={g}>
            <legend>{single.includes(g) ? `${g} (choose one)` : `${g} (choose any)`}</legend>
            <div className="est-opts">
              {single.includes(g) && (
                <label className="est-opt">
                  <input type="radio" name={g} checked={!pick[g]} onChange={() => setPick((p) => { const n = { ...p }; delete n[g]; return n; })} />
                  <span>None</span>
                </label>
              )}
              {estimateItems
                .filter((i) => i.group === g)
                .map((i) =>
                  single.includes(g) ? (
                    <label className="est-opt" key={i.id}>
                      <input type="radio" name={g} checked={pick[g] === i.id} onChange={() => setPick((p) => ({ ...p, [g]: i.id }))} />
                      <span>{i.label}</span>
                    </label>
                  ) : (
                    <label className="est-opt" key={i.id}>
                      <input
                        type="checkbox"
                        checked={addons.includes(i.id)}
                        onChange={(e) => setAddons((a) => (e.target.checked ? [...a, i.id] : a.filter((x) => x !== i.id)))}
                      />
                      <span>{i.label}</span>
                    </label>
                  ),
                )}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="est-out" aria-live="polite">
        {chosen.length === 0 ? (
          <p style={{ marginTop: 0, fontSize: 17, color: "var(--board-ink)" }}>Pick what you need on the left and your price range appears here.</p>
        ) : (
          <dl>
            {once && (<><dt>One-time</dt><dd>{range(once[0], once[1])}</dd></>)}
            {month && (<><dt>Every month</dt><dd>{range(month[0], month[1])}</dd></>)}
            {year && (<><dt>Every year</dt><dd>{range(year[0], year[1])}</dd></>)}
          </dl>
        )}
        <p>Ranges from our published price list. Ad spend and influencer reels are extra. Your final quote depends on scope.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
          {chosen.length > 0 && (
            <a className="btn" href={whatsappLink(summary)} target="_blank" rel="noopener">
              Send on WhatsApp <span className="arr" aria-hidden="true">→</span>
            </a>
          )}
          <Link className="btn btn-line" href="/contact/">Ask for a quote</Link>
        </div>
      </div>
    </div>
  );
}
