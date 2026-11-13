// The giant "creative works" wordmark. Decorative: pages carry their own h1.
export default function Wordmark({ text = "creative works", enter = true, className = "wordmark" }: { text?: string; enter?: boolean; className?: string }) {
  return (
    <div className={className} aria-hidden="true" data-enter={enter ? "" : undefined}>
      <span className="mask">
        {[...text].map((ch, i) => (
          <span key={i} className="ch" style={{ ["--i" as string]: i }}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </div>
  );
}
