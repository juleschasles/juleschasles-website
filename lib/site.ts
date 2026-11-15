// Single source of truth for site copy. Items marked [TO CONFIRM] need Jules's input.

// Vercel redirects the apex domain to www, so www is the canonical host.
export const SITE_URL = 'https://www.juleschasles.com'

const utm = 'utm_source=juleschasles.com&utm_medium=website'

export const links = {
  linkedin: 'https://www.linkedin.com/in/jules-chasles/',
  email: 'jules@wusoolcapital.com',
  wusool: 'https://www.wusoolcapital.com',
  dealReadiness: `https://www.wusoolcapital.com/deal-readiness-tool?${utm}&utm_campaign=deal_readiness`,
  valuation: `https://www.wusoolcapital.com/valuation-tool?${utm}&utm_campaign=valuation`,
  benchmark: `https://www.wusoolcapital.com/benchmark?${utm}&utm_campaign=benchmark`,
  contact: 'mailto:jules@wusoolcapital.com',
  speaking: 'mailto:jules@wusoolcapital.com?subject=Speaking%20request',
}

// The six core CTAs, grouped into two rows everywhere they appear: contact
// first, lead magnets (the Wusool Capital tools) below. kind decides how
// each one is rendered: 'external' -> new tab, 'mail' -> mailto (same tab),
// 'link' -> internal route.
type Action = { label: string; href: string; kind: 'external' | 'mail' | 'link'; icon: string }

export const contactActions: Action[] = [
  { label: 'LinkedIn', href: links.linkedin, kind: 'external', icon: '↗' },
  { label: 'Email', href: `mailto:${links.email}`, kind: 'mail', icon: '@' },
  { label: 'Speaker', href: '/speaking', kind: 'link', icon: '↗' },
]

export const leadMagnetActions: Action[] = [
  { label: 'Deal readiness', href: links.dealReadiness, kind: 'external', icon: '↗' },
  { label: 'Valuation tool', href: links.valuation, kind: 'external', icon: '↗' },
  { label: 'Benchmark', href: links.benchmark, kind: 'external', icon: '↗' },
]

export const actions: Action[] = [...contactActions, ...leadMagnetActions]

export const person = {
  name: 'Jules Chasles',
  role: 'Co-founder and COO, Wusool Capital',
  short: 'Sell-side M&A advisor for GCC founders selling $1M-$20M businesses.',
  headline: 'The exit advisor who sees your company the way buyers do.',
  sub: 'I have been the buyer. I tell you what they will see before they see it.',
  location: 'Dubai, UAE',
}

export const proof = [
  { value: '50+', label: 'deals and transactions' },
  { value: '1,000+', label: 'companies screened' },
  { value: '$20M-$1B', label: 'AUM, Seed to PE funds' },
  { value: '70', label: 'portfolio companies, value creation' },
  { value: '20+', label: 'workshops and panels' },
]

export const whatIDo = {
  intro:
    'I co-founded Wusool Capital to run full sell-side processes for founders in the UAE and GCC. We work on businesses valued between $1M and $20M.',
  steps: [
    { title: 'Prepare', body: 'We review your company the way a buyer will. Numbers, customers, founder dependence. We fix what we can before anyone looks.' },
    { title: 'Position', body: 'We build the valuation case and the materials. The story has to survive diligence.' },
    { title: 'Run the process', body: 'We reach several qualified buyers at once. With one buyer, the buyer sets the price. With several, they compete for it.' },
    { title: 'Close', body: 'We negotiate terms and manage diligence through to signing.' },
  ],
  fees: 'Fee model: retainer plus success fee. Most of our reward comes when the deal closes.',
}

export const bio = [
  'Before Wusool Capital, I spent years on the buyer side. I screened 1,000+ companies across the GCC and Africa, including time at Global Ventures advising portfolio founders on M&A and fundraising.',
  'I have worked across Seed to Private Equity funds from $20M to $1B in AUM, and led value creation for a 70-company Series A portfolio.',
  'I studied at HEC Paris (MBA), Bocconi University (MSc) and Warwick Business School (BSc). I live in Dubai.',
]

export const organizers = ['Hub71', 'in5', 'Plug and Play', 'NYU Abu Dhabi', 'Khalifa University', 'IFZA', 'Finanshels', 'CrossVal']

export const talks = [
  { title: 'How to Sell Your Startup', blurb: 'What buyers check first, how a sale process runs, and the reasonable decisions that cost founders value.' },
  { title: 'How to Value Your Business', blurb: 'How buyers build a price, what they discount, and how to prepare the numbers before they ask.' },
  { title: 'Oraseya Sandbox: Prepare for a Raise and an M&A Process', blurb: 'The overlap between fundraising readiness and exit readiness, for founders who want options.' },
]

export const topics = [
  'Selling a $1M-$20M business in the GCC',
  'What a buyer sees in the first 10 minutes',
  'Valuation and how buyers discount',
  'Exit readiness and preparation',
  'Running a competitive sale process',
  'Fundraising and M&A for startups',
]

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Thoughts' },
]
