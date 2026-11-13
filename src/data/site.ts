// Single source of truth for the site's content.
// Facts come from content/requirements.md and content/brand-and-pricing.md.
// Rule: never invent numbers, quotes or results. Leave a field empty and the UI hides it.

export const site = {
  name: "creative works",
  legalName: "Creative Works",
  parent: "A unit of SaiDurga Enterprises",
  descriptor: "A Digital Marketing & Technology Company",
  logoTagline: "Innovation | Design | Marketing",
  tagline: ["Creative Ideas.", "Powerful Execution.", "Measurable Growth."],
  // Set NEXT_PUBLIC_SITE_URL to the real domain once it is bought. Render's onrender.com URL is used until then.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "http://localhost:3000"
  ).replace(/\/$/, ""),
  phone: "+91 76196 72667",
  phoneRaw: "917619672667",
  email: "creativestudios018@gmail.com",
  address: {
    street: "1950, 1st B Main Road, 13th Cross, RPC Layout",
    locality: "Vijayanagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560040",
    country: "IN",
  },
  // TODO(client): add the real profile URLs. Empty ones are hidden.
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },
  brochure: "/creative-works-brochure.pdf",
  availability: "Open for new projects",
};

export const whatsappLink = (text = "Hi Creative Works, I'd like to talk about a project.") =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/clients/", label: "Clients" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

/* ---------------- Services ---------------- */

export type Pillar = "Creativity" | "Technology" | "Growth";

export const services: { name: string; pillar: Pillar; line: string; from?: string }[] = [
  { name: "AI Video Production", pillar: "Creativity", line: "AI-assisted films and reels, made fast and on brand." },
  { name: "Professional Video Production", pillar: "Creativity", line: "Shoots, edits and promotional films.", from: "Reels from ₹1,250" },
  { name: "Graphic Designing", pillar: "Creativity", line: "Posters, creatives, logos and brand identity.", from: "Identity from ₹5,000" },
  { name: "Content Creation", pillar: "Creativity", line: "Posts, reels and copy planned on a content calendar." },
  { name: "Website Development", pillar: "Technology", line: "Static, dynamic and e-commerce sites with payments and automation.", from: "From ₹15,000" },
  { name: "App Development", pillar: "Technology", line: "Android and iOS apps from one codebase, with admin panels.", from: "From ₹1,75,000" },
  { name: "Digital Marketing", pillar: "Growth", line: "Ad campaigns, SEO and Google Business Profile.", from: "Ads from ₹8,000/mo" },
  { name: "Social Media Management", pillar: "Growth", line: "Monthly plans with posters, reels and page management.", from: "From ₹15,000/mo" },
  { name: "Media Management", pillar: "Growth", line: "WhatsApp and email automation, publishing and reporting.", from: "From ₹10,000" },
];

/* ---------------- Pricing (from the brochure) ---------------- */

export type Plan = { name: string; price: string; note?: string; includes: string[]; popular?: boolean };

