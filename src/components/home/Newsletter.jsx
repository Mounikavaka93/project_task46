import { useState } from 'react'
import { Container } from '../ui'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    if (!email.includes('@')) return
    setDone(true)
  }

  return (
    <section className="pb-4">
      <Container>
        <div className="overflow-hidden rounded-[1.8rem] bg-ink text-cream">
          <div className="grid lg:grid-cols-2">
            <img src="/flowers/p-wild.jpg" alt="Pale pink blossom branches" className="h-64 w-full object-cover lg:h-full" />
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
              <p className="text-[11px] uppercase tracking-[0.28em] text-rose">The week’s list</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">A note only when the bench changes.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
                Dahlias arriving, tulips at their best, branches for a short week. No daily mail.
              </p>
              {done ? (
                <p className="mt-6 text-sm text-cream">You are on the list. We will write when it is worth it.</p>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="field sm:max-w-xs"
                  />
                  <button type="submit" className="rounded-full bg-rose px-5 py-3 text-sm text-white transition hover:bg-cream hover:text-ink">
                    Join the list
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
