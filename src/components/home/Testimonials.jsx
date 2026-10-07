import { Container, Rating } from '../ui'

const quotes = [
  {
    name: 'Mira K.',
    place: 'Anniversary',
    text: 'The Ribbon Jar looked exactly like the photograph. It sat on our table for a week and still felt composed.',
    rating: 5,
  },
  {
    name: 'Owen L.',
    place: 'Same-day',
    text: 'Ordered after lunch, on the table before dinner. The stems were tight and the card was written by hand.',
    rating: 5,
  },
  {
    name: 'Helen P.',
    place: 'A standing order',
    text: 'Scarlet Study is what I send every year. They remember the charcoal wrap without being asked.',
    rating: 4.8,
  },
]

export function Testimonials() {
  const [lead, ...rest] = quotes

  return (
    <section className="py-16 md:py-20">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.28em] text-rose">Notes from the table</p>
        <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-5">
          <figure className="flex flex-col justify-between rounded-[1.6rem] bg-ink p-7 text-cream sm:p-10 lg:col-span-3">
            <Rating value={lead.rating} light />
            <blockquote className="mt-8 font-serif text-3xl leading-snug sm:text-4xl">“{lead.text}”</blockquote>
            <figcaption className="mt-8 text-sm text-cream/65">
              {lead.name}
              <span className="text-cream/40"> · {lead.place}</span>
            </figcaption>
          </figure>
          <div className="grid gap-4 lg:col-span-2">
            {rest.map((quote) => (
              <figure key={quote.name} className="flex flex-col justify-between rounded-[1.4rem] border border-sand bg-paper p-6">
                <blockquote className="font-serif text-xl leading-snug text-ink">“{quote.text}”</blockquote>
                <figcaption className="mt-5 text-sm text-ink/60">
                  {quote.name}
                  <span className="text-ink/35"> · {quote.place}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
