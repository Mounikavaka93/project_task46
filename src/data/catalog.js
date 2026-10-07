export const FREE_SHIPPING_AT = 75
export const SHIPPING_FEE = 9

export const promos = {
  LUNA10: 0.1,
  LUNA15: 0.15,
  BLOOM10: 0.1,
  ATELIER15: 0.15,
}

export const sizes = [
  { id: 'petite', label: 'Petite', detail: 'A smaller gathering', multiplier: 0.72 },
  { id: 'classic', label: 'Classic', detail: 'Our signature size', multiplier: 1 },
  { id: 'grand', label: 'Grand', detail: 'A fuller arrangement', multiplier: 1.48 },
]

export const occasions = ['Anniversary', 'Wedding', 'Birthday', 'Sympathy', 'Just Because']

export const categories = [
  { id: 'roses', name: 'Roses', image: '/flowers/p-midnight.jpg', blurb: 'The original love letter' },
  { id: 'lilies', name: 'Lilies', image: '/flowers/p-moon.jpg', blurb: 'Sculptural and fragrant' },
  { id: 'tulips', name: 'Tulips', image: '/flowers/p-stargazer.jpg', blurb: 'Spring, painted' },
  { id: 'sunflowers', name: 'Sunflowers', image: '/flowers/p-golden.jpg', blurb: 'Warmth, unhurried' },
  { id: 'bouquets', name: 'Bouquets', image: '/flowers/cat-bouquets.jpg', blurb: 'Mixed for the season' },
  { id: 'seasonal', name: 'Seasonal', image: '/flowers/hero.jpg', blurb: 'What the week is growing' },
  { id: 'plants', name: 'Plants', image: '/flowers/p-olive.jpg', blurb: 'Something that stays' },
]

const notes = [
  { name: 'Mira K.', text: 'Arrived exactly as photographed, with the stems still tight.', stars: 5 },
  { name: 'Owen L.', text: 'The wrap and the note card made it feel considered, not rushed.', stars: 5 },
  { name: 'Helen P.', text: 'I have sent this three times. It has never missed.', stars: 5 },
  { name: 'Jonah A.', text: 'Same-day, and it still looked composed the next morning.', stars: 4 },
  { name: 'Elena V.', text: 'The color was softer in person, which is what I wanted.', stars: 5 },
  { name: 'Priya S.', text: 'A generous bunch. The foliage was as fresh as the blooms.', stars: 5 },
]

