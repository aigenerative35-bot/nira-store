export const BASE = '/nira-store/'
export const asset = (p) => `${BASE}${p}`

export const money = (n) => '₹' + Number(n).toLocaleString('en-IN')

export const FREE_SHIP = 1499
export const SHIP_FEE = 79
export const PROMO_CODE = 'NIRA10'

/* coupon engine — type: percent | flat | shipping */
export const COUPONS = {
  NIRA10:     { type: 'percent', value: 10, max: 500,  min: 1999, label: '10% off, up to ₹500' },
  WELCOME200: { type: 'flat',    value: 200,           min: 1499, label: '₹200 off your first order' },
  HANDLOOM15: { type: 'percent', value: 15, max: 1200, min: 3999, label: '15% off handloom' },
  ATELIER500: { type: 'flat',    value: 500,           min: 4999, label: '₹500 off bags & heels' },
  FREESHIP:   { type: 'shipping', value: 0,            min: 0,    label: 'Free delivery' },
  RITUAL20:   { type: 'percent', value: 20, max: 900,  min: 2999, label: '20% off the three-step ritual' }
}

export const categories = [
  { id: 'skincare', name: 'Skincare', img: asset('img/serum.webp'), note: 'Serums & creams' },
  { id: 'makeup', name: 'Makeup', img: asset('img/lip-apply.webp'), note: 'Lips & brushes' },
  { id: 'body', name: 'Body', img: asset('img/jar-silk.webp'), note: 'Butters & oils' },
  { id: 'bags', name: 'Bags', img: asset('img/bag-brown.webp'), note: 'Totes & slings' },
  { id: 'suits', name: 'Suits', img: asset('img/saree-jewel.webp'), note: 'Handloom' },
  { id: 'heels', name: 'Heels', img: asset('img/heels-pink.webp'), note: 'Blocks & stilettos' }
]

const SUPPLIERS = [
  'Nira Atelier Pvt Ltd',
  'Nira Labs (Skincare)',
  'Bhagalpur Handloom Co-op',
  'Nira Leather Works'
]