export const pricing: { id: string; title: string; intro: string; plans: Plan[] }[] = [
  {
    id: "websites",
    title: "Website development",
    intro: "One-time build price. Hosting and care are separate.",
    plans: [
      { name: "Static Website", price: "₹15,000 – ₹18,000", includes: ["Clean, fast business website", "Who you are and how to reach you"] },
      { name: "Dynamic Website", price: "₹22,000 – ₹26,000", includes: ["Edit it yourself", "Forms and blog", "More pages"], popular: true },
      { name: "Dynamic + Payments & Automation", price: "₹28,000 – ₹34,000", includes: ["Online payments", "Automated orders and emails", "Follow-ups"] },
      { name: "Full-Stack Web Development & Management", price: "From ₹60,000", note: "+ ₹8,000/month", includes: ["Design and development", "Hosting and updates", "Daily care"] },
      { name: "Custom Website", price: "Custom quote", includes: ["Built from scratch around your workflow"] },
    ],
  },
  {
    id: "social",
    title: "Social media marketing & management",
    intro: "Monthly plans. Ad spend and influencer reels are extra.",
    plans: [
      { name: "Basic", price: "₹15,000", note: "/month", includes: ["12 posters", "3 reels", "Page management", "Content calendar"] },
      { name: "Standard", price: "₹20,000", note: "/month", includes: ["15 posters", "8 reels", "Page management", "Brand assistance", "Content calendar"], popular: true },
      { name: "Elite", price: "₹35,000", note: "/month", includes: ["20 posters", "10 reels", "Page management", "WhatsApp & email automation", "Brand assistance", "Content calendar"] },
      { name: "Management & Upscaling", price: "From ₹50,000", note: "/month", includes: ["A growth plan for followers, reach and sales"] },
    ],
  },
  {
    id: "apps",
    title: "App development",
    intro: "Android and iOS from one codebase, launched on the stores.",
    plans: [
      { name: "Pro App", price: "₹1,75,000 – ₹2,00,000", includes: ["Up to 15 screens", "Custom UI/UX", "Sign-up, login and profile", "Admin panel", "Push notifications", "Payments", "Backend, database and APIs", "Store launch", "3 months support"] },
      { name: "Elite App", price: "₹2,75,000 – ₹4,00,000", includes: ["Everything in Pro", "25+ premium screens", "Multi-role logins and dashboards", "Real-time chat, maps and tracking", "Third-party and AI integrations", "Analytics, security and cloud", "App store optimisation", "6 months support"] },
    ],
  },
];

export const extras: { name: string; price: string }[] = [
  { name: "Logo & Brand Identity", price: "₹5,000 – ₹15,000" },
  { name: "E-commerce Website", price: "₹35,000 – ₹60,000" },
  { name: "SEO", price: "₹8,000 – ₹15,000 / month" },
  { name: "Google Business Profile Setup", price: "₹3,000 – ₹5,000" },
  { name: "Reel / Video Editing", price: "₹1,250 – ₹2,500 per reel" },
  { name: "WhatsApp & Email Automation", price: "₹10,000 – ₹25,000" },
  { name: "Ad Campaign Management", price: "₹8,000+ / month (ad spend extra)" },
  { name: "Website Care & Hosting", price: "₹6,000 – ₹15,000 / year" },
];

// Budget estimator lines: [low, high] in rupees. Mirrors the brochure.
export type EstimateItem = { id: string; label: string; group: string; low: number; high: number; per: "once" | "month" | "year" };
export const estimateItems: EstimateItem[] = [
  { id: "web-static", label: "Static website", group: "Website", low: 15000, high: 18000, per: "once" },
  { id: "web-dynamic", label: "Dynamic website", group: "Website", low: 22000, high: 26000, per: "once" },
  { id: "web-pay", label: "Dynamic + payments & automation", group: "Website", low: 28000, high: 34000, per: "once" },
  { id: "web-ecom", label: "E-commerce website", group: "Website", low: 35000, high: 60000, per: "once" },
  { id: "smm-basic", label: "Social media: Basic", group: "Social media", low: 15000, high: 15000, per: "month" },
  { id: "smm-standard", label: "Social media: Standard", group: "Social media", low: 20000, high: 20000, per: "month" },
  { id: "smm-elite", label: "Social media: Elite", group: "Social media", low: 35000, high: 35000, per: "month" },
  { id: "app-pro", label: "Pro app", group: "App", low: 175000, high: 200000, per: "once" },
  { id: "app-elite", label: "Elite app", group: "App", low: 275000, high: 400000, per: "once" },
  { id: "logo", label: "Logo & brand identity", group: "Add-ons", low: 5000, high: 15000, per: "once" },
  { id: "seo", label: "SEO", group: "Add-ons", low: 8000, high: 15000, per: "month" },
  { id: "gbp", label: "Google Business Profile setup", group: "Add-ons", low: 3000, high: 5000, per: "once" },
  { id: "auto", label: "WhatsApp & email automation", group: "Add-ons", low: 10000, high: 25000, per: "once" },
  { id: "ads", label: "Ad campaign management", group: "Add-ons", low: 8000, high: 8000, per: "month" },
  { id: "care", label: "Website care & hosting", group: "Add-ons", low: 6000, high: 15000, per: "year" },
];

