import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container } from '../components/ui'

export function NotFound() {
  usePageTitle('Not found')
  return (
    <Container className="py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-rose">404</p>
      <h1 className="mt-3 font-serif text-5xl">This page is not in the studio.</h1>
      <Button to="/" className="mt-6">
        Return home
      </Button>
    </Container>
  )
}
