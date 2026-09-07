import { FadeIn, WordReveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Intro() {
  return (
    <section aria-label="Introduction" className="shell scroll-mt-24 py-28 md:py-44">
      <SectionLabel index="01" title="Introduction" />

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12">
        <h2 className="col-span-12 lg:col-span-10">
          <WordReveal
            as="span"
            text="Momento"
            className="block text-[clamp(2.5rem,6.4vw,6rem)] font-medium uppercase leading-[1.02] tracking-tight text-[var(--color-bone)]"
            stagger={0.07}
          />
          <WordReveal
            as="span"
            text="Moments, Made in Minutes."
            delay={0.25}
            className="serif-it mt-2 block text-[clamp(2.3rem,5.8vw,5.4rem)] leading-[1.05] text-brass"
            stagger={0.06}
          />
        </h2>

        <FadeIn
          className="col-span-12 sm:col-span-9 lg:col-span-5 lg:col-start-8"
          delay={0.15}
        >
          <div className="space-y-5 text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
            <p>
              Momento is a Hyderabad-based instant reel and iPhone videography
              service creating real-time content for weddings, events,
              celebrations, birthdays, engagements, cafés, restaurants,
              brands and special moments.
            </p>

            <p>
              We shoot on iPhone, edit your reel on the spot and deliver
              ready-to-share content the same day — so you can relive and
              share your wedding, event or celebration while the moment is
              still happening.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}