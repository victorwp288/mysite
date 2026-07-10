# victorwp.com

Personal portfolio and public résumé for Victor Wejergang Petersen.

The site is intentionally static: semantic HTML, one stylesheet, and a small progressive-enhancement script. All important content remains readable without JavaScript.

## Preview locally

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Pages

- `index.html` — portfolio, selected work, experience, about, and contact.
- `cv.html` — public résumé with a print/save-to-PDF action.

## Content notes

- Public contact details omit phone number and street address by design.
- FuelScout artwork is labeled as a concept, not a production screenshot.
- Exact Auditdata dates are intentionally reduced to the verified year.
- Career facts were reconciled against the current CV, official transcripts, and diplomas in July 2026.

## Updating

- Keep career facts in `index.html` and `cv.html` synchronized.
- Replace `assets/og-image.png` after major hero changes.
- Test at desktop and mobile widths, with JavaScript disabled, and with reduced motion enabled.
