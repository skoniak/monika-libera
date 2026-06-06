import CollectionItem from './CollectionItem'
import type { Collection } from '@/sanity/queries'

type Props = {
  collections: Collection[]
}

export default function CollectionGrid({ collections }: Props) {
  const count = collections.length

  if (count === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p
          className="font-sans text-xs uppercase tracking-widest"
          style={{ color: 'var(--text)', opacity: 0.35 }}
        >
          Dodaj kolekcje w panelu{' '}
          <a href="/studio" className="underline underline-offset-4">
            /studio
          </a>
        </p>
      </div>
    )
  }

  if (count === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-[500px]">
          <CollectionItem collection={collections[0]} />
        </div>
      </div>
    )
  }

  return (
    <div className="collection-grid">
      {collections.map((collection) => (
        <CollectionItem key={collection.slug} collection={collection} />
      ))}
    </div>
  )
}
