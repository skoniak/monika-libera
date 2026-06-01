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
    <footer
      className="w-full px-6 py-6 flex flex-wrap items-center justify-between gap-2 font-sans text-xs"
      style={{ color: 'var(--text)', opacity: 0.5 }}
    >
      <span>© 2025 Monika Libera</span>
      {version && (
        <span>
          build #{version.build} · {version.date}
        </span>
      )}
    </footer>
  )
}
