import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CreditCard } from 'lucide-react'
import { getSize, money } from '../data/catalog'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { CartSummary } from '../components/CartSummary'
import { Button, Container, Field, PageHeader } from '../components/ui'

function digitsOnly(value) {
  return value.replace(/\D/g, '')
}

function cardBrand(digits) {
  if (/^3[47]/.test(digits)) return 'American Express'
  if (/^4/.test(digits)) return 'Visa'
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard'
  if (/^6(?:011|5|4[4-9])/.test(digits)) return 'Discover'
  return 'Card'
}

function formatCardNumber(value) {
  const raw = digitsOnly(value)
  const amex = /^3[47]/.test(raw)
  const digits = raw.slice(0, amex ? 15 : 16)
  if (amex) {
    return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10)].filter(Boolean).join(' ')
  }
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  let digits = digitsOnly(value).slice(0, 4)
  if (digits.length === 1 && Number(digits) > 1) digits = `0${digits}`
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function passesLuhn(digits) {
  let sum = 0
  let alternate = false
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])
    if (alternate) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    alternate = !alternate
  }
  return sum % 10 === 0
}

function expiryError(value) {
  const match = value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return 'Enter the expiry as MM/YY.'
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return 'Enter a month from 01 to 12.'
  const endOfMonth = new Date(year, month, 0, 23, 59, 59)
  if (endOfMonth < new Date()) return 'This card has expired.'
  return ''
}

function todayInput() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

const windows = ['Morning · 9–12', 'Afternoon · 12–4', 'Evening · 4–7']

