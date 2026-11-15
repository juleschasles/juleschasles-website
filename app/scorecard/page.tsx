import type { Metadata } from 'next'
import { Page, Button } from '@/components/chrome'
import { links } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Exit Readiness Scorecard',
  description: 'Score your company the way a buyer would. Coming soon.',
  robots: { index: false },
}

export default function Scorecard() {
  return (
    <Page>
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Coming soon</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">Exit Readiness Scorecard</h1>
      <p className="mt-5 max-w-xl text-muted">Score your company the way a buyer would. [TO CONFIRM: scope, questions and launch date.]</p>
      <div className="mt-10 rounded-2xl border border-dashed border-line p-8 sm:p-12">
        <p className="text-muted">Until then, the Deal Readiness Assessment on Wusool Capital covers the same ground.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button href={links.dealReadiness} primary>Check your deal readiness ↗</Button>
          <Button href={links.valuation}>What is your business worth? ↗</Button>
        </div>
      </div>
    </Page>
  )
}
