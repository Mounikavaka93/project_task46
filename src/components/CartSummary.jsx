import { useState } from 'react'
import { FREE_SHIPPING_AT, money } from '../data/catalog'
import { useShop } from '../hooks/useShop'

export function CartSummary({ action }) {
  const { totals, promo, applyPromo, clearPromo } = useShop()
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const qualified = totals.subtotal - totals.discount
  const remaining = Math.max(0, FREE_SHIPPING_AT - qualified)
  const progress = totals.subtotal === 0 ? 0 : Math.min(100, (qualified / FREE_SHIPPING_AT) * 100)

  function onApply() {
    const result = applyPromo(code)
    setMessage(result.message)
    if (result.ok) setCode('')
  }

  return (
    <aside className="h-fit rounded-[1.5rem] border border-sand bg-paper p-6 shadow-soft lg:sticky lg:top-32">
      <h2 className="font-serif text-3xl">Order summary</h2>

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-sand">
          <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-ink/65">
          {remaining === 0
            ? 'Complimentary delivery is included.'
            : `${money(remaining)} away from complimentary delivery.`}
        </p>
      </div>

      <div className="mt-5 flex gap-2">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onApply()
            }
          }}
          placeholder="Offer code"
          aria-label="Offer code"
          className="field"
        />
        <button type="button" onClick={onApply} className="rounded-full bg-ink px-4 text-sm text-cream transition hover:bg-rose">
          Apply
        </button>
      </div>
      {promo && (
        <p className="mt-2 flex items-center justify-between text-xs text-sage">
          <span>{promo} is applied</span>
          <button type="button" onClick={clearPromo} className="underline underline-offset-2">
            Remove
          </button>
        </p>
      )}
      {message && !promo && <p className="mt-2 text-xs text-rose">{message}</p>}
      <p className="mt-2 text-[11px] tracking-wide text-ink/45">Try LUNA10 or LUNA15</p>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink/65">Subtotal</dt>
          <dd>{money(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/65">Offer</dt>
          <dd>{totals.discount ? `−${money(totals.discount)}` : '—'}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/65">Delivery</dt>
          <dd>{totals.shipping === 0 ? 'Complimentary' : money(totals.shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-sand pt-3 font-medium">
          <dt>Total</dt>
          <dd className="font-serif text-2xl leading-none">{money(totals.total)}</dd>
        </div>
      </dl>

      <div className="mt-6">{action}</div>
    </aside>
  )
}
