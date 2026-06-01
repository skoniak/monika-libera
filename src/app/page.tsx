import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="content-container flex items-center justify-center py-20">
          <p
            className="font-sans text-xs uppercase tracking-widest"
            style={{ color: 'var(--text)', opacity: 0.3 }}
          >
            Kolekcje pojawią się tutaj
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
