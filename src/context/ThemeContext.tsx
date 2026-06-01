'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'positive' | 'negative'

const ThemeContext = createContext<{
  theme: Theme
  toggle: () => void
}>({ theme: 'positive', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('positive')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'positive' ? 'negative' : 'positive'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
