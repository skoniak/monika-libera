'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useLanguage } from '@/context/LanguageContext'

type Props = {
  titlePl: string
  titleEn: string | null
  contentPl: PortableTextBlock[] | null
  contentEn: PortableTextBlock[] | null
}

const ptComponents = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p
        className="font-sans font-light text-base leading-[1.9] mb-5"
        style={{ color: 'var(--text)' }}
      >
        {children}
      </p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        className="font-serif text-2xl mt-10 mb-3 tracking-wide"
        style={{ color: 'var(--text)' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        className="font-serif text-xl mt-7 mb-2 tracking-wide"
        style={{ color: 'var(--text)' }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote
        className="font-serif text-lg italic my-6 pl-4 opacity-65"
        style={{ borderLeft: '2px solid var(--text)', color: 'var(--text)' }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
    link: ({
      value,
      children,
    }: {
      value?: { href: string }
      children: React.ReactNode
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text)' }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-5 space-y-1 font-sans font-light" style={{ color: 'var(--text)' }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-5 space-y-1 font-sans font-light" style={{ color: 'var(--text)' }}>
        {children}
      </ol>
    ),
  },
}

export default function RichTextContent({ titlePl, titleEn, contentPl, contentEn }: Props) {
  const { lang } = useLanguage()

  const title = lang === 'en' && titleEn ? titleEn : titlePl
  const content = (lang === 'en' && contentEn ? contentEn : contentPl) ?? []

  return (
    <article>
      <h1
        className="font-serif text-3xl md:text-4xl tracking-wide mb-10"
        style={{ color: 'var(--text)' }}
      >
        {title}
      </h1>

      {content.length > 0 ? (
        <PortableText value={content} components={ptComponents} />
      ) : (
        <p className="font-sans text-sm opacity-35" style={{ color: 'var(--text)' }}>
          Treść pojawi się po dodaniu jej w panelu{' '}
          <a href="/studio" className="underline underline-offset-4">
            /studio
          </a>
          .
        </p>
      )}
    </article>
  )
}