export function Checkout() {
  usePageTitle('Checkout')
  const { user, lines, totals, placeOrder } = useShop()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [gift, setGift] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zip: '',
    date: todayInput(),
    window: windows[0],
    note: '',
    giftMessage: '',
    cardName: user?.name ?? '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  if (!user) return <Navigate to="/login?next=/checkout" replace />
  if (!placed && lines.length === 0) return <Navigate to="/cart" replace />

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function validate() {
    const next = {}
    const cardDigits = digitsOnly(form.cardNumber)
    const brand = cardBrand(cardDigits)
    const expectedLength = brand === 'American Express' ? 15 : 16
    const expectedCvv = brand === 'American Express' ? 4 : 3
    if (form.name.trim().length < 2) next.name = 'Add the recipient or your name.'
    if (!form.email.includes('@')) next.email = 'Enter a valid email.'
    if (digitsOnly(form.phone).length < 10) next.phone = 'Enter a phone number we can text.'
    if (form.address.trim().length < 5) next.address = 'Add a street address.'
    if (form.city.trim().length < 2) next.city = 'Add a city.'
    if (form.region.trim().length < 2) next.region = 'Add a state or region.'
    if (form.zip.trim().length < 4) next.zip = 'Add a postal code.'
    if (!form.date || form.date < todayInput()) next.date = 'Choose today or a later date.'
    if (!/^[a-zA-Z][a-zA-Z .'-]{1,}$/.test(form.cardName.trim())) next.cardName = 'Enter the name printed on the card.'
    if (cardDigits.length !== expectedLength || !passesLuhn(cardDigits)) next.cardNumber = 'Enter a valid card number.'
    const expiryMessage = expiryError(form.expiry)
    if (expiryMessage) next.expiry = expiryMessage
    if (digitsOnly(form.cvv).length !== expectedCvv) {
      next.cvv = `Enter the ${expectedCvv}-digit security code.`
    }
    setErrors(next)
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => {
        document.querySelector('.field.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
    return Object.keys(next).length === 0
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    const cardDigits = digitsOnly(form.cardNumber)
    setPlacing(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setPlaced(true)
    placeOrder({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      region: form.region,
      zip: form.zip,
      date: form.date,
      window: form.window,
      note: form.note,
      gift,
      giftMessage: gift ? form.giftMessage : '',
      payment: {
        brand: cardBrand(cardDigits),
        last4: cardDigits.slice(-4),
        name: form.cardName.trim(),
      },
    })
    navigate('/order-confirmation')
  }

  return (
    <div className="rise">
      <PageHeader eyebrow="Delivery" title="Checkout" text="Tell us where it should land, then pay with a card. This is a demo: the full number and security code are not saved." />
      <Container className="py-10">
        <form onSubmit={onSubmit} className="grid items-start gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <section className="rounded-[1.4rem] border border-sand bg-paper p-5 sm:p-6">
              <h2 className="font-serif text-3xl">Contact</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input value={form.name} onChange={(event) => update('name', event.target.value)} className={`field ${errors.name ? 'invalid' : ''}`} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input value={form.phone} onChange={(event) => update('phone', event.target.value)} className={`field ${errors.phone ? 'invalid' : ''}`} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email" error={errors.email}>
                    <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className={`field ${errors.email ? 'invalid' : ''}`} />
                  </Field>
                </div>
              </div>
            </section>

            <section className="rounded-[1.4rem] border border-sand bg-paper p-5 sm:p-6">
              <h2 className="font-serif text-3xl">Address</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Street address" error={errors.address}>
                    <input value={form.address} onChange={(event) => update('address', event.target.value)} className={`field ${errors.address ? 'invalid' : ''}`} />
                  </Field>
                </div>
                <Field label="City" error={errors.city}>
                  <input value={form.city} onChange={(event) => update('city', event.target.value)} className={`field ${errors.city ? 'invalid' : ''}`} />
                </Field>
                <Field label="State" error={errors.region}>
                  <input value={form.region} onChange={(event) => update('region', event.target.value)} className={`field ${errors.region ? 'invalid' : ''}`} />
                </Field>
                <Field label="Postal code" error={errors.zip}>
                  <input value={form.zip} onChange={(event) => update('zip', event.target.value)} className={`field ${errors.zip ? 'invalid' : ''}`} />
                </Field>
              </div>
            </section>

            <section className="rounded-[1.4rem] border border-sand bg-paper p-5 sm:p-6">
              <h2 className="font-serif text-3xl">When</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Delivery date" error={errors.date}>
                  <input type="date" min={todayInput()} value={form.date} onChange={(event) => update('date', event.target.value)} className={`field ${errors.date ? 'invalid' : ''}`} />
                </Field>
                <Field label="Window">
                  <select value={form.window} onChange={(event) => update('window', event.target.value)} className="field">
                    {windows.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Courier note">
                    <textarea value={form.note} onChange={(event) => update('note', event.target.value)} rows={3} className="field" placeholder="Gate code, leave with the doorman…" />
                  </Field>
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={gift} onChange={(event) => setGift(event.target.checked)} className="accent-rose" />
                This is a gift
              </label>
              {gift && (
                <div className="mt-4">
                  <Field label="Card message">
                    <textarea
                      value={form.giftMessage}
                      onChange={(event) => update('giftMessage', event.target.value)}
                      rows={3}
                      className="field"
                      placeholder="We will write this by hand."
                    />
                  </Field>
                </div>
              )}
            </section>

            <section className="rounded-[1.4rem] border border-sand bg-paper p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-3xl">Payment</h2>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-ink/45">
                  <CreditCard size={14} />
                  {cardBrand(digitsOnly(form.cardNumber))}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink/60">
                Try 4242 4242 4242 4242, any future date, and any 3-digit code.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Name on card" error={errors.cardName}>
                    <input
                      autoComplete="cc-name"
                      value={form.cardName}
                      onChange={(event) => update('cardName', event.target.value)}
                      className={`field ${errors.cardName ? 'invalid' : ''}`}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Card number" error={errors.cardNumber}>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={(event) => update('cardNumber', formatCardNumber(event.target.value))}
                      className={`field ${errors.cardNumber ? 'invalid' : ''}`}
                    />
                  </Field>
                </div>
                <Field label="Expiry" error={errors.expiry}>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(event) => update('expiry', formatExpiry(event.target.value))}
                    className={`field ${errors.expiry ? 'invalid' : ''}`}
                  />
                </Field>
                <Field label="Security code" error={errors.cvv}>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder={cardBrand(digitsOnly(form.cardNumber)) === 'American Express' ? '1234' : '123'}
                    value={form.cvv}
                    onChange={(event) => update('cvv', digitsOnly(event.target.value).slice(0, 4))}
                    className={`field ${errors.cvv ? 'invalid' : ''}`}
                  />
                </Field>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <ul className="space-y-3 rounded-[1.4rem] border border-sand bg-paper p-4">
              {lines.map((line) => (
                <li key={line.key} className="flex items-center gap-3">
                  <img src={line.product.image} alt="" className="h-16 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{line.product.name}</p>
                    <p className="text-xs text-ink/50">
                      {getSize(line.size).label} · Qty {line.qty}
                    </p>
                  </div>
                  <p className="text-sm">{money(line.line)}</p>
                </li>
              ))}
            </ul>
            <CartSummary
              action={
                <Button type="submit" className="w-full" disabled={placing}>
                  {placing ? 'Processing payment…' : `Pay ${money(totals.total)}`}
                </Button>
              }
            />
          </div>
        </form>
      </Container>
    </div>
  )
}
