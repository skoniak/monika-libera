'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

const NAV_LINKS = {
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
  const { theme, toggle: toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = NAV_LINKS[lang]

  return (
    <header className="w-full px-6 pt-10 pb-4 relative" style={{ color: 'var(--text)' }}>
      {/* Top row */}
      <div className="flex items-center justify-between md:justify-center relative">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-xl leading-none p-1"
          style={{ color: 'var(--text)' }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Site name */}
        <h1
          className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] uppercase"
          style={{ letterSpacing: '0.2em' }}
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Monika Libera
          </Link>
        </h1>

        {/* Controls — desktop: absolute right, mobile: hidden (shown in menu) */}
        <div
          className="hidden md:flex items-center gap-4 absolute right-0 top-1/2 -translate-y-1/2 font-sans text-xs uppercase tracking-widest"
          style={{ color: 'var(--text)' }}
        >
          <button onClick={toggleLang} className="opacity-70 hover:opacity-100 transition-opacity">
            {lang === 'pl' ? 'EN' : 'PL'}
          </button>
          <button
            onClick={toggleTheme}
            className="text-base opacity-70 hover:opacity-100 transition-opacity"
            aria-label={theme === 'positive' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'positive' ? 'Negatyw' : 'Pozytyw'}
          >
            ◐
          </button>
        </div>

        {/* Mobile: invisible spacer to keep title centered */}
        <div className="md:hidden w-8" />
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex justify-center gap-8 mt-4 font-sans text-xs uppercase tracking-widest">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text)', textDecoration: 'none' }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu (open state) */}
      {menuOpen && (
        <div className="md:hidden mt-6 flex flex-col items-center gap-5 pb-4 font-sans text-xs uppercase tracking-widest">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--text)', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-6 mt-2" style={{ color: 'var(--text)' }}>
            <button onClick={toggleLang}>{lang === 'pl' ? 'EN' : 'PL'}</button>
            <button onClick={toggleTheme} aria-label="Toggle theme">◐</button>
          </div>
        </div>
      )}
    </header>
  )
}
