import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useShop } from '../hooks/useShop'
import { usePageTitle } from '../hooks/usePageTitle'
import { AuthShell } from '../components/AuthShell'
import { Button, Field } from '../components/ui'

export function Login() {
  usePageTitle('Sign in')
  const { login, user } = useShop()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const requested = params.get('next') || '/'
  const next = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  if (user) return <Navigate to={next} replace />

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    if (!form.email.includes('@') || form.password.length < 6) {
      setError('Enter a valid email and a password of at least 6 characters.')
      return
    }
    const result = login(form.email, form.password)
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate(next)
  }

  return (
    <AuthShell image="/flowers/p-crimson.jpg" caption="Welcome back to Lunaria.">
      <p className="text-[11px] uppercase tracking-[0.28em] text-rose">Account</p>
      <h1 className="mt-2 font-serif text-5xl">Sign in</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">
        This is a front-end demo. Nothing is sent to a server. Try{' '}
        <span className="text-ink">Mounika Vaka</span> · <span className="text-ink">mounika.vaka@lunaria.studio</span> / <span className="text-ink">luna123</span>.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="Email">
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className="field"
            required
          />
        </Field>
        <Field label="Password">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => update('password', event.target.value)}
              className="field pr-16"
              required
            />
            <button
              type="button"
              onClick={() => setShow((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/50"
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </Field>
        {error && <p className="text-sm text-rose">{error}</p>}
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-sm text-ink/65">
        New here?{' '}
        <Link to={`/signup?next=${encodeURIComponent(next)}`} className="text-rose underline-offset-2 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}
