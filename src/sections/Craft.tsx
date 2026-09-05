import { Fragment } from 'react'
import { FadeIn, WordReveal } from '../components/Reveal'

const STATEMENTS = [
  { word: 'We capture', note: 'Shot on iPhone, right as the moment happens.' },
  { word: 'We edit', note: 'Edited right there, while it’s still happening.' },
  { word: 'We deliver ', note: 'Your reel, ready while the celebration is still going.' },
]

const TERMS = ['Shot on iPhone', 'Real', 'Raw', 'Right Now']

function MarqueeStrip() {
  const row = TERMS.map((t) => `${t}   ◆   `).join('')
  return (
    <div className="overflow-hidden border-y border-[var(--color-line)] py-5" aria-hidden="true">
      <div className="marquee-track flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <span key={copy} className="label-xs pr-4 text-[var(--color-muted)]">
            {row.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Craft() {
  return (
    <section aria-label="What Momento does">
      <MarqueeStrip />

      <div className="shell py-28 md:py-40">
        <div>
          {STATEMENTS.map((item, i) => (
            <Fragment key={item.word}>
              <div
                className={
                  i % 2 === 0
                    ? 'flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between md:py-10'
                    : 'flex flex-col items-end gap-4 py-8 text-right md:flex-row-reverse md:justify-start md:gap-x-[8vw] md:py-10 md:text-left'
                }
              >
                <WordReveal
                  as="h3"
                  text={item.word}
                  stagger={0.05}
                  className="text-[clamp(3.2rem,9.5vw,9rem)] font-semibold uppercase leading-[0.95] tracking-tight text-[var(--color-bone)]"
                />

                <FadeIn delay={0.15}>
                  <p
                    className={`max-w-xs text-lg leading-relaxed text-[var(--color-muted)] ${
                      i % 2 === 0 ? '' : 'md:order-first'
                    }`}
                  >
                    {item.note}
                  </p>
                </FadeIn>
              </div>

              {i < STATEMENTS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="h-px bg-[var(--color-line)]"
                />
              )}
            </Fragment>
          ))}
        </div>

        <FadeIn className="mx-auto mt-20 max-w-2xl text-center md:mt-28">
          <p className="text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
  Shot on iPhone, edited right there, and delivered while the celebration is still going. No waiting days to relive it.
</p>
        </FadeIn>
      </div>
    </section>
  )
}