import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap page-head" style={{ minHeight: "60vh" }}>
      <span className="tag">404</span>
      <h1 className="page-title">page not found</h1>
      <p className="lead">This page moved or never existed. The work is still here.</p>
      <div className="hero-actions">
        <Link className="btn" href="/">Go home <span className="arr" aria-hidden="true">→</span></Link>
        <Link className="btn btn-line" href="/work/">See the work</Link>
      </div>
    </section>
  );
}
