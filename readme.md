# C++ vs Java Control Center

Static multi-page website for GitHub Pages.

## Structure

- `index.html`
- `pages/domains.html`
- `pages/benchmarks.html`
- `pages/lab.html`
- `pages/archive.html`
- `assets/css/reset.css`
- `assets/css/theme.css`
- `assets/css/layout.css`
- `assets/css/components.css`
- `assets/css/pages.css`
- `assets/js/core/site.js`
- `assets/js/data/benchmark-data.js`
- `assets/js/data/decision-data.js`
- `assets/js/pages/home-page.js`
- `assets/js/pages/domains-page.js`
- `assets/js/pages/benchmarks-page.js`
- `assets/js/pages/lab-page.js`
- `assets/js/pages/archive-page.js`

## Design Direction

Deliberately ugly retro tooling aesthetic:

- old-school C toolchain / terminal / manual-page vibe
- source-file labels like `main.c`, `domains.h`, `bench.out`
- paper-like content panes inside a dark compiler-console shell
- monospace-first styling, ANSI-like colors, plain borders, no desktop chrome

## Notes

- Plain HTML, CSS and vanilla JavaScript only
- No frameworks
- Built for static hosting
- Content is intentionally balanced: pro-C++ in specific domains, but fair to Java
