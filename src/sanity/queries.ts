import { client } from './client'

// ── Types ────────────────────────────────────────

export type Collection = {
  title_pl: string
  title_en: string | null
  description_pl: string | null
  description_en: string | null
  coverImage: {
    _type: 'image'
    asset: { _ref: string; _type: 'reference' }
    hotspot?: { x: number; y: number; height: number; width: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  } | null
  slug: string
  order: number | null
}

export type SiteSettings = {
  siteName: string | null
}

// ── Queries ──────────────────────────────────────

const collectionsQuery = `*[_type == "collection"] | order(order asc) {
  title_pl,
  title_en,
  description_pl,
  description_en,
  coverImage,
  "slug": slug.current,
  order
}`

const siteSettingsQuery = `*[_type == "siteSettings"][0]`

// ── Fetch helpers ────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  return client.fetch(collectionsQuery, {}, { next: { revalidate: 60 } })
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } })
}
