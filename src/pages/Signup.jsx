import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { AuthShell } from '../components/AuthShell'
import { Button, Field } from '../components/ui'

const empty = { name: '', email: '', password: '', confirm: '' }

export function Signup() {
  usePageTitle('Create account')
  const { signup, user } = useShop()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const requested = params.get('next') || '/'
  const next = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/'
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  if (user) return <Navigate to={next} replace />

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    if (form.name.trim().length < 2) {
      setError('Please add your name.')
      return
    }
    if (!form.email.includes('@')) {
      setError('Enter a valid email.')
      return
    }
    if (form.password.length < 6) {
      setError('Use at least 6 characters for the password.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Those passwords do not match.')
      return
    }
    const result = signup(form)
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate(next)
  }

  return (
    <AuthShell image="/flowers/p-peony.jpg" caption="A small account, for repeat orders.">
      <p className="text-[11px] uppercase tracking-[0.28em] text-rose">Account</p>
      <h1 className="mt-2 font-serif text-5xl">Create an account</h1>
      <p className="mt-3 text-sm text-ink/65">Saved on this device only, so you can practice checkout.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="Name">
          <input value={form.name} onChange={(event) => update('name', event.target.value)} className="field" required />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className="field" required />
        </Field>
        <Field label="Password">
          <input type="password" value={form.password} onChange={(event) => update('password', event.target.value)} className="field" required />
        </Field>
        <Field label="Confirm password">
          <input type="password" value={form.confirm} onChange={(event) => update('confirm', event.target.value)} className="field" required />
        </Field>
        {error && <p className="text-sm text-rose">{error}</p>}
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-sm text-ink/65">
        Already have one?{' '}
        <Link to={`/login?next=${encodeURIComponent(next)}`} className="text-rose underline-offset-2 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}
