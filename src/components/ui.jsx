import { Link } from 'react-router-dom'
import { Minus, Plus, Star } from 'lucide-react'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 lg:px-8 ${className}`}>{children}</div>
}

const buttonStyles = {
  primary: 'bg-ink text-cream hover:-translate-y-0.5 hover:bg-rose hover:shadow-soft',
  secondary: 'border border-ink/15 bg-paper text-ink hover:-translate-y-0.5 hover:border-rose hover:text-rose',
  ink: 'bg-rose text-white hover:-translate-y-0.5 hover:bg-rose-deep hover:shadow-soft',
  ghost: 'bg-transparent text-ink hover:bg-blush',
}

export function Button({
  to,
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide transition duration-300 ease-out disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 ${buttonStyles[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  )
}

export function Logo({ className = '', light = false }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-md font-serif text-lg transition duration-300 group-hover:rotate-6 ${light ? 'bg-cream text-ink' : 'bg-ink text-cream'}`}>
        L
      </span>
      <span className={`font-serif text-lg tracking-[0.14em] sm:text-[1.35rem] sm:tracking-[0.22em] ${light ? 'text-cream' : 'text-ink'}`}>
        LUNARIA
      </span>
    </Link>
  )
}

export function Rating({ value, count, className = '', light = false }) {
  const full = Math.round(value)
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={14}
            className={index < full ? 'fill-gold text-gold' : light ? 'fill-transparent text-cream/30' : 'fill-transparent text-sand'}
          />
        ))}
      </span>
      <span className={`text-xs ${light ? 'text-cream/70' : 'text-ink/60'}`}>
        <span className="sr-only">Rated {value.toFixed(1)} out of 5.</span>
        {value.toFixed(1)}
        {count != null && <span> ({count})</span>}
      </span>
    </div>
  )
}

export function QuantityControl({ value, onChange, min = 1, max = 12 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-sand bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:text-rose"
      >
        <Minus size={14} />
      </button>
      <span className="w-6 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:text-rose"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-rose">{error}</span>}
    </label>
  )
}

export function PageHeader({ eyebrow, title, text }) {
  return (
    <div className="border-b border-sand/80 bg-blush/50">
      <Container className="py-10 md:py-14">
        {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-rose">{eyebrow}</p>}
        <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-ink md:text-6xl">{title}</h1>
        <span className="mt-4 block h-px w-16 bg-rose" />
        {text && <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">{text}</p>}
      </Container>
    </div>
  )
}
