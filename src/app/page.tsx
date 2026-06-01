import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <p
          className="font-sans text-sm uppercase tracking-widest"
          style={{ color: 'var(--text)', opacity: 0.4 }}
        >
          Kolekcje pojawią się tutaj
        </p>
      </main>
      <Footer />
    </div>
  )
}
