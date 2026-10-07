import { Button, Container } from '../ui'

const hours = [
  { mark: '06', label: 'Cut', text: 'At the market, while it is still cool' },
  { mark: '11', label: 'Tied', text: 'On the bench, with a handwritten card' },
  { mark: '14', label: 'Out', text: 'Same-day orders leave by 2pm' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-7.2rem)] flex-col justify-center overflow-hidden">
      <Container className="py-12 md:py-16">
        <div className="rise max-w-xl">
          <div className="flex items-center gap-3">
            <span className="moon" aria-hidden="true" />
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-rose">Night garden · this week</p>
          </div>
          <h1 className="mt-5 font-serif text-[2.7rem] leading-[0.9] text-ink sm:text-6xl lg:text-[4.6rem]">
            After dusk, <span className="italic text-rose">the bench is open.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75">
            Lunaria ties what the market is actually growing. Wrapped in paper, finished with a handwritten card, and sent across the city before evening.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/shop">Enter the shop</Button>
            <Button to="/shop?category=bouquets" variant="secondary">
              Mixed bouquets
            </Button>
          </div>
        </div>
      </Container>

      <Container className="pb-8">
        <div className="grid overflow-hidden rounded-[1.4rem] bg-ink/90 text-cream backdrop-blur-sm sm:grid-cols-3">
          {hours.map((hour, index) => (
            <div
              key={hour.label}
              className={`rise flex gap-4 px-5 py-5 ${index > 0 ? 'border-t border-cream/15 sm:border-t-0 sm:border-l' : ''}`}
              style={{ animationDelay: `${0.3 + index * 0.08}s` }}
            >
              <span className="font-serif text-3xl leading-none text-rose">{hour.mark}</span>
              <span>
                <span className="block text-sm font-medium tracking-wide">{hour.label}</span>
                <span className="mt-1 block text-xs leading-snug text-cream/65">{hour.text}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
