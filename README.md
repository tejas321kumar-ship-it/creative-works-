# Creative Works — website

Portfolio site for Creative Works, a digital marketing & technology studio in Vijayanagar, Bengaluru.
Next.js (static export) + GSAP, deployed as a Render Static Site.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run lint
```

## Deploy (Render)

`render.yaml` is a Render Blueprint: Render → New → Blueprint → pick this repo.
It builds with `npm ci && npm run build` and publishes `out/`. Every push to `main` redeploys.

Environment variables (Render → service → Environment, then redeploy):

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The live domain, no trailing slash. Used for canonical URLs, sitemap and social previews. Falls back to the onrender.com URL. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Optional Formspree/Web3Forms URL for the enquiry form. Empty: the form opens WhatsApp with the enquiry filled in. |

## Editing content

Almost everything lives in `src/data/site.ts`: contact details, services and prices, projects,
films, stats and testimonials. Figures stay empty until there is a real, sourced number; empty
stats and testimonials are hidden automatically.

- Project media: `public/work/<project-slug>/`
- Films: full film `<id>.mp4` (720×1280), silent 6 s loop `<id>-loop.mp4`, poster `<id>.webp`
- Brochure: put the PDF at `public/creative-works-brochure.pdf` (the download links appear once it exists)
- Showcase builds (not paying clients) set `demo: true` and are labelled "Showcase build"
