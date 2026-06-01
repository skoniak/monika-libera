import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getContact } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Kontakt — Monika Libera' }

export default async function ContactPage() {
  const contact = await getContact()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-14 md:py-20">
        <div className="content-container">
          <div className="max-w-lg mx-auto">
            <ContactContent contact={contact} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
