'use client'

import { useEffect, useState } from 'react'

type VersionInfo = {
  build: number
  date: string
}

export default function Footer() {
  const [version, setVersion] = useState<VersionInfo | null>(null)

  useEffect(() => {
    fetch('/version.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setVersion(data))
      .catch(() => {})
  }, [])

  return (
    <footer style={{ borderTop: '1px solid var(--border)', color: 'var(--text)' }}>
      <div className="content-container flex items-baseline justify-between gap-2 py-5">
        <span className="font-sans text-xs" style={{ opacity: 0.5 }}>
          © 2025 Monika Libera
          {version && ` · build #${version.build} · ${version.date}`}
        </span>

        <a
          href="https://skoniak.com"
          target="_blank"
          rel="noopener"
          className="footer-credit"
          style={{ color: 'var(--text)' }}
        >
          <span style={{ filter: 'grayscale(1)' }}>🎨</span>skoniak.com
        </a>
      </div>
    </footer>
  )
}