/* ---------------- Projects ---------------- */

export type Tone = "red" | "blue" | "green" | "yellow" | "board" | "ink" | "chalk";

export type Result = { metric: string; before?: string; after: string; timeframe: string; source: string };

// A vertical film we made (9:16). Encoded files live in public/work/<slug>/.
export type Film = { id: string; title: string; kind: string; src: string; loop: string; poster: string };

export type Project = {
  slug: string;
  name: string;
  category: "Digital Marketing" | "Travel Marketing" | "EduTech" | "Branding" | "Web Development";
  industry: string;
  summary: string;
  services: string[];
  hero?: boolean;
  demo?: boolean; // a showcase build of our web work, not a client project: labelled "Showcase build", kept out of client counts
  live?: string; // the live website we built
  tone: Tone; // cube colour of the title card shown until real media arrives
  // Media lives in public/work/<slug>/. Fill these as files arrive.
  media: { poster?: string; video?: string; images?: string[]; portrait?: boolean };
  films?: Film[];
  brief?: string; // the "before": the idea or raw material, in the client's words
  approach?: string;
  results?: Result[]; // only real figures, each with a source
  quote?: { text: string; name: string; role: string };
};

const film = (slug: string, id: string, title: string, kind: string): Film => ({
  id,
  title,
  kind,
  src: `/work/${slug}/${id}.mp4`,
  loop: `/work/${slug}/${id}-loop.mp4`,
  poster: `/work/${slug}/${id}.webp`,
});

