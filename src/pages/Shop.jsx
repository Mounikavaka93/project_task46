import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { categories, occasions, products } from '../data/catalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { ProductCard } from '../components/ProductCard'
import { Container, PageHeader } from '../components/ui'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'name', label: 'Name A–Z' },
]

const prices = [
  { id: 'all', label: 'Any price' },
  { id: 'under', label: 'Under $50' },
  { id: 'mid', label: '$50–$80' },
  { id: 'over', label: 'Over $80' },
]

function matchesPrice(product, price) {
  if (price === 'under') return product.price < 50
  if (price === 'mid') return product.price >= 50 && product.price <= 80
  if (price === 'over') return product.price > 80
  return true
}

export function Shop() {
  usePageTitle('Shop')
  const [params, setParams] = useSearchParams()
  const qParam = params.get('q') ?? ''
  const category = params.get('category') ?? 'all'
  const occasion = params.get('occasion') ?? 'all'
  const sort = params.get('sort') ?? 'featured'
  const price = params.get('price') ?? 'all'
  const [focused, setFocused] = useState(false)
  const [query, setQuery] = useState(qParam)
  const [seenQuery, setSeenQuery] = useState(qParam)
  if (qParam !== seenQuery) {
    setSeenQuery(qParam)
    if (!focused) setQuery(qParam)
  }

  function update(next) {
    const merged = { q: query, category, occasion, sort, price, ...next }
    const cleaned = Object.fromEntries(
      Object.entries(merged).filter(([, value]) => value && value !== 'all' && value !== 'featured'),
    )
    setParams(cleaned)
  }

  const results = useMemo(() => {
    const needle = qParam.trim().toLowerCase()
    const list = products.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.description} ${product.occasions.join(' ')}`.toLowerCase()
      const matchesQuery = !needle || haystack.includes(needle)
      const matchesCategory = category === 'all' || product.categoryId === category
      const matchesOccasion = occasion === 'all' || product.occasions.includes(occasion)
      return matchesQuery && matchesCategory && matchesOccasion && matchesPrice(product, price)
    })

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    return sorted
  }, [qParam, category, occasion, sort, price])

  const activeFilters = category !== 'all' || occasion !== 'all' || price !== 'all' || qParam

  return (
    <div className="rise">
      <PageHeader
        eyebrow="The shop"
        title="Arrangements"
        text="Roses, lilies, tulips, sunflowers, and the mixed bouquets on the bench this week."
      />
      <Container className="py-8">
        <div className="flex flex-col gap-4 rounded-[1.4rem] border border-sand bg-paper p-4 md:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search arrangements</span>
              <input
                value={query}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(event) => {
                  const value = event.target.value
                  setQuery(value)
                  update({ q: value })
                }}
                placeholder="Search by flower, color, or occasion"
                className="field"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <SlidersHorizontal size={16} />
              <span className="sr-only">Sort arrangements</span>
              <select
                value={sort}
                onChange={(event) => update({ sort: event.target.value })}
                className="field min-w-48 cursor-pointer"
              >
                {sorts.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterPill active={category === 'all'} onClick={() => update({ category: 'all' })}>
              All
            </FilterPill>
            {categories.map((item) => (
              <FilterPill
                key={item.id}
                active={category === item.id}
                onClick={() => update({ category: item.id })}
              >
                {item.name}
              </FilterPill>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {occasions.map((item) => (
              <FilterPill
                key={item}
                active={occasion === item}
                onClick={() => update({ occasion: occasion === item ? 'all' : item })}
              >
                {item}
              </FilterPill>
            ))}
            <span className="mx-1 hidden h-5 w-px bg-sand sm:block" aria-hidden="true" />
            {prices.map((item) => (
              <FilterPill key={item.id} active={price === item.id} onClick={() => update({ price: item.id })}>
                {item.label}
              </FilterPill>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-ink/60">
          <p>
            {results.length} arrangement{results.length === 1 ? '' : 's'}
          </p>
          {activeFilters && (
            <button type="button" onClick={() => setParams({})} className="text-rose underline-offset-2 hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-[1.4rem] border border-dashed border-sand bg-paper px-6 py-16 text-center">
            <p className="font-serif text-3xl">Nothing matches that search.</p>
            <p className="mt-2 text-sm text-ink/60">Try another flower, or clear the filters.</p>
            <button type="button" onClick={() => setParams({})} className="mt-5 text-sm text-rose underline-offset-2 hover:underline">
              Show everything
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
        active ? 'bg-ink text-cream' : 'border border-sand bg-white text-ink/75 hover:border-rose hover:text-rose'
      }`}
    >
      {children}
    </button>
  )
}
