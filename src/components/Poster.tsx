const POSTERS = [
  { base: 'linear-gradient(135deg,#191712 0%,#0c0b09 100%)', glow: 'radial-gradient(60% 55% at 78% 18%, rgba(201,164,105,.16), transparent 70%)' },
  { base: 'linear-gradient(150deg,#11151200,#0b0d0c)', glow: 'radial-gradient(55% 60% at 22% 80%, rgba(126,148,128,.13), transparent 70%)' },
  { base: 'linear-gradient(120deg,#181210 0%,#0b0908 100%)', glow: 'radial-gradient(65% 50% at 70% 75%, rgba(196,116,86,.13), transparent 70%)' },
  { base: 'linear-gradient(140deg,#0f1318 0%,#090a0d 100%)', glow: 'radial-gradient(58% 52% at 30% 20%, rgba(122,146,176,.13), transparent 70%)' },
  { base: 'linear-gradient(125deg,#151218 0%,#0b0a0d 100%)', glow: 'radial-gradient(62% 55% at 75% 70%, rgba(158,132,170,.12), transparent 70%)' },
  { base: 'linear-gradient(145deg,#171511 0%,#0c0b09 100%)', glow: 'radial-gradient(56% 58% at 25% 25%, rgba(206,178,124,.15), transparent 70%)' },
]

interface PosterProps {
  /** Stable seed — usually the project index */
  seed: number
  label: string
}

/**
 * Locally-rendered cinematic poster art — used until a real Drive
 * thumbnail is configured. No network cost, always looks intentional.
 */
export function Poster({ seed, label }: PosterProps) {
  const p = POSTERS[seed % POSTERS.length]

  return (
    <span aria-hidden="true" className="absolute inset-0 block overflow-hidden">
      <span className="absolute inset-0 block transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]" style={{ background: p.base }} />
      <span className="absolute inset-0 block" style={{ background: p.glow }} />
      <span
        className="absolute inset-0 block"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
          mixBlendMode: 'overlay',
        }}
      />
      <span className="absolute -right-[4%] -bottom-[7vw] select-none font-serif text-[38%] italic leading-none text-[var(--color-bone)]/[0.07] lg:-bottom-[4.5rem]">
        {label}
      </span>
      <span className="label-xs absolute left-5 top-5 flex items-center gap-3 text-[var(--color-bone)/40]">
        <span className="h-px w-6 bg-accent/50" />
        {label}
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent" />
    </span>
  )
}
