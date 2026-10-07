const words = ['Roses', 'Lilies', 'Tulips', 'Sunflowers', 'Dahlias', 'Cosmos', 'Branches', 'Hand-tied', 'Same-day']

export function Marquee() {
  const loop = [...words, ...words]
  return (
    <div className="marquee w-full max-w-full overflow-hidden border-y border-sand bg-ink text-cream">
      <div className="marquee-track items-center gap-8 py-3">
        {loop.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-8 text-[11px] uppercase tracking-[0.32em]">
            {word}
            <span className="text-rose" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