export const products = [
  {
    id: 'p1', name: 'Vitamin C Serum', cat: 'skincare', catName: 'Skincare',
    price: 1299, mrp: 1699, stock: 3, rating: 4.8, reviews: 1264, tag: 'Bestseller',
    img: asset('img/serum.webp'), img2: asset('img/flatlay.webp'),
    sizes: ['15ml', '30ml', '50ml'], shades: [], short: '10% THD ascorbate · 30ml',
    desc: 'A stable, non-oxidising vitamin C at 10%, paired with niacinamide and hyaluronic acid. Brightens over four to six weeks without the sting of L-ascorbic acid.',
    use: 'Three drops on clean, damp skin each morning. Follow with moisturiser and SPF. Do not layer with retinol in the same routine.',
    ingredients: 'Aqua, tetrahexyldecyl ascorbate, niacinamide, glycerin, sodium hyaluronate, panthenol, tocopherol, squalane, phenoxyethanol.'
  },
  {
    id: 'p2', name: 'Shea & Kokum Body Butter', cat: 'body', catName: 'Body',
    price: 899, mrp: 1099, stock: 7, rating: 4.7, reviews: 842, tag: 'New',
    img: asset('img/jar-silk.webp'), img2: asset('img/jar-flowers.webp'),
    sizes: ['100g', '200g'], shades: [], short: 'Shea & kokum · 200g',
    desc: 'Whipped shea and kokum with a touch of rice bran oil. Absorbs in under a minute, so you can dress straight after.',
    use: 'Massage into damp skin after a shower. Two pumps for each limb.',
    ingredients: 'Butyrospermum parkii butter, Garcinia indica seed butter, Oryza sativa bran oil, glycerin, tocopherol.'
  },
  {
    id: 'p3', name: 'Matte Lipstick — Rosewood', cat: 'makeup', catName: 'Makeup',
    price: 749, mrp: 899, stock: 18, rating: 4.6, reviews: 2110, tag: 'Bestseller',
    img: asset('img/lip-red.webp'), img2: asset('img/lips.webp'),
    sizes: [], shades: [
      { name: 'Rosewood', hex: '#9c4a46' }, { name: 'Brick', hex: '#b9766e' },
      { name: 'Oxblood', hex: '#7a3b3a' }, { name: 'Nude', hex: '#d8a79b' }
    ], short: '8 shades · transfer-proof',
    desc: 'A weightless matte that holds through chai, lunch and a full workday. Pigment load is high, so one pass is enough.',
    use: 'Line the lips first, then fill. Blot once with tissue for a true matte.',
    ingredients: 'Dimethicone, kaolin, isododecane, tocopheryl acetate, iron oxides.'
  },
  {
    id: 'p4', name: 'Structured Tote — Tan', cat: 'bags', catName: 'Bags',
    price: 4499, mrp: 5499, stock: 42, rating: 4.9, reviews: 318, tag: '18% off',
    img: asset('img/bag-brown.webp'), img2: asset('img/bag-white.webp'),
    sizes: [], shades: [{ name: 'Tan', hex: '#b58c63' }, { name: 'Black', hex: '#1e1a18' }],
    short: 'Fits a 14" laptop',
    desc: 'Full-grain vegan leather with hand-finished edges and a suede-lined interior. Holds shape even when empty.',
    use: 'Wipe with a dry cloth. Condition twice a year with a leather balm.',
    ingredients: 'Vegan full-grain leather, cotton canvas lining, brushed brass hardware.'
  },
  {
    id: 'p5', name: 'Cotton Co-ord Set — Sage', cat: 'suits', catName: 'Suits',
    price: 2899, mrp: 3499, stock: 0, rating: 4.5, reviews: 196, tag: 'Small batch',
    img: asset('img/saree-back.webp'), img2: asset('img/saree-jewel.webp'),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    shades: [{ name: 'Sage', hex: '#9aa684' }, { name: 'Sand', hex: '#d9cbb4' }, { name: 'Ink', hex: '#3e3a34' }],
    short: 'Handloom cotton · XS–XXL',
    desc: 'Two pieces, one silhouette. Handloom cotton woven in Bhagalpur, cut straight with a soft shoulder.',
    use: 'Cold machine wash, inside out. Line dry in shade. Expect a half-inch shrink on first wash.',
    ingredients: '100% handloom cotton. Natural dyes.'
  },
  {
    id: 'p6', name: 'Block Heels — Nude', cat: 'heels', catName: 'Heels',
    price: 3199, mrp: 3799, stock: 3, rating: 4.4, reviews: 507, tag: 'New',
    img: asset('img/heels-pink.webp'), img2: asset('img/heels-out.webp'),
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9'], shades: [],
    short: '3 inch · cushioned footbed',
    desc: 'A three-inch block that behaves like a flat. Memory-foam footbed, wide toe box, no break-in period.',
    use: 'Wipe with a damp cloth. Store with the heel inserts provided.',
    ingredients: 'Vegan leather upper, rubber sole, memory-foam insole.'
  },
  {
    id: 'p7', name: 'Rice Water Face Mist', cat: 'skincare', catName: 'Skincare',
    price: 649, mrp: 799, stock: 7, rating: 4.7, reviews: 933, tag: 'New',
    img: asset('img/jar-black.webp'), img2: asset('img/serum.webp'),
    sizes: ['50ml', '100ml'], shades: [], short: 'Fermented rice · 100ml',
    desc: 'Fermented rice water with panthenol in a fine mist. For the middle of the day, over makeup, in traffic.',
    use: 'Mist from 20cm, eyes closed. Follow with moisturiser if skin is dry.',
    ingredients: 'Fermented Oryza sativa extract, panthenol, glycerin, sodium PCA, phenoxyethanol.'
  },
  {
    id: 'p8', name: 'Mini Sling — Cognac', cat: 'bags', catName: 'Bags',
    price: 2199, mrp: 2699, stock: 18, rating: 4.6, reviews: 142, tag: '',
    img: asset('img/bag-white.webp'), img2: asset('img/bag-blue.webp'),
    sizes: [], shades: [{ name: 'Cognac', hex: '#8c4a2f' }, { name: 'Cream', hex: '#e8dcc8' }],
    short: 'Adjustable strap',
    desc: 'Day-to-evening sling that fits a phone, card case, compact and keys. Nothing more, on purpose.',
    use: 'Wipe with a dry cloth. Avoid prolonged sun exposure.',
    ingredients: 'Vegan leather, cotton lining, brass hardware.'
  },
  {
    id: 'p9', name: 'Silk Saree — Emerald', cat: 'suits', catName: 'Suits',
    price: 8499, mrp: 10999, stock: 42, rating: 4.8, reviews: 87, tag: 'Limited',
    img: asset('img/saree-jewel.webp'), img2: asset('img/saree-street.webp'),
    sizes: ['Free size'], shades: [{ name: 'Emerald', hex: '#2f5d4b' }, { name: 'Maroon', hex: '#6e1b2a' }],
    short: 'Chanderi silk · 5.5m',
    desc: 'Handwoven chanderi with a gold zari border. Comes with an unstitched blouse piece.',
    use: 'Dry clean only. Store folded in muslin, refold every six months.',
    ingredients: 'Chanderi silk, zari border.'
  },
  {
    id: 'p10', name: 'Makeup Brush Set — 8 piece', cat: 'makeup', catName: 'Makeup',
    price: 1899, mrp: 2399, stock: 42, rating: 4.6, reviews: 421, tag: '',
    img: asset('img/brushes.webp'), img2: asset('img/lip-apply.webp'),
    sizes: [], shades: [], short: '8 brushes · travel case',
    desc: 'Eight synthetic brushes that do not shed. Base, blush, contour, blend, eyes and liner, plus a travel roll.',
    use: 'Wash weekly with mild soap. Dry flat, bristles over the edge.',
    ingredients: 'Synthetic taklon bristles, aluminium ferrules, birch handles.'
  },
  {
    id: 'p11', name: 'Night Cream — Ceramide', cat: 'skincare', catName: 'Skincare',
    price: 1599, mrp: 1899, stock: 0, rating: 4.7, reviews: 655, tag: 'Bestseller',
    img: asset('img/jar-flowers.webp'), img2: asset('img/jar-silk.webp'),
    sizes: ['50ml'], shades: [], short: 'Ceramides + squalane · 50ml',
    desc: 'A ceramide-rich cream that repairs the barrier overnight. Thick enough to feel like something, light enough for humid nights.',
    use: 'Last step at night. A pea-sized amount for the whole face.',
    ingredients: 'Aqua, glycerin, ceramide NP, squalane, niacinamide, dimethicone, phenoxyethanol.'
  },
  {
    id: 'p12', name: 'Stiletto Heels — Black', cat: 'heels', catName: 'Heels',
    price: 3799, mrp: 4599, stock: 3, rating: 4.3, reviews: 233, tag: '',
    img: asset('img/heels.webp'), img2: asset('img/heels-pink.webp'),
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'], shades: [],
    short: '4 inch · pointed toe',
    desc: 'The one you keep for weddings. A four-inch stiletto with a padded insole and a slightly wider toe.',
    use: 'Break in with thick socks at home for two evenings.',
    ingredients: 'Vegan leather upper, leather-lined insole, rubber sole.'
  },
  {
    id: 'p13', name: 'Clutch — Midnight', cat: 'bags', catName: 'Bags',
    price: 2599, mrp: 3199, stock: 7, rating: 4.5, reviews: 64, tag: '',
    img: asset('img/bag-blue.webp'), img2: asset('img/bag-brown.webp'),
    sizes: [], shades: [{ name: 'Midnight', hex: '#1b2a4a' }, { name: 'Tan', hex: '#b58c63' }],
    short: 'Detachable chain',
    desc: 'A structured clutch with a detachable chain, so it works on the shoulder or in the hand.',
    use: 'Store in the dust bag provided.',
    ingredients: 'Vegan leather, satin lining, brass chain.'
  },
  {
    id: 'p14', name: 'Lip Balm Duo', cat: 'makeup', catName: 'Makeup',
    price: 599, mrp: 749, stock: 18, rating: 4.8, reviews: 1487, tag: 'Bestseller',
    img: asset('img/lips.webp'), img2: asset('img/lip-red.webp'),
    sizes: [], shades: [{ name: 'Clear', hex: '#e9d6c8' }, { name: 'Tinted', hex: '#c1787a' }],
    short: 'Two balms · 4g each',
    desc: 'One clear for night, one tinted for day. Shea and candelilla wax, no petrolatum.',
    use: 'Reapply as needed. The tinted one doubles as a blush in a pinch.',
    ingredients: 'Butyrospermum parkii butter, candelilla wax, caprylic/capric triglyceride, tocopherol.'
  },
  {
    id: 'p15', name: 'Body Oil — Vetiver', cat: 'body', catName: 'Body',
    price: 1099, mrp: 1299, stock: 42, rating: 4.6, reviews: 289, tag: '',
    img: asset('img/flatlay.webp'), img2: asset('img/jar-silk.webp'),
    sizes: ['100ml'], shades: [], short: 'Vetiver & sesame · 100ml',
    desc: 'A dry body oil that sinks in fast. Vetiver and a little sesame, warm without being sweet.',
    use: 'Three pumps onto damp skin, straight out of the shower.',
    ingredients: 'Sesamum indicum oil, caprylic/capric triglyceride, Vetiveria zizanoides oil, tocopherol.'
  },
  {
    id: 'p16', name: 'Handloom Saree — Indigo', cat: 'suits', catName: 'Suits',
    price: 6499, mrp: 7999, stock: 0, rating: 4.7, reviews: 112, tag: '',
    img: asset('img/saree-street.webp'), img2: asset('img/saree-back.webp'),
    sizes: ['Free size'], shades: [{ name: 'Indigo', hex: '#2c3a57' }, { name: 'Sage', hex: '#8a9478' }],
    short: 'Handloom cotton · 5.5m',
    desc: 'Everyday handloom in natural indigo. Soft from the first wear, softer after ten.',
    use: 'Cold hand wash separately for the first three washes.',
    ingredients: '100% handloom cotton, natural indigo dye.'
  }
]

