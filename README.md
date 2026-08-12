# Roushan Kumar Gupta — Portfolio

Personal portfolio of **Roushan Kumar Gupta**, Project Coordinator (Operations, Administration
& Projects) at **FocusOn Interiors Pvt. Ltd.**, Delhi — turnkey commercial interior fit-out
delivery across Bengaluru, Chennai, Pune and Delhi.

**Live:** https://roushan62.github.io/Portfolio/

---

## Stack

Deliberately framework-free so it deploys to GitHub Pages with zero build step.

| Layer | Choice |
| --- | --- |
| Markup | Semantic HTML5, single page |
| Styling | Hand-written CSS3 with custom properties (no framework, no CDN) |
| Behaviour | Vanilla JavaScript (~5 KB, no dependencies) |
| Fonts | Inter + Manrope via Google Fonts |
| Hosting | GitHub Pages (`.nojekyll`, static files served from the repo root) |

There is **no backend, no contact form, no analytics and no tracking**. Every contact route is a
plain `mailto:`, `tel:` or profile link.

## Design

Light theme throughout — soft ivory canvas (`#FBF8F3`), deep navy structure (`#12263F`) and a
single burnt-amber accent (`#B4531B`). Dark tones appear only as accent bands: the impact strip,
contact section and footer. Card-based layout, generous whitespace, subtle hover states and
`IntersectionObserver` scroll reveals that respect `prefers-reduced-motion`.

## Sections

Hero · Impact figures · About · Experience (timeline) · Ventures · Project portfolio (filterable)
· Skills · Builds (GitHub work) · Education & certifications (with lightbox) · Contact

## Structure

```
.
├── index.html                 # the whole site
├── assets/
│   ├── css/styles.css         # design tokens + all styling
│   ├── js/main.js             # nav, reveals, filters, lightbox, counters
│   └── img/
│       ├── favicon.svg
│       ├── roushan-portrait.jpg / -sm.jpg
│       └── certs/             # certificates (full + thumb)
├── CV_ROUSHAN.pdf             # downloadable résumé
├── .nojekyll
└── README.md
```

## Content sourcing

All content is drawn from the résumé, the previous version of this site, and public repositories
on [github.com/roushan62](https://github.com/roushan62). Project names, values and client names
appear exactly as recorded on the résumé; nothing is estimated or invented.

## Local preview

No build required — open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
```

## Deployment

GitHub Pages serves the repository root on push to the default branch. No workflow or build
step is needed.
