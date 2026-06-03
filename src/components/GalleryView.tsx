'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { urlFor } from '@/sanity/image'
import type { CollectionDetail, CollectionImage } from '@/sanity/queries'

export default function GalleryView({ collection }: { collection: CollectionDetail }) {
  const { lang } = useLanguage()
  const [lightbox, setLightbox] = useState<CollectionImage | null>(null)

  const title = lang === 'en' && collection.title_en ? collection.title_en : collection.title_pl
  const description =
    lang === 'en' && collection.description_en
      ? collection.description_en
      : collection.description_pl

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const images = collection.images ?? []

  return (
    <>
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <h1
          className="font-serif text-3xl md:text-5xl tracking-wide mb-4"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="font-sans font-light text-sm md:text-base leading-relaxed opacity-65 max-w-[60ch]"
            style={{ color: 'var(--text)' }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Images */}
      <div className="space-y-10 md:space-y-16 max-w-3xl">
        {images.length === 0 && (
          <p className="font-sans text-xs opacity-35" style={{ color: 'var(--text)' }}>
            Brak zdjęć w tej kolekcji.
          </p>
        )}

        {images.map((item) => {
          if (!item.image) return null

          const imgTitle = lang === 'en' && item.title_en ? item.title_en : item.title_pl
          const imgDesc =
            lang === 'en' && item.description_en ? item.description_en : item.description_pl
          const src = urlFor(item.image).width(1200).auto('format').url()
          const w = item.dimensions?.width ?? 1200
          const h = item.dimensions?.height ?? 900

          return (
            <figure key={item._key}>
              <button
                className="block w-full"
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightbox(item)}
                aria-label={imgTitle ?? 'Powiększ zdjęcie'}
              >
                <Image
                  src={src}
                  alt={imgTitle ?? ''}
                  width={w}
                  height={h}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </button>

              {(imgTitle || imgDesc) && (
                <figcaption className="mt-3 space-y-1">
                  {imgTitle && (
                    <p
                      className="font-serif text-sm tracking-wide"
                      style={{ color: 'var(--text)' }}
                    >
                      {imgTitle}
                    </p>
                  )}
                  {imgDesc && (
                    <p
                      className="font-sans font-light text-xs leading-relaxed opacity-60"
                      style={{ color: 'var(--text)' }}
                    >
                      {imgDesc}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>

      {/* Back link */}
      <div className="mt-16 md:mt-24">
        <Link
          href="/"
          className="font-sans text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text)' }}
        >
          ← Powrót
        </Link>
      </div>

      {/* Lightbox */}
      {lightbox?.image && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal={true}
        >
          <button
            className="lightbox__close"
            onClick={() => setLightbox(null)}
            aria-label="Zamknij"
          >
            ×
          </button>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={urlFor(lightbox.image).width(2400).auto('format').url()}
              alt={
                (lang === 'en' && lightbox.title_en ? lightbox.title_en : lightbox.title_pl) ?? ''
              }
              width={lightbox.dimensions?.width ?? 2400}
              height={lightbox.dimensions?.height ?? 1600}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                display: 'block',
              }}
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
