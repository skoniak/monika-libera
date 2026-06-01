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
    <footer style={{ borderTop: '1px solid var(--border)', color: 'var(--text)', opacity: 0.5 }}>
      <div className="content-container flex flex-wrap items-center justify-between gap-2 py-5 font-sans text-xs">
        <span>© 2025 Monika Libera</span>
        {version && (
          <span>
            build #{version.build} · {version.date}
          </span>
        )}
      </div>
    </footer>
  )
}
