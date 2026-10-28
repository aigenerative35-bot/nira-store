/* NIRA — catalogue data (single source of truth for every page) */

const NIRA = {
  brand: "NIRA",
  tagline: "beauty & atelier",
  freeShip: 1499,
  shipFee: 79,

  categories: [
    { id: "skincare", name: "Skincare", img: "assets/img/serum.jpg" },
    { id: "makeup",   name: "Makeup",   img: "assets/img/lip-apply.jpg" },
    { id: "body",     name: "Body",     img: "assets/img/jar-silk.jpg" },
    { id: "bags",     name: "Bags",     img: "assets/img/bag-brown.jpg" },
    { id: "suits",    name: "Suits",    img: "assets/img/saree-jewel.jpg" },
    { id: "heels",    name: "Heels",    img: "assets/img/heels-pink.jpg" }
  ],

  products: [
    {
      id: "p1", name: "Vitamin C Serum", cat: "skincare", catName: "Skincare",
      price: 1299, mrp: 1699, rating: 4.8, reviews: 1264, tag: "Bestseller",
      img: "assets/img/serum.jpg", img2: "assets/img/flatlay.jpg",
      sizes: ["15ml", "30ml", "50ml"], shades: [],
      short: "10% THD ascorbate · 30ml",
      desc: "A stable, non-oxidising vitamin C at 10%, paired with niacinamide and hyaluronic acid. Brightens over four to six weeks without the sting of L-ascorbic acid.",
      ingredients: "Aqua, tetrahexyldecyl ascorbate, niacinamide, glycerin, sodium hyaluronate, panthenol, tocopherol, squalane, phenoxyethanol.",
      use: "Three drops on clean, damp skin each morning. Follow with moisturiser and SPF. Do not layer with retinol in the same routine."
    },
    {
      id: "p2", name: "Shea & Kokum Body Butter", cat: "body", catName: "Body",
      price: 899, mrp: 1099, rating: 4.7, reviews: 842, tag: "New",
      img: "assets/img/jar-silk.jpg", img2: "assets/img/jar-flowers.jpg",
      sizes: ["100g", "200g"], shades: [],
      short: "Shea & kokum · 200g",
      desc: "Whipped shea and kokum with a touch of rice bran oil. Absorbs in under a minute, so you can dress straight after.",
      ingredients: "Butyrospermum parkii butter, Garcinia indica seed butter, Oryza sativa bran oil, glycerin, tocopherol.",
      use: "Massage into damp skin after a shower. Two pumps for each limb."
    },
    {
      id: "p3", name: "Matte Lipstick — Rosewood", cat: "makeup", catName: "Makeup",
      price: 749, mrp: 899, rating: 4.6, reviews: 2110, tag: "Bestseller",
      img: "assets/img/lip-red.jpg", img2: "assets/img/lips.jpg",
      sizes: [], shades: [
        { name: "Rosewood", hex: "#9C4A46" }, { name: "Brick", hex: "#B9766E" },
        { name: "Oxblood", hex: "#7A3B3A" }, { name: "Nude", hex: "#D8A79B" }
      ],
      short: "8 shades · transfer-proof",
      desc: "A weightless matte that holds through chai, lunch and a full workday. Pigment load is high, so one pass is enough.",
      ingredients: "Dimethicone, kaolin, isododecane, tocopheryl acetate, iron oxides.",
      use: "Line the lips first, then fill. Blot once with tissue for a true matte."
    },
    {
      id: "p4", name: "Structured Tote — Tan", cat: "bags", catName: "Bags",
      price: 4499, mrp: 5499, rating: 4.9, reviews: 318, tag: "18% off",
      img: "assets/img/bag-brown.jpg", img2: "assets/img/bag-white.jpg",
      sizes: [], shades: [{ name: "Tan", hex: "#B58C63" }, { name: "Black", hex: "#1E1A18" }],
      short: "Fits a 14\" laptop",
      desc: "Full-grain vegan leather with hand-finished edges and a suede-lined interior. Holds shape even when empty.",
      ingredients: "Vegan full-grain leather, cotton canvas lining, brushed brass hardware.",
      use: "Wipe with a dry cloth. Condition twice a year with a leather balm."
    },
    {
      id: "p5", name: "Cotton Co-ord Set — Sage", cat: "suits", catName: "Suits",
      price: 2899, mrp: 3499, rating: 4.5, reviews: 196, tag: "Small batch",
      img: "assets/img/saree-back.jpg", img2: "assets/img/saree-jewel.jpg",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      shades: [{ name: "Sage", hex: "#9AA684" }, { name: "Sand", hex: "#D9CBB4" }, { name: "Ink", hex: "#3E3A34" }],
      short: "Handloom cotton · XS–XXL",
      desc: "Two pieces, one silhouette. Handloom cotton woven in Bhagalpur, cut straight with a soft shoulder.",
      ingredients: "100% handloom cotton. Natural dyes.",
      use: "Cold machine wash, inside out. Line dry in shade. Expect a half-inch shrink on first wash."
    },
    {
      id: "p6", name: "Block Heels — Nude", cat: "heels", catName: "Heels",
      price: 3199, mrp: 3799, rating: 4.4, reviews: 507, tag: "New",
      img: "assets/img/heels-pink.jpg", img2: "assets/img/heels-out.jpg",
      sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9"], shades: [],
      short: "3 inch · cushioned footbed",
      desc: "A three-inch block that behaves like a flat. Memory-foam footbed, wide toe box, no break-in period.",
      ingredients: "Vegan leather upper, rubber sole, memory-foam insole.",
      use: "Wipe with a damp cloth. Store with the heel inserts provided."
    },
    {
      id: "p7", name: "Rice Water Face Mist", cat: "skincare", catName: "Skincare",
      price: 649, mrp: 799, rating: 4.7, reviews: 933, tag: "New",
      img: "assets/img/jar-black.jpg", img2: "assets/img/serum.jpg",
      sizes: ["50ml", "100ml"], shades: [],
      short: "Fermented rice · 100ml",
      desc: "Fermented rice water with panthenol in a fine mist. For the middle of the day, over makeup, in traffic.",
      ingredients: "Fermented Oryza sativa extract, panthenol, glycerin, sodium PCA, phenoxyethanol.",
      use: "Mist from 20cm, eyes closed. Follow with moisturiser if skin is dry."
    },
    {
      id: "p8", name: "Mini Sling — Cognac", cat: "bags", catName: "Bags",
      price: 2199, mrp: 2699, rating: 4.6, reviews: 142, tag: "",
      img: "assets/img/bag-white.jpg", img2: "assets/img/bag-blue.jpg",
      sizes: [], shades: [{ name: "Cognac", hex: "#8C4A2F" }, { name: "Cream", hex: "#E8DCC8" }],
      short: "Adjustable strap",
      desc: "Day-to-evening sling that fits a phone, card case, compact and keys. Nothing more, on purpose.",
      ingredients: "Vegan leather, cotton lining, brass hardware.",
      use: "Wipe with a dry cloth. Avoid prolonged sun exposure."
    },
    {
      id: "p9", name: "Silk Saree — Emerald", cat: "suits", catName: "Suits",
      price: 8499, mrp: 10999, rating: 4.8, reviews: 87, tag: "Limited",
      img: "assets/img/saree-jewel.jpg", img2: "assets/img/saree-street.jpg",
      sizes: ["Free size"], shades: [{ name: "Emerald", hex: "#2F5D4B" }, { name: "Maroon", hex: "#6E1B2A" }],
      short: "Chanderi silk · 5.5m",
      desc: "Handwoven chanderi with a gold zari border. Comes with an unstitched blouse piece.",
      ingredients: "Chanderi silk, zari border.",
      use: "Dry clean only. Store folded in muslin, refold every six months."
    },
    {
      id: "p10", name: "Makeup Brush Set — 8 piece", cat: "makeup", catName: "Makeup",
      price: 1899, mrp: 2399, rating: 4.6, reviews: 421, tag: "",
      img: "assets/img/brushes.jpg", img2: "assets/img/lip-apply.jpg",
      sizes: [], shades: [],
      short: "8 brushes · travel case",
      desc: "Eight synthetic brushes that do not shed. Base, blush, contour, blend, eyes and liner, plus a travel roll.",
      ingredients: "Synthetic taklon bristles, aluminium ferrules, birch handles.",
      use: "Wash weekly with mild soap. Dry flat, bristles over the edge."
    },
    {
      id: "p11", name: "Night Cream — Ceramide", cat: "skincare", catName: "Skincare",
      price: 1599, mrp: 1899, rating: 4.7, reviews: 655, tag: "Bestseller",
      img: "assets/img/jar-flowers.jpg", img2: "assets/img/jar-silk.jpg",
      sizes: ["50ml"], shades: [],
      short: "Ceramides + squalane · 50ml",
      desc: "A ceramide-rich cream that repairs the barrier overnight. Thick enough to feel like something, light enough for humid nights.",
      ingredients: "Aqua, glycerin, ceramide NP, squalane, niacinamide, dimethicone, phenoxyethanol.",
      use: "Last step at night. A pea-sized amount for the whole face."
    },
    {
      id: "p12", name: "Stiletto Heels — Black", cat: "heels", catName: "Heels",
      price: 3799, mrp: 4599, rating: 4.3, reviews: 233, tag: "",
      img: "assets/img/heels.jpg", img2: "assets/img/heels-pink.jpg",
      sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"], shades: [],
      short: "4 inch · pointed toe",
      desc: "The one you keep for weddings. A four-inch stiletto with a padded insole and a slightly wider toe.",
      ingredients: "Vegan leather upper, leather-lined insole, rubber sole.",
      use: "Break in with thick socks at home for two evenings."
    },
    {
      id: "p13", name: "Clutch — Midnight", cat: "bags", catName: "Bags",
      price: 2599, mrp: 3199, rating: 4.5, reviews: 64, tag: "",
      img: "assets/img/bag-blue.jpg", img2: "assets/img/bag-brown.jpg",
      sizes: [], shades: [{ name: "Midnight", hex: "#1B2A4A" }, { name: "Tan", hex: "#B58C63" }],
      short: "Detachable chain",
      desc: "A structured clutch with a detachable chain, so it works on the shoulder or in the hand.",
      ingredients: "Vegan leather, satin lining, brass chain.",
      use: "Store in the dust bag provided."
    },
    {
      id: "p14", name: "Lip Balm Duo", cat: "makeup", catName: "Makeup",
      price: 599, mrp: 749, rating: 4.8, reviews: 1487, tag: "Bestseller",
      img: "assets/img/lips.jpg", img2: "assets/img/lip-red.jpg",
      sizes: [], shades: [{ name: "Clear", hex: "#E9D6C8" }, { name: "Tinted", hex: "#C1787A" }],
      short: "Two balms · 4g each",
      desc: "One clear for night, one tinted for day. Shea and candelilla wax, no petrolatum.",
      ingredients: "Butyrospermum parkii butter, candelilla wax, caprylic/capric triglyceride, tocopherol.",
      use: "Reapply as needed. The tinted one doubles as a blush in a pinch."
    },
    {
      id: "p15", name: "Body Oil — Vetiver", cat: "body", catName: "Body",
      price: 1099, mrp: 1299, rating: 4.6, reviews: 289, tag: "",
      img: "assets/img/flatlay.jpg", img2: "assets/img/jar-silk.jpg",
      sizes: ["100ml"], shades: [],
      short: "Vetiver & sesame · 100ml",
      desc: "A dry body oil that sinks in fast. Vetiver and a little sesame, warm without being sweet.",
      ingredients: "Sesamum indicum oil, caprylic/capric triglyceride, Vetiveria zizanoides oil, tocopherol.",
      use: "Three pumps onto damp skin, straight out of the shower."
    },
    {
      id: "p16", name: "Handloom Saree — Indigo", cat: "suits", catName: "Suits",
      price: 6499, mrp: 7999, rating: 4.7, reviews: 112, tag: "",
      img: "assets/img/saree-street.jpg", img2: "assets/img/saree-back.jpg",
      sizes: ["Free size"], shades: [{ name: "Indigo", hex: "#2C3A57" }, { name: "Sage", hex: "#8A9478" }],
      short: "Handloom cotton · 5.5m",
      desc: "Everyday handloom in natural indigo. Soft from the first wear, softer after ten.",
      ingredients: "100% handloom cotton, natural indigo dye.",
      use: "Cold hand wash separately for the first three washes."
    }
  ],

  journal: [
    { title: "Vitamin C, decoded: why THD beats L-ascorbic in Indian humidity",
      cat: "Skincare · 6 min", img: "assets/img/flatlay.jpg",
      text: "Oxidation is why your serum turned orange. Here is what to look for instead." },
    { title: "How to spot a bag that will actually last five years",
      cat: "Atelier · 4 min", img: "assets/img/bag-brown.jpg",
      text: "Stitch density, edge finishing, and the hardware test you can do in-store." },
    { title: "Handloom cotton: why the first wash changes everything",
      cat: "Style · 5 min", img: "assets/img/saree-street.jpg",
      text: "Care instructions that keep small-batch pieces from shrinking out of shape." }
  ],

  reviews: [
    { name: "Ananya R.", city: "Bengaluru", rating: 5,
      text: "Six weeks in and my pigmentation around the mouth has visibly faded. It does not pill under sunscreen, which was my problem with every other vitamin C I tried." },
    { name: "Meher K.", city: "Hyderabad", rating: 5,
      text: "Ordered the tote on Tuesday, delivered Thursday. The stitching and hardware feel like a ₹12,000 bag. Used daily for four months, no scuffs." },
    { name: "Divya S.", city: "Chennai", rating: 4,
      text: "Co-ord set fits true to size and the cotton is genuinely breathable in Chennai heat. Only gripe, the sage shade sold out in M within a day." }
  ]
};
