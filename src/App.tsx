import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
import { Intro } from './sections/Intro'
import { Showcase } from './sections/Showcase'
import { Craft } from './sections/Craft'
import { About } from './sections/About'
import { Contact } from './sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative min-h-screen bg-bg text-fg bg-pattern">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-[var(--color-bone)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-bg)]"
      >
        Skip to content
      </a>

      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Navbar />

      <main id="main">
        <Hero active={loaded} />
        <Intro />
        <Showcase />
        <Craft />
        <About />
        <Contact />
      </main>

      <Footer />

      <div className="grain" aria-hidden="true" />
    </div>
  )
}
