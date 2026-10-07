import { getSize, money } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container } from '../components/ui'

export function OrderSuccess() {
  usePageTitle('Order confirmed')
  const { lastOrder } = useShop()

  if (!lastOrder) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-4xl">No order to show.</h1>
        <Button to="/shop" className="mt-6">
          Visit the shop
        </Button>
      </Container>
    )
  }

  const { details, lines, totals } = lastOrder
  const when = new Date(lastOrder.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Container className="rise py-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-rose">Confirmed</p>
        <h1 className="mt-2 font-serif text-5xl leading-tight">We have the order.</h1>
        <p className="mt-3 text-ink/70">
          {lastOrder.id} · placed {when}. A confirmation would normally go to {details.email}.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.3rem] border border-sand bg-paper p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Delivering to</p>
            <p className="mt-2 font-medium">{details.name}</p>
            <p className="text-sm text-ink/70">
              {details.address}
              <br />
              {details.city}, {details.region} {details.zip}
            </p>
            <p className="mt-2 text-sm text-ink/70">{details.phone}</p>
          </div>
          <div className="rounded-[1.3rem] border border-sand bg-paper p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Window</p>
            <p className="mt-2 font-medium">{details.date}</p>
            <p className="text-sm text-ink/70">{details.window}</p>
            {details.payment && (
              <>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ink/45">Payment</p>
                <p className="mt-1 font-medium">
                  {details.payment.brand} ···· {details.payment.last4}
                </p>
                <p className="text-sm text-ink/70">{details.payment.name}</p>
              </>
            )}
            {details.gift && details.giftMessage && (
              <p className="mt-3 text-sm italic text-ink/70">“{details.giftMessage}”</p>
            )}
          </div>
        </div>

        <ul className="mt-4 divide-y divide-sand rounded-[1.3rem] border border-sand bg-paper">
          {lines.map((line) => (
            <li key={`${line.name}-${line.size}`} className="flex items-center gap-3 p-4">
              <img src={line.image} alt="" className="h-16 w-14 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-medium">{line.name}</p>
                <p className="text-xs text-ink/50">
                  {getSize(line.size).label} · Qty {line.qty}
                </p>
              </div>
              <p className="text-sm">{money(line.unit * line.qty)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between rounded-[1.3rem] bg-ink px-5 py-4 text-cream">
          <span className="text-sm">Total</span>
          <span className="font-serif text-3xl">{money(totals.total)}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/shop">Continue shopping</Button>
          <Button to="/" variant="secondary">
            Back home
          </Button>
        </div>
      </div>
    </Container>
  )
}
