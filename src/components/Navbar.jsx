import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { occasions } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { Container, Logo } from './ui'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/#story', label: 'Studio' },
]

export function Navbar() {
  const { cartCount, wishlist, user, logout } = useShop()
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState('')
  const [occasionsOpen, setOccasionsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const route = `${location.pathname}${location.search}`
  const [seenRoute, setSeenRoute] = useState(route)
  if (seenRoute !== route) {
    setSeenRoute(route)
    setOpen(false)
    setOccasionsOpen(false)
    setAccountOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function onSearch(event) {
    event.preventDefault()
    const query = term.trim()
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop')
    setOpen(false)
  }

  const iconBtn = 'relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-blush'

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink px-4 py-2 text-center text-[10px] leading-snug tracking-[0.12em] text-cream/85 sm:text-[11px] sm:tracking-[0.16em]">
        Lunaria · complimentary delivery over $75 · order by 2pm
      </div>
      <div className="border-b border-sand/80 bg-cream/85 backdrop-blur-md">
        <Container className="flex h-[4.25rem] items-center gap-4">
          <Logo />

          <nav className="ml-6 hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `nav-link text-sm tracking-wide transition hover:text-rose ${isActive ? 'is-active text-rose' : 'text-ink/80'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setOccasionsOpen(true)}
              onMouseLeave={() => setOccasionsOpen(false)}
            >
              <button
                type="button"
                className="text-sm tracking-wide text-ink/80 transition hover:text-rose"
                aria-expanded={occasionsOpen}
                onClick={() => setOccasionsOpen((value) => !value)}
              >
                Occasions
              </button>
              {occasionsOpen && (
                <div className="absolute left-0 top-full z-20 w-52 pt-3">
                  <div className="rounded-2xl border border-sand bg-paper p-2 shadow-soft">
                    {occasions.map((occasion) => (
                      <Link
                        key={occasion}
                        to={`/shop?occasion=${encodeURIComponent(occasion)}`}
                        className="block rounded-xl px-3 py-2 text-sm text-ink/80 transition hover:bg-blush hover:text-rose"
                      >
                        {occasion}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <form onSubmit={onSearch} className="ml-auto hidden items-center rounded-full border border-sand bg-white/80 px-3 py-2 md:flex">
            <Search size={15} className="text-ink/45" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search flowers"
              aria-label="Search flowers"
              className="w-32 bg-transparent px-2 text-sm outline-none placeholder:text-ink/35 lg:w-48"
            />
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  className={iconBtn}
                  aria-label="Account"
                  aria-expanded={accountOpen}
                  onClick={() => setAccountOpen((value) => !value)}
                >
                  <User size={18} />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full z-30 w-56 pt-2">
                    <div className="rounded-2xl border border-sand bg-paper p-4 shadow-soft">
                      <p className="font-medium">{user.name}</p>
                      <p className="truncate text-xs text-ink/50">{user.email}</p>
                      <button
                        type="button"
                        onClick={() => {
                          logout()
                          setAccountOpen(false)
                        }}
                        className="mt-3 text-sm text-rose"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`${iconBtn} hidden sm:grid`} aria-label="Sign in">
                <User size={18} />
              </Link>
            )}
            <Link to="/wishlist" className={iconBtn} aria-label="Wishlist">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className={iconBtn} aria-label="Cart">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button type="button" className={`${iconBtn} lg:hidden`} aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
          </div>
        </Container>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-cream px-5 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className={iconBtn}>
              <X size={18} />
            </button>
          </div>
          <form onSubmit={onSearch} className="mt-8 flex items-center rounded-full border border-sand bg-white px-4 py-3">
            <Search size={16} className="text-ink/45" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search flowers"
              aria-label="Search flowers"
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </form>
          <nav className="mt-8 flex flex-col gap-4 font-serif text-4xl">
            {links.map((link, index) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="menu-in"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link to="/login" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            )}
          </nav>
          {user && (
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-sand bg-paper px-4 py-3">
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-ink/50">{user.email}</p>
              </div>
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="text-sm text-rose">
                Sign out
              </button>
            </div>
          )}
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Occasions</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {occasions.map((occasion) => (
                <Link
                  key={occasion}
                  to={`/shop?occasion=${encodeURIComponent(occasion)}`}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-sand bg-white px-3 py-1.5 text-sm"
                >
                  {occasion}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
