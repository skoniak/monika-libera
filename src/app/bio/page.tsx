import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import RichTextContent from '@/components/RichTextContent'
import { getPage } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Bio — Monika Libera' }

export default async function BioPage() {
  const page = await getPage('bio')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-14 md:py-20">
        <div className="content-container">
          <div className="max-w-2xl mx-auto">
            {page ? (
              <RichTextContent
                titlePl={page.title_pl}
                titleEn={page.title_en}
                contentPl={page.content_pl}
                contentEn={page.content_en}
              />
            ) : (
              <p className="font-sans text-sm opacity-35" style={{ color: 'var(--text)' }}>
                Dodaj stronę &ldquo;bio&rdquo; w panelu{' '}
                <a href="/studio" className="underline underline-offset-4">
                  /studio
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
