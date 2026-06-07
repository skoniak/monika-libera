import CollectionGrid from '@/components/CollectionGrid'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getCollections } from '@/sanity/queries'

export default async function HomePage() {
  const collections = await getCollections()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex items-center py-10 md:py-16">
        <div className="content-container">
          <CollectionGrid collections={collections} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