export const projects: Project[] = [
  {
    slug: "sevarpane",
    name: "Sevarpane",
    category: "Digital Marketing",
    industry: "Spiritual & seva",
    summary: "The website for booking temple sevas and poojas online, plus the seva films, posters and campaigns that bring devotees to it.",
    services: ["Seva & puja booking website", "Seva films", "Poster design", "Digital seva promotion"],
    hero: true,
    live: "https://sevarpane.in",
    tone: "red",
    approach:
      "We built sevarpane.in, where devotees book sevas and poojas at temples, shop sacred products, and check a Hindu calendar with each day's panchang and seva dates. For every seva we make a vertical film for social media: the temple, its story, the seva and its price.",
    media: {
      poster: "/work/sevarpane/home.webp",
      images: ["/work/sevarpane/sevas.webp", "/work/sevarpane/products.webp", "/work/sevarpane/calendar.webp"],
    },
    films: [
      film("sevarpane", "ahobila", "Lakshmi Narasimha Swamy, Ahobilam", "Seva film"),
      film("sevarpane", "srirangam", "Sri Ranganatha Swamy, Srirangam", "Seva film"),
      film("sevarpane", "kukke", "Kukke Shri Subramanya Temple", "Seva film"),
      film("sevarpane", "banke-bihari", "Shri Banke Bihari Mandir, Vrindavan", "Seva film"),
    ],
  },
  {
    slug: "varnika-sarees",
    name: "Varnika Sarees",
    category: "Web Development",
    industry: "Fashion & ethnic wear",
    summary: "An online saree boutique: new collections, a shop you can filter by weave, a step-by-step checkout and order tracking.",
    services: ["E-commerce website", "Product catalogue & filters", "Checkout & order tracking"],
    demo: true,
    live: "https://saree-demo-sskn.onrender.com/",
    tone: "green",
    media: {
      poster: "/work/varnika-sarees/home.webp",
      images: ["/work/varnika-sarees/collections.webp", "/work/varnika-sarees/shop.webp", "/work/varnika-sarees/checkout.webp"],
    },
  },
  {
    slug: "nutri-tious",
    name: "Nutri-tious",
    category: "Web Development",
    industry: "Sports nutrition",
    summary: "A premium sports-nutrition store: shop by brand or category, save to a wishlist, and find a store nearby.",
    services: ["E-commerce website", "Brand & category catalogue", "Store locations"],
    demo: true,
    live: "https://nutri-tious.onrender.com/",
    tone: "ink",
    media: {
      poster: "/work/nutri-tious/home.webp",
      images: ["/work/nutri-tious/featured.webp", "/work/nutri-tious/brands.webp"],
    },
  },
  {
    slug: "sds-tourism",
    name: "SDS Tourism",
    category: "Travel Marketing",
    industry: "Travel & tourism",
    summary: "Travel promotional videos, tour packages and social media content.",
    services: ["Travel films", "Tour package creatives", "Social media content"],
    hero: true,
    tone: "blue",
    media: { poster: "/work/sds-tourism/travellers.webp", portrait: true },
    films: [film("sds-tourism", "travellers", "Travellers on tour, in their own words", "Travel reel")],
  },
  {
    slug: "metricspatio",
    name: "Metricspatio Solutions",
    category: "EduTech",
    industry: "Education technology",
    summary: "Website development, digital branding and social media growth strategy.",
    services: ["Website development", "Digital branding", "Social media growth strategy"],
    hero: true,
    tone: "green",
    media: {},
  },
  {
    slug: "falcon-tours",
    name: "Falcon Tours & Travels",
    category: "Travel Marketing",
    industry: "Travel & tourism",
    summary: "Travel-related creative campaigns and promotional content.",
    services: ["Creative campaigns", "Promotional content"],
    tone: "board",
    media: {},
  },
  {
    slug: "my-holidays-happiness",
    name: "My Holidays Happiness",
    category: "Travel Marketing",
    industry: "Travel & tourism",
    summary: "Tour promotions, destination videos and digital creatives.",
    services: ["Tour promotions", "Destination videos", "Digital creatives"],
    tone: "yellow",
    media: {},
  },
  {
    slug: "insurance-campaigns",
    // TODO(client): the insurance client's name, if they allow it.
    name: "Insurance Campaigns",
    category: "Digital Marketing",
    industry: "Insurance",
    summary: "Promotional creatives for insurance products and services.",
    services: ["Promotional creatives", "Product campaigns"],
    tone: "ink",
    media: {},
  },
  {
    slug: "creative-works",
    name: "Creative Works",
    category: "Branding",
    industry: "Our own brand",
    summary: "Our own brand identity, promotional videos and marketing campaigns.",
    services: ["Brand identity", "Promotional videos", "Marketing campaigns"],
    tone: "chalk",
    media: {},
  },
];

export const clients = projects.filter((p) => p.slug !== "creative-works" && !p.demo);

// Every film across projects, newest client first, for the reels strip.
export const films = projects.flatMap((p) => (p.films ?? []).map((f) => ({ ...f, project: p })));

/* ---------------- Numbers (actual figures only) ---------------- */
// Each stat must carry its source. A stat with value null is not shown.
// TODO(client): fill projects completed, videos & creatives delivered, retention rate.

const industries = new Set(clients.map((c) => c.industry));

export const stats: { value: string | null; label: string; source: string }[] = [
  { value: String(clients.length), label: "Client brands featured", source: `Count of client projects shown on this site: ${clients.map((c) => c.name).join(", ")}.` },
  { value: String(industries.size), label: "Industries covered", source: `${[...industries].join(", ")}.` },
  { value: String(services.length), label: "Services under one roof", source: "Creativity, technology and growth services listed on the Services page." },
  { value: null, label: "Projects completed", source: "Project log, delivered and invoiced projects only." },
  { value: null, label: "Videos & creatives delivered", source: "Delivery folders per client, all formats." },
  { value: null, label: "Client retention rate", source: "Clients active for 2+ consecutive quarters ÷ all clients." },
];

// TODO(client): genuine testimonials only. The section is hidden while this is empty.
export const testimonials: { text: string; name: string; role: string; company: string }[] = [];
