# The Catalog — furniture showcase

A one-time-use catalog viewer: a table-of-contents grid of pieces, each
opening into a full-screen image viewer you swipe (or arrow-key) through.

## Adding your real photos

1. Drop your image files into `public/images/`.
2. Open `data/products.ts` and update each product's `title`, `description`,
   and `image` (and optional `images`) to match your actual filenames.
3. Add, remove, or reorder entries in that same array — the order there is
   the order of the catalog grid and the order swipe left/right follows.

No database, no admin UI — this file is the entire content model.

## Running locally

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

Push to GitHub as usual; Vercel will build and deploy automatically. No
environment variables or data stores are required for this project.
