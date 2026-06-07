'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { urlFor } from '@/sanity/image'
import type { Collection } from '@/sanity/queries'

export default function CollectionItem({ collection }: { collection: Collection }) {
  const { lang } = useLanguage()

  const title =
    lang === 'en' && collection.title_en ? collection.title_en : collection.title_pl

  const description =
    lang === 'en' && collection.description_en
      ? collection.description_en
      : collection.description_pl

  const imageUrl = collection.coverImage
    ? urlFor(collection.coverImage).width(800).quality(75).auto('format').url()
    : null

  return (
    <Link href={`/${collection.slug}`} className="block group">
      <article className="collection-item">
        {/* Square image frame */}
        <div className="relative overflow-hidden aspect-square">
          <div className="collection-item__img-wrap">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full" style={{ background: 'var(--border)' }} />
            )}
          </div>

          {/* Hover overlay */}
          <div className="collection-item__overlay">
            <h3
              className="collection-item__overlay-title font-serif text-sm md:text-base text-center leading-snug"
              style={{ color: 'var(--text)' }}
            >
              {title}
            </h3>

            {description && (
              <p
                className="collection-item__overlay-desc font-sans text-xs leading-relaxed text-center"
                style={{ color: 'var(--text)', maxWidth: '22ch' }}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Title below image — always visible */}
        <p
          className="font-serif text-xs md:text-sm text-center tracking-wide pt-3 pb-1"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </p>
      </article>
    </Link>
  )
}
