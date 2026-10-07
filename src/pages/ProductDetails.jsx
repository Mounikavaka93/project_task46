import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Truck } from 'lucide-react'
import { discountPercent, getProduct, getSize, money, products, sizes, unitPrice } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { ProductCard } from '../components/ProductCard'
import { Button, Container, QuantityControl, Rating } from '../components/ui'

export function ProductDetails() {
  const { id } = useParams()
  const product = getProduct(id)
  usePageTitle(product?.name ?? 'Arrangement')
  if (!product) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-4xl">That arrangement has left the bench.</h1>
        <Button to="/shop" className="mt-6">
          Back to the shop
        </Button>
      </Container>
    )
  }
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const { addToCart, toggleWishlist, wishlist, cart } = useShop()
  const [size, setSize] = useState('classic')
  const [qty, setQty] = useState(1)
  const [photo, setPhoto] = useState(0)

  const price = unitPrice(product, size)
  const off = discountPercent(product)
  const saved = wishlist.includes(product.id)
  const inCart = cart.find((item) => item.productId === product.id && item.size === size)
  const related = products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4)
  const gallery = product.gallery.length ? product.gallery : [product.image]

  return (
    <div className="rise">
      <Container className="py-8 md:py-12">
        <p className="text-sm text-ink/50">
          <Link to="/" className="hover:text-rose">Home</Link>
          <span className="px-2">/</span>
          <Link to="/shop" className="hover:text-rose">Shop</Link>
          <span className="px-2">/</span>
          <span className="text-ink">{product.name}</span>
        </p>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-[1.6rem] bg-blush">
              <img src={gallery[photo]} alt={product.name} className="aspect-[4/5] w-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3">
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setPhoto(index)}
                    className={`overflow-hidden rounded-2xl border-2 ${index === photo ? 'border-rose' : 'border-transparent'}`}
                  >
                    <img src={src} alt="" className="h-20 w-20 object-cover sm:h-24 sm:w-24" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-sage">{product.category}</p>
            <h1 className="mt-2 text-balance font-serif text-4xl leading-[0.95] sm:text-5xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Rating value={product.rating} count={product.reviewCount} />
              {product.badge && (
                <span className="rounded-full bg-blush px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-rose">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="mt-5 flex items-end gap-3">
              <p className="font-serif text-4xl">{money(price)}</p>
              {product.originalPrice && size === 'classic' && (
                <p className="pb-1 text-ink/40 line-through">{money(product.originalPrice)}</p>
              )}
              {off > 0 && size === 'classic' && <p className="pb-1 text-sm text-rose">{off}% off</p>}
            </div>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/75">{product.description}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">{product.story}</p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {sizes.map((option) => {
                const active = size === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSize(option.id)}
                    className={`rounded-2xl border px-3 py-3 text-left transition ${
                      active ? 'border-rose bg-blush' : 'border-sand bg-white hover:border-rose/40'
                    }`}
                  >
                    <span className="block text-sm font-medium">{option.label}</span>
                    <span className="mt-0.5 block text-[11px] text-ink/55">{option.detail}</span>
                    <span className="mt-2 block text-sm">{money(unitPrice(product, option.id))}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QuantityControl value={qty} onChange={setQty} />
              <Button className="min-w-44 flex-1" onClick={() => addToCart(product.id, size, qty)}>
                Add to cart
              </Button>
              <button
                type="button"
                aria-pressed={saved}
                onClick={() => toggleWishlist(product.id)}
                className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-3 text-sm transition hover:border-rose hover:text-rose"
              >
                <Heart size={16} className={saved ? 'fill-rose text-rose' : ''} />
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
            {inCart && (
              <p className="mt-3 text-sm text-sage">
                {inCart.qty} × {getSize(size).label} already in your cart.
              </p>
            )}
            {product.stockNote && <p className="mt-2 text-sm text-rose">{product.stockNote}</p>}

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-blush/70 px-4 py-3 text-sm text-ink/75">
              <Truck size={18} className="mt-0.5 shrink-0 text-rose" />
              <p>Same-day hand delivery if you order by 2pm. Complimentary over $75. A note card is included.</p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Stems</dt>
                <dd className="mt-1">{product.stems}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">In the vase</dt>
                <dd className="mt-1">{product.vaseLife}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-sand">
              <details className="group border-b border-sand py-4" open>
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                  Care
                  <span className="text-ink/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 text-sm leading-relaxed text-ink/70">
                  Recut the stems at an angle, use cool water, and keep the arrangement out of direct sun. Tulips keep drinking, so top up the vase each morning. Lilies arrive with the pollen removed.
                </p>
              </details>
              <details className="group border-b border-sand py-4">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                  Delivery
                  <span className="text-ink/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 text-sm leading-relaxed text-ink/70">
                  Choose a morning, afternoon, or evening window at checkout. We text when the courier is close. Gift messages are written on a card, not printed.
                </p>
              </details>
            </div>

            <div className="mt-8 space-y-4">
              {product.notes.map((note) => (
                <figure key={note.name} className="rounded-2xl border border-sand bg-paper p-4">
                  <Rating value={note.stars} />
                  <blockquote className="mt-2 text-sm leading-relaxed text-ink/80">“{note.text}”</blockquote>
                  <figcaption className="mt-2 text-xs text-ink/50">{note.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-4xl">More {product.category.toLowerCase()}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  )
}