export const journal = [
  { title: 'Vitamin C, decoded: why THD beats L-ascorbic in Indian humidity', cat: 'Skincare · 6 min', img: asset('img/flatlay.webp'), text: 'Oxidation is why your serum turned orange. Here is what to look for instead.' },
  { title: 'How to spot a bag that will actually last five years', cat: 'Atelier · 4 min', img: asset('img/bag-brown.webp'), text: 'Stitch density, edge finishing, and the hardware test you can do in-store.' },
  { title: 'Handloom cotton: why the first wash changes everything', cat: 'Style · 5 min', img: asset('img/saree-street.webp'), text: 'Care instructions that keep small-batch pieces from shrinking out of shape.' }
]

export const reviews = [
  { name: 'Ananya R.', city: 'Bengaluru', rating: 5, text: 'Six weeks in and my pigmentation around the mouth has visibly faded. It does not pill under sunscreen, which was my problem with every other vitamin C I tried.' },
  { name: 'Meher K.', city: 'Hyderabad', rating: 5, text: 'Ordered the tote on Tuesday, delivered Thursday. The stitching and hardware feel like a ₹12,000 bag. Used daily for four months, no scuffs.' },
  { name: 'Divya S.', city: 'Chennai', rating: 4, text: 'Co-ord set fits true to size and the cotton is genuinely breathable in Chennai heat. Only gripe, the sage shade sold out in M within a day.' }
]

export const getProduct = (id) => products.find((p) => p.id === id)


/* --- marketplace layer: MOQ, price range, supplier --- */
products.forEach((p, i) => {
  p.moq = p.cat === 'skincare' || p.cat === 'makeup' ? 2 : p.cat === 'suits' ? 1 : 3
  p.priceMax = Math.round(p.price * 1.14)
  p.supplier = p.cat === 'suits' ? SUPPLIERS[2] : p.cat === 'bags' || p.cat === 'heels' ? SUPPLIERS[3] : p.cat === 'skincare' || p.cat === 'body' ? SUPPLIERS[1] : SUPPLIERS[0]
  p.verified = i % 4 !== 3
  p.years = 3 + (i % 6)
  p.lead = 3 + (i % 5)
})
