import Link from "next/link";

export default function PageHead({ tag, title, lead, crumb }: { tag: string; title: string; lead?: React.ReactNode; crumb?: { href: string; label: string } }) {
  return (
    <header className="page-head wrap">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/">Home</Link>
        {crumb && (
          <>
            {" / "}
            <Link href={crumb.href}>{crumb.label}</Link>
          </>
        )}
        {" / "}
        <span aria-current="page">{tag}</span>
      </nav>
      <h1 className="page-title" data-reveal>{title}</h1>
      {lead && <p className="lead" data-reveal>{lead}</p>}
    </header>
  );
}
