// Single source of truth for site copy. Items marked [TO CONFIRM] need Jules's input.

export const SITE_URL = 'https://juleschasles.com'

const utm = 'utm_source=juleschasles.com&utm_medium=website'

export const links = {
  linkedin: 'https://www.linkedin.com/in/jules-chasles/',
  email: 'jules@wusoolcapital.com',
  wusool: 'https://www.wusoolcapital.com',
  dealReadiness: `https://www.wusoolcapital.com/deal-readiness-tool?${utm}&utm_campaign=deal_readiness`,
  valuation: `https://www.wusoolcapital.com/valuation-tool?${utm}&utm_campaign=valuation`,
  contact: 'mailto:jules@wusoolcapital.com',
  speaking: 'mailto:jules@wusoolcapital.com?subject=Speaking%20request',
}

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
  { title: 'How to Sell Your Startup', blurb: 'What buyers check first, how a sale process runs, and the reasonable decisions that cost founders value.', where: '[TO CONFIRM: organizer and year]' },
  { title: 'How to Value Your Business', blurb: 'How buyers build a price, what they discount, and how to prepare the numbers before they ask.', where: '[TO CONFIRM: organizer and year]' },
  { title: 'Oraseya Sandbox: Prepare for a Raise and an M&A Process', blurb: 'The overlap between fundraising readiness and exit readiness, for founders who want options.', where: '[TO CONFIRM: organizer and year]' },
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
  { href: '/speaking', label: 'Speaking' },
  { href: '/blog', label: 'Thoughts' },
  { href: '/scorecard', label: 'Scorecard' },
]
