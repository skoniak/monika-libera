'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

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

export default function Header() {
  const { lang, toggle: toggleLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () =>
    setTheme(theme === 'positive' ? 'negative' : 'positive')

  const links = NAV[lang]

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMenuOpen(false)}
      className="font-sans text-xs uppercase tracking-widest transition-opacity duration-200 opacity-50 hover:opacity-100"
      style={{ color: 'var(--text)' }}
    >
      {label}
    </Link>
  )

  const langBtn = (
    <button
      onClick={toggleLang}
      className="font-sans text-xs uppercase tracking-widest transition-opacity duration-200 opacity-50 hover:opacity-100"
      style={{ color: 'var(--text)' }}
    >
      {lang === 'pl' ? 'EN' : 'PL'}
    </button>
  )

  const themeBtn = (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'positive' ? 'Przełącz na negatyw' : 'Przełącz na pozytyw'}
    >
      {theme === 'positive' ? 'Negatyw' : 'Pozytyw'}
    </button>
  )

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>
        <div className="content-container flex items-center justify-between py-5">
          {/* ── Name ──────────────────────────────────────── */}
          <Link
            href="/"
            className="font-serif uppercase tracking-[0.18em] shrink-0 transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--text)', fontSize: 'clamp(0.95rem, 2vw, 1.3rem)' }}
          >
            Monika Libera
          </Link>

          {/* ── Desktop nav + controls ────────────────────── */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(({ href, label }) => navLink(href, label))}
            <span
              className="opacity-20"
              style={{ borderLeft: '1px solid var(--text)', height: '0.85rem' }}
            />
            {langBtn}
            {themeBtn}
          </nav>

          {/* ── Mobile hamburger ──────────────────────────── */}
          <button
            className="md:hidden text-base leading-none p-1 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text)' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay menu ───────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-9"
          style={{ background: 'var(--bg)', color: 'var(--text)' }}
        >
          <button
            className="absolute top-5 right-6 text-base opacity-50 hover:opacity-100 transition-opacity"
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
              className="font-sans text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--text)' }}
            >
              {label}
            </Link>
          ))}

          <div
            className="flex items-center gap-7 pt-6"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {langBtn}
            {themeBtn}
          </div>
        </div>
      )}
    </>
  )
}