export const products = [
  {
    id: 'blush-stem',
    name: 'Blush Stem',
    category: 'Roses',
    categoryId: 'roses',
    price: 46,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 186,
    badge: 'Bestseller',
    image: '/flowers/p-crimson.jpg',
    gallery: ['/flowers/p-crimson.jpg', '/flowers/p-orchid.jpg'],
    description: 'A single garden rose, cut long and set so the bloom can open slowly on a desk or bedside.',
    story: 'We look for a tight center and a soft outer petal, then condition the stem overnight before it leaves the studio.',
    stems: '1 long stem in the classic size',
    vaseLife: '5–7 days',
    occasions: ['Just Because', 'Anniversary'],
    featured: true,
  },
  {
    id: 'crimson-dew',
    name: 'Crimson Dew',
    category: 'Roses',
    categoryId: 'roses',
    price: 58,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 142,
    badge: null,
    image: '/flowers/p-blush.jpg',
    gallery: ['/flowers/p-blush.jpg', '/flowers/p-scarlet.jpg'],
    description: 'A saturated red rose with a velvet face. Tied simply, it is the arrangement people send when words feel thin.',
    story: 'Harvested while the outer petals are still cupped, so the color stays deep rather than fading at the edge.',
    stems: 'A gathered handful of red roses',
    vaseLife: '6–8 days',
    occasions: ['Anniversary', 'Just Because'],
    featured: false,
  },
  {
    id: 'velvet-bed',
    name: 'Velvet Bed',
    category: 'Roses',
    categoryId: 'roses',
    price: 74,
    originalPrice: 89,
    rating: 4.9,
    reviewCount: 203,
    badge: 'Sale',
    image: '/flowers/p-midnight.jpg',
    gallery: ['/flowers/p-midnight.jpg', '/flowers/p-blush.jpg'],
    description: 'A low, generous cloud of red roses and dark foliage. Meant for a dining table, not a corner vase.',
    story: 'We mix fully open blooms with a few tighter buds so the piece changes a little each day.',
    stems: 'A full table gathering',
    vaseLife: '5–7 days',
    occasions: ['Anniversary', 'Wedding'],
    featured: true,
  },
  {
    id: 'scarlet-study',
    name: 'Scarlet Study',
    category: 'Roses',
    categoryId: 'roses',
    price: 64,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 61,
    badge: 'New',
    image: '/flowers/p-scarlet.jpg',
    gallery: ['/flowers/p-scarlet.jpg', '/flowers/p-midnight.jpg'],
    description: 'One perfect red rose, photographed the way it arrives: dark leaves, a long neck, and no extra filler.',
    story: 'A studio favorite for anniversaries. The wrap is charcoal paper and a cotton tie.',
    stems: 'A focused red rose bunch',
    vaseLife: '6–8 days',
    occasions: ['Anniversary'],
    featured: false,
  },
  {
    id: 'garden-roses',
    name: 'Garden Roses',
    category: 'Roses',
    categoryId: 'roses',
    price: 68,
    originalPrice: 80,
    rating: 4.8,
    reviewCount: 154,
    badge: null,
    image: '/flowers/p-orchid.jpg',
    gallery: ['/flowers/p-orchid.jpg', '/flowers/p-crimson.jpg'],
    description: 'Ruffled pink garden roses with a loose, old-fashioned shape. Soft enough for a wedding morning.',
    story: 'These are the cabbage-headed roses we wait for. They bruise easily, so they travel in their own box.',
    stems: 'Pink garden roses and eucalyptus',
    vaseLife: '4–6 days',
    occasions: ['Wedding', 'Birthday'],
    featured: true,
  },
  {
    id: 'ribbon-jar',
    name: 'The Ribbon Jar',
    category: 'Bouquets',
    categoryId: 'bouquets',
    price: 96,
    originalPrice: null,
    rating: 5,
    reviewCount: 88,
    badge: 'Bestseller',
    image: '/flowers/cat-bouquets.jpg',
    gallery: ['/flowers/cat-bouquets.jpg', '/flowers/p-peony.jpg'],
    description: 'Peach roses, blush peonies, and eucalyptus in a glass jar, finished with a silk ribbon you can keep.',
    story: 'Designed to land on a kitchen table and look finished without a second vase. The ribbon is tied in the studio.',
    stems: 'Mixed seasonal stems in glass',
    vaseLife: '5–7 days',
    occasions: ['Wedding', 'Anniversary'],
    featured: true,
  },
  {
    id: 'apricot-garden',
    name: 'Apricot Garden',
    category: 'Bouquets',
    categoryId: 'bouquets',
    price: 88,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 121,
    badge: null,
    image: '/flowers/p-peony.jpg',
    gallery: ['/flowers/p-peony.jpg', '/flowers/cat-bouquets.jpg'],
    description: 'Apricot and blush roses with fine filler, arranged in a clear glass so the stems stay part of the picture.',
    story: 'A warm palette for late spring. We keep the shape rounded and a little wild at the edges.',
    stems: 'Roses, spray blooms, and filler',
    vaseLife: '5–7 days',
    occasions: ['Wedding', 'Anniversary'],
    featured: true,
  },
  {
    id: 'meadow-letter',
    name: 'Meadow Letter',
    category: 'Bouquets',
    categoryId: 'bouquets',
    price: 78,
    originalPrice: 94,
    rating: 4.8,
    reviewCount: 240,
    badge: 'Sale',
    image: '/flowers/editorial.jpg',
    gallery: ['/flowers/editorial.jpg', '/flowers/p-ivory.jpg'],
    description: 'A hand-tied mix of garden roses, berries, and herbs. It reads as a letter from the field, not a formula.',
    story: 'The recipe changes with the market. What stays is the balance of something soft, something dark, and something green.',
    stems: 'Seasonal mixed bouquet',
    vaseLife: '4–6 days',
    occasions: ['Birthday', 'Just Because'],
    featured: true,
  },
  {
    id: 'paper-twine',
    name: 'Paper & Twine',
    category: 'Bouquets',
    categoryId: 'bouquets',
    price: 54,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 97,
    badge: null,
    image: '/flowers/p-ivory.jpg',
    gallery: ['/flowers/p-ivory.jpg', '/flowers/editorial.jpg'],
    description: 'A wrapped bunch with a sunflower, white blooms, and olive foliage. Kraft paper, cotton twine, a small card.',
    story: 'Our everyday gift. It is easy to carry and already finished, so it can go straight into someone’s hands.',
    stems: 'Sunflower, whites, and greenery',
    vaseLife: '5–7 days',
    occasions: ['Birthday', 'Just Because'],
    featured: false,
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    category: 'Sunflowers',
    categoryId: 'sunflowers',
    price: 48,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 176,
    badge: null,
    image: '/flowers/p-golden.jpg',
    gallery: ['/flowers/p-golden.jpg', '/flowers/p-sunfield.jpg'],
    description: 'A tall sunflower with a wide face and healthy leaves. Cheerful without being loud.',
    story: 'Cut in the morning and kept out of direct heat so the petals do not wilt on the way.',
    stems: 'Sunflowers, sized up in Grand',
    vaseLife: '6–9 days',
    occasions: ['Birthday', 'Just Because'],
    featured: true,
  },
  {
    id: 'sunfield',
    name: 'Sunfield Bunch',
    category: 'Sunflowers',
    categoryId: 'sunflowers',
    price: 62,
    originalPrice: 72,
    rating: 4.6,
    reviewCount: 84,
    badge: 'Sale',
    image: '/flowers/p-sunfield.jpg',
    gallery: ['/flowers/p-sunfield.jpg', '/flowers/p-golden.jpg'],
    description: 'A packed bunch of sunflowers, heads touching, the way they grow. Good in a wide crock.',
    story: 'We leave the green collars on. They hold the face up and look honest in a kitchen.',
    stems: 'A bunch of sunflowers',
    vaseLife: '6–8 days',
    occasions: ['Just Because', 'Birthday'],
    featured: false,
  },
  {
    id: 'stargazer',
    name: 'Stargazer Evening',
    category: 'Lilies',
    categoryId: 'lilies',
    price: 66,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 133,
    badge: null,
    image: '/flowers/p-moon.jpg',
    gallery: ['/flowers/p-moon.jpg'],
    description: 'Pink stargazer lilies with speckled throats, plus a bud that will open on the second day.',
    story: 'We remove the pollen so it does not stain a tablecloth. The scent is present, not overwhelming, once the bloom opens.',
    stems: 'Lilies and a few buds',
    vaseLife: '7–10 days',
    occasions: ['Anniversary', 'Birthday'],
    featured: true,
  },
  {
    id: 'painted-tulips',
    name: 'Painted Tulips',
    category: 'Tulips',
    categoryId: 'tulips',
    price: 52,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 211,
    badge: 'Bestseller',
    image: '/flowers/p-stargazer.jpg',
    gallery: ['/flowers/p-stargazer.jpg'],
    description: 'White tulips flamed with crimson. They keep growing in the vase and lean toward the light.',
    story: 'Tulips drink a surprising amount. The bunch is cut tall so you can recut them at home.',
    stems: 'Flamed tulips',
    vaseLife: '5–7 days',
    occasions: ['Just Because', 'Birthday'],
    featured: true,
  },
  {
    id: 'dahlia-disc',
    name: 'Dahlia Disc',
    category: 'Seasonal',
    categoryId: 'seasonal',
    price: 58,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 44,
    badge: 'New',
    image: '/flowers/p-dahlia.jpg',
    gallery: ['/flowers/p-dahlia.jpg'],
    description: 'A single dinner-plate dahlia, petals packed in a perfect disc. A short-season luxury.',
    story: 'Available while the local dahlias are at their tightest. Each one is slightly different, which is the point.',
    stems: 'Statement dahlia stems',
    vaseLife: '4–5 days',
    occasions: ['Just Because', 'Anniversary'],
    featured: false,
  },
  {
    id: 'white-cosmos',
    name: 'White Cosmos',
    category: 'Seasonal',
    categoryId: 'seasonal',
    price: 42,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 73,
    badge: null,
    image: '/flowers/p-cosmos.jpg',
    gallery: ['/flowers/p-cosmos.jpg', '/flowers/p-daisies.jpg'],
    description: 'Airy white cosmos on fine stems. Quiet enough for sympathy, light enough for a Tuesday.',
    story: 'We keep the branching stems long so the flowers float rather than sit in a tight dome.',
    stems: 'Cosmos and a little greenery',
    vaseLife: '4–6 days',
    occasions: ['Sympathy', 'Just Because'],
    featured: false,
  },
  {
    id: 'daisy-meadow',
    name: 'Daisy Meadow',
    category: 'Seasonal',
    categoryId: 'seasonal',
    price: 40,
    originalPrice: 48,
    rating: 4.6,
    reviewCount: 119,
    badge: 'Sale',
    image: '/flowers/p-daisies.jpg',
    gallery: ['/flowers/p-daisies.jpg', '/flowers/p-cosmos.jpg'],
    description: 'A dense pickup of white daisies with yellow eyes. Simple, sunny, and easy to live with.',
    story: 'A market bunch, cleaned and recut. It looks best in a low pitcher.',
    stems: 'Field daisies',
    vaseLife: '5–7 days',
    occasions: ['Birthday', 'Sympathy'],
    featured: false,
  },
  {
    id: 'blossom-bough',
    name: 'Blossom Bough',
    category: 'Seasonal',
    categoryId: 'seasonal',
    price: 70,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 56,
    badge: 'New',
    image: '/flowers/p-wild.jpg',
    gallery: ['/flowers/p-wild.jpg', '/flowers/p-wedding.jpg'],
    description: 'Flowering branches in pale pink, for the short weeks they exist. Architectural, and gone quickly.',
    story: 'Branches are cut to fit a tall vase. A few indoor days is the whole season, and that is how we sell them.',
    stems: 'Flowering branches',
    vaseLife: '4–6 days',
    occasions: ['Wedding', 'Just Because'],
    featured: true,
  },
  {
    id: 'terracotta',
    name: 'Terracotta Column',
    category: 'Plants',
    categoryId: 'plants',
    price: 36,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 90,
    badge: null,
    image: '/flowers/p-olive.jpg',
    gallery: ['/flowers/p-olive.jpg'],
    description: 'A blue-green column cactus in a classic terracotta pot. The piece that stays after the bouquet is gone.',
    story: 'Potted in a fast-draining mix. It wants bright light and very little attention.',
    stems: 'One potted plant',
    vaseLife: 'A long-term plant',
    occasions: ['Just Because', 'Birthday'],
    featured: false,
    stockNote: 'Only 4 left in the studio',
  },
]

