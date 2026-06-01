'use client'

import { createContext, useContext, useState } from 'react'

type Language = 'pl' | 'en'

const LanguageContext = createContext<{
  lang: Language
  toggle: () => void
}>({ lang: 'pl', toggle: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('pl')
  const toggle = () => setLang((l) => (l === 'pl' ? 'en' : 'pl'))
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
