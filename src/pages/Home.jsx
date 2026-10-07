import { Link } from 'react-router-dom'
import { money, occasions, products } from '../data/catalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { CategoryGrid } from '../components/home/CategoryGrid'
import { Editorial } from '../components/home/Editorial'
import { Hero } from '../components/home/Hero'
import { Newsletter } from '../components/home/Newsletter'
import { Testimonials } from '../components/home/Testimonials'
import { Marquee } from '../components/home/Marquee'
import { Petals } from '../components/home/Petals'
import { Reveal } from '../components/Reveal'
import { Container } from '../components/ui'

export function Home() {
  usePageTitle('Seasonal flowers')
  const featured = products.filter((product) => product.featured)
  const lead = featured.find((product) => product.id === 'ribbon-jar') ?? featured[0]
  const rest = featured.filter((product) => product.id !== lead.id).slice(0, 3)

  return (
    <>
      <Petals />
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <img
          src="/flowers/cat-bouquets.jpg"
          alt=""
          className="ken absolute inset-0 h-full w-full object-cover object-[center_80%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/70 via-cream/25 to-transparent" />
      </div>
      <div className="rise relative z-10">
        <Hero />
        <Marquee />
        <CategoryGrid />

        <section className="pb-8">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-rose">On the bench</p>
                  <h2 className="mt-2 font-serif text-4xl md:text-5xl">Tied this morning</h2>
                </div>
                <Link to="/shop" className="shrink-0 text-sm text-ink/70 underline-offset-4 transition hover:text-rose hover:underline">
                  Shop all
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-12">
              <Link
                to={`/product/${lead.id}`}
                className="group grid overflow-hidden rounded-[1.6rem] bg-blush sm:grid-cols-2 lg:col-span-7"
              >
                <div className="overflow-hidden">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-full"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-sage">{lead.category}</p>
                  <h3 className="mt-2 font-serif text-4xl leading-tight">{lead.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{lead.description}</p>
                  <p className="mt-6 font-serif text-3xl">{money(lead.price)}</p>
                  <span className="mt-4 text-sm text-rose">View the arrangement</span>
                </div>
              </Link>
              <div className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
                {rest.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group flex gap-4 rounded-[1.2rem] border border-sand bg-paper p-3 transition hover:-translate-y-0.5 hover:border-rose"
                  >
                    <img src={product.image} alt="" className="h-24 w-20 shrink-0 rounded-xl object-cover" />
                    <span className="flex min-w-0 flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-sage">{product.category}</span>
                      <span className="mt-1 font-serif text-xl leading-tight">{product.name}</span>
                      <span className="mt-1 text-sm text-ink/60">{money(product.price)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <Editorial />

        <section className="py-14">
          <Container>
            <div className="grid gap-8 overflow-hidden rounded-[1.6rem] bg-ink px-6 py-8 text-cream sm:px-10 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-rose">A reason</p>
                <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Send it before the evening.</h2>
              </div>
              <div>
                {occasions.map((occasion, index) => (
                  <Link
                    key={occasion}
                    to={`/shop?occasion=${encodeURIComponent(occasion)}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-cream/15 py-4 transition hover:text-rose"
                  >
                    <span className="font-serif text-2xl sm:text-3xl">
                      <span className="mr-3 text-sm tracking-[0.16em] text-rose">{String(index + 1).padStart(2, '0')}</span>
                      {occasion}
                    </span>
                    <span className="text-sm text-cream/50 transition group-hover:translate-x-1 group-hover:text-rose" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <Container>
          <section className="grid overflow-hidden rounded-[1.6rem] bg-blush lg:grid-cols-2">
            <img src="/flowers/hero.jpg" alt="A field of poppies in warm evening light" className="ken h-72 w-full object-cover lg:h-full" />
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
              <p className="text-[11px] uppercase tracking-[0.28em] text-rose">This week</p>
              <p className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">California gold, while the light holds.</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
                Poppies and sunflowers for a short run. When the bunch is gone, it is gone until next season.
              </p>
              <Link to="/shop?category=seasonal" className="mt-6 text-sm text-rose underline-offset-4 hover:underline">
                See the seasonal bench
              </Link>
            </div>
          </section>
        </Container>

        <Testimonials />
        <Newsletter />
      </div>
    </>
  )
}
