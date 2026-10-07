import { Link } from 'react-router-dom'
import { categories, categoryCount } from '../../data/catalog'
import { Reveal } from '../Reveal'
import { Container } from '../ui'

const spans = {
  roses: 'col-span-2 aspect-[4/3] lg:col-span-4 lg:row-span-2 lg:aspect-auto lg:min-h-[28rem]',
  lilies: 'aspect-[3/4] lg:col-span-4 lg:aspect-[4/3]',
  tulips: 'aspect-[3/4] lg:col-span-4 lg:aspect-[4/3]',
  sunflowers: 'aspect-[3/4] lg:col-span-2 lg:aspect-auto lg:min-h-56',
  bouquets: 'aspect-[3/4] lg:col-span-2 lg:aspect-auto lg:min-h-56',
  seasonal: 'aspect-[3/4] lg:col-span-2 lg:aspect-auto lg:min-h-56',
  plants: 'aspect-[3/4] lg:col-span-2 lg:aspect-auto lg:min-h-56',
}

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-rose">The night menu</p>
              <h2 className="mt-2 max-w-lg font-serif text-4xl leading-tight md:text-5xl">Seven ways the bench is set</h2>
            </div>
            <Link to="/shop" className="shrink-0 text-sm text-ink/70 underline-offset-4 transition hover:text-rose hover:underline">
              Full shop
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-12">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 50} className={spans[category.id]}>
              <Link
                to={`/shop?category=${category.id}`}
                className="group relative block h-full min-h-full overflow-hidden rounded-[1.25rem] bg-blush transition duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                <img
                  src={category.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/75">
                    {String(index + 1).padStart(2, '0')} · {categoryCount(category.id)}
                  </p>
                  <h3 className="font-serif text-[1.35rem] leading-none sm:text-3xl">{category.name}</h3>
                  <p className="mt-1 text-[11px] leading-snug text-white/80 sm:text-xs">{category.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
