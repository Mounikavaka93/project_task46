import { Link } from 'react-router-dom'
import { occasions } from '../data/catalog'
import { Container, Logo } from './ui'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-20 border-t border-sand bg-ink text-cream">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Seasonal flowers, tied in a small studio and delivered the same day. A note card is always included.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/shop" className="transition hover:text-white">All arrangements</Link></li>
            <li><Link to="/shop?category=roses" className="transition hover:text-white">Roses</Link></li>
            <li><Link to="/shop?category=bouquets" className="transition hover:text-white">Bouquets</Link></li>
            <li><Link to="/wishlist" className="transition hover:text-white">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">Occasions</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {occasions.map((occasion) => (
              <li key={occasion}>
                <Link to={`/shop?occasion=${encodeURIComponent(occasion)}`} className="transition hover:text-white">
                  {occasion}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>12 Petal Lane</li>
            <li>Open Tue–Sun, 9–6</li>
            <li>hello@lunaria.studio</li>
            <li><Link to="/login" className="transition hover:text-white">Account</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <p>© {year} Lunaria. A front-end studio demo.</p>
          <p>Hand-tied · Same-day · Note cards included</p>
        </Container>
      </div>
    </footer>
  )
}
