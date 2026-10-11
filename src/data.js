export const STORE = { name: 'Northfield', currency: '$', freeShippingAt: 75, shipping: 6 }
export const CATEGORIES = ['All', 'Bags', 'Apparel', 'Home']
export const money = (n) => `${STORE.currency}${n.toFixed(2)}`

const SIZES = ['S', 'M', 'L', 'XL']
const c = (name, hex) => ({ name, hex })

// kind = built-in illustration. For real photos, add `image: '/images/file.jpg'`.
export const PRODUCTS = [
  { id: 'canvas-tote', name: 'Canvas Tote', price: 28, cat: 'Bags', kind: 'tote', bg: '#e6eee9', colors: [c('Sand', '#d9c7a3'), c('Charcoal', '#3a3d42'), c('Olive', '#7b8456')],
    desc: 'A roomy everyday tote in heavy 12 oz cotton canvas, with reinforced handles that carry real weight.',
    details: ['12 oz cotton canvas', 'Inner pocket for keys and cards', 'Holds up to 10 kg'] },
  { id: 'daily-backpack', name: 'Daily Backpack', price: 64, cat: 'Bags', kind: 'backpack', bg: '#e8ecf4', colors: [c('Slate', '#4a5568'), c('Black', '#1f2328'), c('Forest', '#2f5d50')],
    desc: 'A clean 20 L pack with a padded laptop sleeve and a quick-access front pocket.',
    details: ['Fits a 15 inch laptop', 'Water-resistant fabric', 'Padded shoulder straps'] },
  { id: 'stoneware-mug', name: 'Stoneware Mug', price: 16, cat: 'Home', kind: 'mug', bg: '#f3ebe2', colors: [c('Chalk', '#f4f1ea'), c('Sage', '#9db39c'), c('Ink', '#2f3a4a')],
    desc: 'A hand-glazed 12 oz mug with a comfortable handle. Every piece has slight variations.',
    details: ['12 oz capacity', 'Dishwasher and microwave safe', 'Food-safe glaze'] },
  { id: 'steel-bottle', name: 'Steel Bottle', price: 32, cat: 'Home', kind: 'bottle', bg: '#e4eef2', colors: [c('Sky', '#7fb2d0'), c('Matte Black', '#2a2d31'), c('Coral', '#e8826b')],
    desc: 'Double-wall insulated steel that keeps drinks cold for 24 hours or hot for 12.',
    details: ['20 oz, BPA free', 'Leak-proof lid', 'Fits most cup holders'] },
  { id: 'classic-cap', name: 'Classic Cap', price: 24, cat: 'Apparel', kind: 'cap', bg: '#f2e9e6', colors: [c('Navy', '#27375a'), c('Stone', '#bfb5a3'), c('Brick', '#a64b3c')],
    desc: 'A soft, unstructured six-panel cap in washed cotton twill with an adjustable strap.',
    details: ['Washed cotton twill', 'Adjustable metal buckle', 'One size fits most'] },
  { id: 'heavyweight-tee', name: 'Heavyweight Tee', price: 29, cat: 'Apparel', kind: 'tee', bg: '#ececf4', sizes: SIZES, colors: [c('White', '#f5f5f2'), c('Black', '#25272b'), c('Moss', '#6f7d5c')],
    desc: 'A boxy 220 gsm tee that holds its shape wash after wash. Pre-shrunk and garment dyed.',
    details: ['220 gsm combed cotton', 'Relaxed, boxy fit', 'Machine washable'] },
  { id: 'pullover-hoodie', name: 'Pullover Hoodie', price: 58, cat: 'Apparel', kind: 'hoodie', bg: '#ede9f3', sizes: SIZES, colors: [c('Heather', '#a7a9ad'), c('Midnight', '#2b3350'), c('Rust', '#b4603c')],
    desc: 'A midweight brushed-fleece hoodie with a lined hood and a deep kangaroo pocket.',
    details: ['400 gsm brushed fleece', 'Lined, adjustable hood', 'Relaxed fit'] },
  { id: 'daily-notebook', name: 'Daily Notebook', price: 12, cat: 'Home', kind: 'notebook', bg: '#f1eee0', colors: [c('Mustard', '#d9a441'), c('Teal', '#2f7f7a'), c('Graphite', '#454a52')],
    desc: 'A lay-flat A5 notebook with 120 pages of thick, ink-friendly dotted paper.',
    details: ['A5, 120 pages', '100 gsm dotted paper', 'Elastic closure'] },
]
