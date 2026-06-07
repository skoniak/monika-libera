'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { urlFor } from '@/sanity/image'
import type { CollectionDetail, CollectionImage } from '@/sanity/queries'

function ChevronLeft() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 22 10 14 18 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="10 6 18 14 10 22" />
    </svg>
  )
}

export default function GalleryView({ collection }: { collection: CollectionDetail }) {
  const { lang } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const title = lang === 'en' && collection.title_en ? collection.title_en : collection.title_pl
  const description =
    lang === 'en' && collection.description_en
      ? collection.description_en
      : collection.description_pl

  // Filter out items without images so indices are reliable
  const images: CollectionImage[] = (collection.images ?? []).filter(
    (item): item is CollectionImage => item.image !== null
  )

  const isOpen = lightboxIndex !== null
  const lightboxItem = isOpen ? images[lightboxIndex] : null

  const closeLightbox = () => setLightboxIndex(null)
  const goPrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))
  const goNext = () =>
    setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i))

  useEffect(() => {
    if (lightboxIndex === null) return
    const toPreload = [lightboxIndex - 1, lightboxIndex + 1].filter(
      (i) => i >= 0 && i < images.length
    )
    toPreload.forEach((i) => {
      const img = new window.Image()
      img.src = urlFor(images[i].image!).width(1920).quality(85).auto('format').url()
    })
  }, [lightboxIndex, images])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, lightboxIndex, images.length])

  return (
    <>
      {/* Page header */}
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

      {/* Image list */}
      <div className="space-y-10 md:space-y-16 max-w-3xl">
        {images.length === 0 && (
          <p className="font-sans text-xs opacity-35" style={{ color: 'var(--text)' }}>
            Brak zdjęć w tej kolekcji.
          </p>
        )}

        {images.map((item, index) => {
          const imgTitle = lang === 'en' && item.title_en ? item.title_en : item.title_pl
          const imgDesc =
            lang === 'en' && item.description_en ? item.description_en : item.description_pl
          const src = urlFor(item.image!).width(1200).quality(80).auto('format').url()
          const w = item.dimensions?.width ?? 1200
          const h = item.dimensions?.height ?? 900

          return (
            <figure key={item._key}>
              <button
                className="block w-full"
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightboxIndex(index)}
                aria-label={imgTitle ?? 'Powiększ zdjęcie'}
              >
                <img
                  src={src}
                  alt={imgTitle ?? ''}
                  width={w}
                  height={h}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </button>

              {(imgTitle || imgDesc) && (
                <figcaption className="mt-3 space-y-1">
                  {imgTitle && (
                    <p className="font-serif text-sm tracking-wide" style={{ color: 'var(--text)' }}>
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
      {isOpen && lightboxItem?.image && (() => {
        const lb = lightboxItem
        const lbTitle = lang === 'en' && lb.title_en ? lb.title_en : lb.title_pl
        const lbDesc = lang === 'en' && lb.description_en ? lb.description_en : lb.description_pl
        return (
          <div
            className="lightbox"
            onClick={closeLightbox}
            role="dialog"
            aria-modal={true}
            aria-label="Podgląd zdjęcia"
          >
            {/* Close */}
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Zamknij">
              ×
            </button>

            {/* Prev arrow */}
            {lightboxIndex! > 0 && (
              <button
                className="lightbox__arrow lightbox__arrow--prev"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft />
              </button>
            )}

            {/* Image + caption */}
            <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
              <img
                src={urlFor(lb.image!).width(1920).quality(85).auto('format').url()}
                alt={lbTitle ?? ''}
                width={lb.dimensions?.width ?? 1920}
                height={lb.dimensions?.height ?? 1280}
                style={{
                  maxWidth: '90vw',
                  maxHeight: 'calc(90vh - 80px)',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                }}
              />

              {(lbTitle || lbDesc) && (
                <div className="lightbox__caption">
                  {lbTitle && (
                    <p className="font-serif text-sm tracking-wide text-white/80">{lbTitle}</p>
                  )}
                  {lbDesc && (
                    <p className="font-sans font-light text-xs text-white/50 mt-1 leading-relaxed">
                      {lbDesc}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Next arrow */}
            {lightboxIndex! < images.length - 1 && (
              <button
                className="lightbox__arrow lightbox__arrow--next"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                aria-label="Następne zdjęcie"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        )
      })()}
    </>
  )
}
