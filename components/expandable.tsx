'use client'

// A card that grows from its grid position to fill the viewport, then shrinks back on close.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(.65,0,.35,1)'
const MS = 420

type Rect = { top: number; left: number; width: number; height: number }
const toRect = (r: DOMRect): Rect => ({ top: r.top, left: r.left, width: r.width, height: r.height })

const Ctx = createContext<() => void>(() => {})
export const useOpen = () => useContext(Ctx)

export function Expandable({ title, className = '', children, detail }: {
  title: string; className?: string; children: React.ReactNode; detail: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [from, setFrom] = useState<Rect | null>(null)
  const [full, setFull] = useState(false)
  const [content, setContent] = useState(false)
  const closing = useRef(false)

  const open = useCallback(() => {
    if (!ref.current || from) return
    setFrom(toRect(ref.current.getBoundingClientRect()))
    history.pushState({ card: title }, '')
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => requestAnimationFrame(() => setFull(true)))
    setTimeout(() => setContent(true), MS * 0.6)
  }, [from, title])

  const finishClose = useCallback(() => {
    if (closing.current) return
    closing.current = true
    if (ref.current) setFrom(toRect(ref.current.getBoundingClientRect()))
    setContent(false)
    setFull(false)
    setTimeout(() => { setFrom(null); closing.current = false; document.body.style.overflow = '' }, MS)
  }, [])

  // Close via the X or Esc goes through history so the back button stays in sync.
  const close = useCallback(() => history.back(), [])

  // Restore page scroll if we navigate away (e.g. open a post) while expanded.
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  useEffect(() => {
    if (!from) return
    const onPop = () => finishClose()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    addEventListener('popstate', onPop)
    addEventListener('keydown', onKey)
    return () => { removeEventListener('popstate', onPop); removeEventListener('keydown', onKey) }
  }, [from, finishClose, close])

  const style: React.CSSProperties | undefined = !from ? undefined : {
    position: 'fixed', zIndex: 50,
    top: full ? 0 : from.top, left: full ? 0 : from.left,
    width: full ? '100vw' : from.width, height: full ? '100dvh' : from.height,
    borderRadius: full ? 0 : 22,
    transition: `top ${MS}ms ${EASE}, left ${MS}ms ${EASE}, width ${MS}ms ${EASE}, height ${MS}ms ${EASE}, border-radius ${MS}ms ${EASE}`,
  }

  return (
    <Ctx.Provider value={open}>
      <div ref={ref} className={`${className} ${from ? 'invisible' : ''}`}>{children}</div>
      {from && (
        <>
          <div aria-hidden className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm transition-opacity" style={{ opacity: full ? 1 : 0, transitionDuration: `${MS}ms` }} />
          <div role="dialog" aria-modal="true" aria-label={title} style={style} className="neu overflow-hidden">
            <button onClick={close} aria-label="Close" className="neu-btn absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center sm:right-6 sm:top-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <div className="h-full overflow-y-auto transition-opacity duration-300" style={{ opacity: content ? 1 : 0 }}>
              <div className="mx-auto max-w-3xl px-5 pb-16 pt-20 sm:px-8 sm:pt-24">{detail}</div>
            </div>
          </div>
        </>
      )}
    </Ctx.Provider>
  )
}

export function ExpandButton({ label }: { label: string }) {
  const open = useOpen()
  return (
    <button onClick={open} aria-label={`Expand ${label}`} className="neu-btn flex h-9 w-9 shrink-0 items-center justify-center text-muted hover:text-fg">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
    </button>
  )
}
