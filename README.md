# Yichao Yuan — Personal Website

A lightweight, responsive academic website for [yichao-yuan-99.github.io](https://yichao-yuan-99.github.io/). It is generated as plain static HTML, so GitHub Pages does not need a custom build environment.

## Updating content

All personal details, page copy, education, experience, publications, service, and skills live in [`content/site.json`](content/site.json). After editing that file, regenerate both pages:

```bash
node scripts/build.mjs
```

The page templates are split by responsibility under `scripts/lib/`. Do not hand-edit `index.html` or `cv.html`; they are generated files. To verify that committed pages match the content source, run:

```bash
node scripts/build.mjs --check
```

## Local preview

No third-party dependencies are required. Generate the pages, then start any static file server from the repository root, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The site is designed for GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to “Deploy from a branch,” then select the default branch and `/ (root)` directory.

The site content is based on the current source in [Yichao_Yuan_CV](https://github.com/yichao-yuan-99/Yichao_Yuan_CV). Shared records only need to be updated once in `content/site.json`.