products.forEach((product, index) => {
  product.notes = [notes[index % notes.length], notes[(index + 3) % notes.length]]
})

export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getSize(sizeId) {
  return sizes.find((size) => size.id === sizeId) ?? sizes[1]
}

export function unitPrice(product, sizeId = 'classic') {
  return Math.round(product.price * getSize(sizeId).multiplier)
}

export function discountPercent(product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0
  return Math.round((1 - product.price / product.originalPrice) * 100)
}

export function getProduct(id) {
  return products.find((product) => product.id === id)
}

export function resolveCart(cart) {
  return cart
    .map((item) => {
      const product = getProduct(item.productId)
      if (!product) return null
      const unit = unitPrice(product, item.size)
      return { ...item, product, unit, line: unit * item.qty }
    })
    .filter(Boolean)
}

export function getTotals(lines, promoCode) {
  const subtotal = lines.reduce((sum, line) => sum + line.line, 0)
  const rate = promos[promoCode] ?? 0
  const discount = Math.round(subtotal * rate)
  const afterDiscount = subtotal - discount
  const shipping = subtotal === 0 || afterDiscount >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE
  const total = Math.max(0, afterDiscount + shipping)
  return { subtotal, discount, shipping, total }
}

export function categoryCount(categoryId) {
  return products.filter((product) => product.categoryId === categoryId).length
}
