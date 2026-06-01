'use client'

import { useLanguage } from '@/context/LanguageContext'
import type { Contact } from '@/sanity/queries'

const LABELS = {
  pl: { title: 'Kontakt', email: 'Email', phone: 'Telefon', social: 'Social media' },
  en: { title: 'Contact', email: 'Email', phone: 'Phone', social: 'Social media' },
}

const EMPTY = {
  pl: 'Dane kontaktowe pojawią się po dodaniu ich w panelu',
  en: 'Contact details will appear after adding them in the panel',
}

type Props = {
  contact: Contact | null
}

export default function ContactContent({ contact }: Props) {
  const { lang } = useLanguage()
  const labels = LABELS[lang]

  const hasData = contact && (contact.email || contact.phone || contact.socialLinks?.length)

  if (!hasData) {
    return (
      <div>
        <h1
          className="font-serif text-3xl md:text-4xl tracking-wide mb-10"
          style={{ color: 'var(--text)' }}
        >
          {labels.title}
        </h1>
        <p className="font-sans text-sm opacity-35" style={{ color: 'var(--text)' }}>
          {EMPTY[lang]}{' '}
          <a href="/studio" className="underline underline-offset-4">
            /studio
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <article>
      <h1
        className="font-serif text-3xl md:text-4xl tracking-wide mb-12"
        style={{ color: 'var(--text)' }}
      >
        {labels.title}
      </h1>

      <dl className="space-y-6">
        {contact?.email && (
          <div>
            <dt
              className="font-sans text-xs uppercase tracking-widest mb-1 opacity-45"
              style={{ color: 'var(--text)' }}
            >
              {labels.email}
            </dt>
            <dd>
              <a
                href={`mailto:${contact.email}`}
                className="font-sans text-base underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {contact.email}
              </a>
            </dd>
          </div>
        )}

        {contact?.phone && (
          <div>
            <dt
              className="font-sans text-xs uppercase tracking-widest mb-1 opacity-45"
              style={{ color: 'var(--text)' }}
            >
              {labels.phone}
            </dt>
            <dd>
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="font-sans text-base opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {contact.phone}
              </a>
            </dd>
          </div>
        )}

        {contact?.socialLinks && contact.socialLinks.length > 0 && (
          <div>
            <dt
              className="font-sans text-xs uppercase tracking-widest mb-2 opacity-45"
              style={{ color: 'var(--text)' }}
            >
              {labels.social}
            </dt>
            <dd className="flex flex-col gap-2">
              {contact.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--text)' }}
                >
                  {link.platform}
                </a>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </article>
  )
}
