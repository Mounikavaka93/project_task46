import { Button, Container } from '../ui'

export function Editorial() {
  return (
    <section id="story" className="scroll-mt-28 py-8 md:py-12">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-[1.8rem] bg-blush">
          <img
            src="/flowers/editorial.jpg"
            alt="A mixed seasonal bouquet of roses, berries, and herbs"
            className="aspect-[5/4] w-full object-cover lg:aspect-[4/5]"
          />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-rose">The studio</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            Grown with the season, not against it.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Lunaria is a small studio practice. We buy what is good this week — garden roses, flaming tulips, a sunflower with its collar still on — and tie it the same morning.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Nothing is dyed, nothing is forced into a perfect dome. If a stem is past its best, it does not leave the bench.
          </p>
          <div className="mt-8">
            <Button to="/shop?category=seasonal" variant="secondary">
              See what is in season
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
