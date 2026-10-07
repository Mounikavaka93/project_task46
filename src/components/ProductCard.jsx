import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { discountPercent, money } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { Rating } from './ui'

export function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop()
  const saved = wishlist.includes(product.id)
  const off = discountPercent(product)
  const [added, setAdded] = useState(false)

  function onAdd() {
    addToCart(product.id)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1100)
  }

  return (
    <article className="group flex h-full flex-col transition duration-500 hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-blush">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge && (
            <span className="rounded-full bg-paper/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ink">
              {product.badge}
            </span>
          )}
          {off > 0 && (
            <span className="rounded-full bg-rose px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
              {off}% off
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-paper/95 text-ink shadow-soft transition hover:scale-105 hover:text-rose"
        >
          <Heart size={16} className={saved ? 'fill-rose text-rose' : ''} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sage">{product.category}</p>
        <Link to={`/product/${product.id}`} className="mt-1 font-serif text-2xl leading-tight text-ink transition hover:text-rose">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviewCount} className="mt-2" />
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="flex items-baseline gap-2">
            <span className="text-base font-medium">{money(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-ink/40 line-through">{money(product.originalPrice)}</span>
            )}
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-medium tracking-wide text-cream transition duration-300 hover:bg-rose"
          >
            <ShoppingBag size={14} />
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}
