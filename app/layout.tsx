import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_URL, person, links } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const description =
  'Jules Chasles is Co-founder and COO of Wusool Capital, a sell-side M&A advisor in Dubai for GCC founders selling $1M-$20M businesses. 50+ deals and transactions, 1,000+ companies screened.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Jules Chasles | Sell-side M&A advisor for GCC founders', template: '%s | Jules Chasles' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: 'Jules Chasles',
    title: 'Jules Chasles | The exit advisor who sees your company the way buyers do',
    description,
    images: [{ url: '/jules-og.jpg', width: 1200, height: 1200, alt: 'Jules Chasles' }],
  },
  twitter: { card: 'summary_large_image', title: 'Jules Chasles', description, images: ['/jules-og.jpg'] },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
}

const personId = `${SITE_URL}/#person`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: person.name,
      description,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: `${person.name} | Sell-side M&A advisor for GCC founders`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: person.name,
      url: SITE_URL,
      image: `${SITE_URL}/jules-og.jpg`,
      jobTitle: 'Co-founder and COO',
      description,
      worksFor: { '@type': 'Organization', name: 'Wusool Capital', url: links.wusool },
      address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'HEC Paris' },
        { '@type': 'CollegeOrUniversity', name: 'Bocconi University' },
        { '@type': 'CollegeOrUniversity', name: 'Warwick Business School' },
      ],
      knowsAbout: ['Mergers and acquisitions', 'Sell-side advisory', 'Business valuation', 'Exit planning', 'Due diligence', 'GCC private markets'],
      sameAs: [links.linkedin, links.wusool],
    },
  ],
}

// Sets theme before paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
