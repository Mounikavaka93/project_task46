import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { getSize, money } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { CartSummary } from '../components/CartSummary'
import { Button, Container, PageHeader, QuantityControl } from '../components/ui'

export function Cart() {
  usePageTitle('Cart')
  const { lines, updateQty, removeFromCart, user } = useShop()

  return (
    <div className="rise">
      <PageHeader eyebrow="Your bag" title="Cart" text="Adjust quantities before checkout. Delivery is calculated in the summary." />
      <Container className="py-10">
        {lines.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-sand bg-paper px-6 py-20 text-center">
            <p className="font-serif text-4xl">Your cart is empty.</p>
            <p className="mt-2 text-sm text-ink/60">The bench is full, whenever you are ready.</p>
            <Button to="/shop" className="mt-6">
              Browse arrangements
            </Button>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 rounded-[1.3rem] border border-sand bg-paper p-3 sm:p-4">
                  <Link to={`/product/${line.product.id}`} className="shrink-0 overflow-hidden rounded-2xl bg-blush">
                    <img src={line.product.image} alt="" className="h-28 w-24 object-cover sm:h-32 sm:w-28" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link to={`/product/${line.product.id}`} className="font-serif text-2xl leading-none hover:text-rose">
                          {line.product.name}
                        </Link>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/45">
                          {getSize(line.size).label} · {money(line.unit)}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => removeFromCart(line.key)}
                        className="grid h-9 w-9 place-items-center rounded-full text-ink/50 transition hover:bg-blush hover:text-rose"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityControl value={line.qty} onChange={(qty) => updateQty(line.key, qty)} min={0} />
                      <p className="font-medium">{money(line.line)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <CartSummary
              action={
                <Button to={user ? '/checkout' : '/login?next=/checkout'} className="w-full">
                  {user ? 'Checkout' : 'Sign in to checkout'}
                </Button>
              }
            />
          </div>
        )}
      </Container>
    </div>
  )
}
