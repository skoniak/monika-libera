'use client'

import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme, type Theme } from '@/context/ThemeContext'

const NAV = {
  pl: [
    { href: '/bio', label: 'Bio' },
    { href: '/achievements', label: 'Osiągnięcia' },
    { href: '/contact', label: 'Kontakt' },
  ],
  en: [
    { href: '/bio', label: 'Bio' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/contact', label: 'Contact' },
  ],
}

const DURATION = 750 // ms — must match CSS transition

export default function Header() {
  const { lang, toggle: toggleLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [rotating, setRotating] = useState(false)
  const isAnimating = useRef(false)

  // icon angle: encodes current mode + in-progress transition
  // positive+idle→0°  positive+rotating→180°
  // negative+idle→180° negative+rotating→0°
  const iconDeg = theme === 'negative' ? (rotating ? 0 : 180) : (rotating ? 180 : 0)

  const triggerRipple = useCallback(
    (e: React.MouseEvent) => {
      if (isAnimating.current) return
      isAnimating.current = true
      setRotating(true)

      const next: Theme = theme === 'positive' ? 'negative' : 'positive'
      const nextBg = next === 'negative' ? '#000000' : '#ffffff'
      const x = e.clientX
      const y = e.clientY

      const veil = document.createElement('div')
      veil.style.cssText = [
        'position:fixed',
        'inset:0',
        `background:${nextBg}`,
        `clip-path:circle(0px at ${x}px ${y}px)`,
        `transition:clip-path ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        'z-index:9998',
        'pointer-events:none',
        'will-change:clip-path',
      ].join(';')

      document.body.appendChild(veil)

      // Double rAF ensures transition fires after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          veil.style.clipPath = `circle(200vmax at ${x}px ${y}px)`
        })
      })

      veil.addEventListener(
        'transitionend',
        () => {
          setTheme(next)
          setRotating(false)
          veil.remove()
          isAnimating.current = false
        },
        { once: true },
      )
    },
    [theme, setTheme],
  )

  const links = NAV[lang]

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMenuOpen(false)}
      className="font-sans text-xs uppercase tracking-widest transition-opacity duration-200 opacity-55 hover:opacity-100"
      style={{ color: 'var(--text)' }}
    >
      {label}
    </Link>
  )

  const langBtn = (
    <button
      onClick={toggleLang}
      className="font-sans text-xs uppercase tracking-widest transition-opacity duration-200 opacity-55 hover:opacity-100"
      style={{ color: 'var(--text)' }}
    >
      {lang === 'pl' ? 'EN' : 'PL'}
    </button>
  )

  const themeBtn = (
    <button
      onClick={triggerRipple}
      aria-label={theme === 'positive' ? 'Przełącz na negatyw' : 'Przełącz na pozytyw'}
      className="leading-none transition-opacity duration-200 opacity-70 hover:opacity-100"
      style={{ color: 'var(--text)', fontSize: '1.25rem' }}
    >
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          transform: `rotate(${iconDeg}deg)`,
          transition: `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        ◐
      </span>
    </button>
  )

  return (
    <>
      <header
        className="w-full px-6 md:px-10 py-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)', color: 'var(--text)' }}
      >
        {/* ── Name ──────────────────────────────────────────── */}
        <Link
          href="/"
          className="font-serif uppercase tracking-[0.18em] shrink-0 transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'var(--text)', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        >
          Monika Libera
        </Link>

        {/* ── Desktop: nav + controls ────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => navLink(href, label))}
          <span className="opacity-20" style={{ borderLeft: '1px solid var(--text)', height: '0.9rem' }} />
          {langBtn}
          {themeBtn}
        </nav>

        {/* ── Mobile: hamburger ──────────────────────────────── */}
        <button
          className="md:hidden text-lg leading-none p-1 opacity-70 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text)' }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* ── Mobile overlay menu ───────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-9"
          style={{ background: 'var(--bg)', color: 'var(--text)' }}
        >
          <button
            className="absolute top-5 right-6 text-lg opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text)' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Zamknij menu"
          >
            ✕
          </button>

          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--text)' }}
            >
              {label}
            </Link>
          ))}

          <div
            className="flex items-center gap-6 mt-4"
            style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}
          >
            {langBtn}
            {themeBtn}
          </div>
        </div>
      )}
    </>
  )
}
