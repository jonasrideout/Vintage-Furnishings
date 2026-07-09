// data/products.ts
//
// Edit this array to add, remove, or reorder items.
// - `slug` becomes the URL: /product/<slug>  (lowercase, hyphens, no spaces)
// - `image` is the primary photo, `images` are optional extra photos
// - Drop the actual photo files in /public/images/ using the same filenames
// - Order here = order in the catalog and the order swipe left/right follows

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
};

export const products: Product[] = [
  {
    slug: "cast-iron-cookware-set",
    title: "Vintage Cast Iron Cookware Set",
    description:
      "A well-seasoned set of vintage cast iron skillets and pans, ready for another lifetime of use.",
    image: "/images/cast-iron-cookware-set.jpg",
  },
  {
    slug: "le-creuset-dutch-oven",
    title: "Le Creuset Dutch Oven",
    description:
      "Classic enameled cast iron Dutch oven, the kind of piece that only gets better with age.",
    image: "/images/le-creuset-dutch-oven.jpg",
  },
  {
    slug: "woodard-chantilly-rose-patio-set",
    title: "Woodard Chantilly Rose Patio Set",
    description:
      "Wrought iron patio furniture in the Chantilly Rose pattern, a mid-century Woodard classic.",
    image: "/images/woodard-chantilly-rose-patio-set.jpg",
  },
  {
    slug: "westinghouse-ice-box-1936",
    title: "1936 Westinghouse Ice Box",
    description:
      "A beautifully preserved 1936 Westinghouse ice box, full of era-appropriate character.",
    image: "/images/westinghouse-ice-box-1936.jpg",
  },
  {
    slug: "lafer-carrie-recliner",
    title: "Lafer Carrie Recliner",
    description:
      "The iconic Lafer Carrie leather recliner, Brazilian design at its most comfortable.",
    image: "/images/lafer-carrie-recliner.jpg",
  },
  {
    slug: "victorian-side-table",
    title: "Victorian Side Table",
    description: "Ornately carved Victorian side table with a warm, original finish.",
    image: "/images/victorian-side-table.jpg",
  },
  {
    slug: "edwardian-writing-desk",
    title: "Edwardian Writing Desk",
    description: "A compact Edwardian writing desk with brass hardware and inlay detailing.",
    image: "/images/edwardian-writing-desk.jpg",
  },
  {
    slug: "victorian-armchair",
    title: "Victorian Armchair",
    description: "Upholstered Victorian armchair with carved wood frame and turned legs.",
    image: "/images/victorian-armchair.jpg",
  },
  {
    slug: "oak-dining-table",
    title: "Oak Dining Table",
    description: "Solid oak dining table, sized for gathering, with a well-worn patina.",
    image: "/images/oak-dining-table.jpg",
  },
  {
    slug: "wicker-porch-set",
    title: "Wicker Porch Set",
    description: "A pair of wicker porch chairs, ideal for slow mornings.",
    image: "/images/wicker-porch-set.jpg",
  },
  {
    slug: "brass-floor-lamp",
    title: "Brass Floor Lamp",
    description: "Vintage brass floor lamp with a fabric shade, fully functional.",
    image: "/images/brass-floor-lamp.jpg",
  },
  {
    slug: "cedar-chest",
    title: "Cedar Chest",
    description: "Classic cedar chest with original hardware and a lightly worn top.",
    image: "/images/cedar-chest.jpg",
  },
  {
    slug: "spindle-back-rocking-chair",
    title: "Spindle-Back Rocking Chair",
    description: "A hand-turned spindle-back rocking chair, worn in all the right places.",
    image: "/images/spindle-back-rocking-chair.jpg",
  },
  {
    slug: "pine-bookcase",
    title: "Pine Bookcase",
    description: "Simple pine bookcase with three adjustable shelves.",
    image: "/images/pine-bookcase.jpg",
  },
  {
    slug: "copper-fireplace-tools",
    title: "Copper Fireplace Tool Set",
    description: "A complete copper fireplace tool set with matching stand.",
    image: "/images/copper-fireplace-tools.jpg",
  },
];
