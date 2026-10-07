import { getProduct } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { ProductCard } from '../components/ProductCard'
import { Button, Container, PageHeader } from '../components/ui'

export function Wishlist() {
  usePageTitle('Wishlist')
  const { wishlist } = useShop()
  const saved = wishlist.map((id) => getProduct(id)).filter(Boolean)

  return (
    <div className="rise">
      <PageHeader eyebrow="Saved" title="Wishlist" text="Arrangements you want to come back to. They stay on this device." />
      <Container className="py-10">
        {saved.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-sand bg-paper px-6 py-20 text-center">
            <p className="font-serif text-4xl">Nothing saved yet.</p>
            <p className="mt-2 text-sm text-ink/60">Tap the heart on any arrangement to keep it here.</p>
            <Button to="/shop" className="mt-6">
              Explore the shop
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
