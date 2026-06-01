import type { PortableTextBlock } from '@portabletext/types'
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

export type Page = {
  title_pl: string
  title_en: string | null
  slug: string
  content_pl: PortableTextBlock[] | null
  content_en: PortableTextBlock[] | null
}

export type Contact = {
  email: string | null
  phone: string | null
  socialLinks: Array<{ platform: string; url: string }> | null
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

const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  title_pl,
  title_en,
  "slug": slug.current,
  content_pl,
  content_en
}`

const contactQuery = `*[_type == "contact"][0] {
  email,
  phone,
  socialLinks
}`

// ── Fetch helpers ────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  return client.fetch(collectionsQuery, {}, { next: { revalidate: 60 } })
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } })
}

export async function getPage(slug: string): Promise<Page | null> {
  return client.fetch(pageQuery, { slug }, { next: { revalidate: 300 } })
}

export async function getContact(): Promise<Contact | null> {
  return client.fetch(contactQuery, {}, { next: { revalidate: 3600 } })
}
