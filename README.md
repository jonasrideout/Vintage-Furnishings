# The Catalog — furniture showcase

A one-time-use catalog viewer: a table-of-contents grid of pieces, each
opening into a full-screen image viewer you swipe (or arrow-key) through.

## Adding your real photos

Use the Catalog Builder tool (a separate browser-based tool, not part of
this app) to prep your pieces: drag photos in, set a primary image, order
the rest, name and describe each one. When you're done, it exports a zip
containing correctly-named photos plus a ready-made `data/products.json`.

Drag the contents of that zip into this repo on GitHub:
- the photo files go into `public/images/`
- `products.json` replaces `data/products.json`

That's the entire content model — no database, no server-side admin panel
(this project doesn't run anywhere that could write files for you, so
content prep happens in the standalone tool instead).

## Running locally (optional, only if you ever do)

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

Push to GitHub as usual; Vercel will build and deploy automatically. No
environment variables or data stores are required for this project.
