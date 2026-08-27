import { motion } from 'framer-motion'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { siteConfig } from '../config/site'
import { cn } from '../lib/utils'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface Values {
  name: string
  phone: string
  email: string
  project: string
  message: string
  method: string
}

type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { name: '', phone: '', email: '', project: '', message: '', method: '' }

const METHODS = ['Call', 'WhatsApp', 'Email'] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s().-]{6,18}$/

function validate(v: Values): Errors {
  const errors: Errors = {}
  if (!v.name.trim()) errors.name = 'Please enter your name.'
  if (!v.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!PHONE_RE.test(v.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!v.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) errors.message = 'Tell me a little about the project.'
  return errors
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label-xs mb-1 block text-[var(--color-muted)]">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const honeypot = useRef<HTMLInputElement>(null)
  const lastSubmit = useRef(0)

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((errs) => ({ ...errs, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    // Silently accept bot submissions via the hidden honeypot field.
    if (honeypot.current?.value) {
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Guard against rapid duplicate submissions.
    if (Date.now() - lastSubmit.current < 4000) return
    lastSubmit.current = Date.now()

    setStatus('sending')
    try {
      if (!siteConfig.formsEndpoint) throw new Error('Form endpoint is not configured.')

      const data = new FormData()
      data.append('name', values.name.trim())
      data.append('phone', values.phone.trim())
      data.append('email', values.email.trim())
      data.append('project', values.project.trim())
      data.append('message', values.message.trim())
      data.append('preferredContact', values.method)
      data.append('submittedAt', new Date().toISOString())

      const res = await fetch(siteConfig.formsEndpoint, { method: 'POST', body: data })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border border-[var(--color-line)] p-10 text-center md:p-14"
        role="status"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-accent text-accent">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="serif-it mt-7 text-3xl text-[var(--color-bone)] md:text-4xl">Thank you!</h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
          Your request has been received. I’ll get back to you shortly.
        </p>
        <button type="button" onClick={reset} className="btn-ghost mt-9 px-5! py-2.5!">
          Send another enquiry
        </button>
      </motion.div>
    )
  }

  const busy = status === 'sending'
  const describedBy = (key: keyof Values) => (errors[key] ? `${key}-error` : undefined)

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9">
      {/* Honeypot — invisible to humans */}
      <input
        ref={honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
        <Field label="Name *" htmlFor="cf-name" error={errors.name}>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className="field"
          />
        </Field>

        <Field label="Phone Number *" htmlFor="cf-phone" error={errors.phone}>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            value={values.phone}
            onChange={set('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            className="field"
          />
        </Field>
      </div>

      <Field label="Email *" htmlFor="cf-email" error={errors.email}>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={set('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy('email')}
          className="field"
        />
      </Field>

      <Field label="Project / Requirement" htmlFor="cf-project">
        <input
          id="cf-project"
          type="text"
          placeholder="What are we creating?"
          value={values.project}
          onChange={set('project')}
          className="field"
        />
      </Field>

      <Field label="Message *" htmlFor="cf-message" error={errors.message}>
        <textarea
          id="cf-message"
          rows={4}
          placeholder="Tell me about the story, the timeline, and anything else that matters."
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className="field resize-none"
        />
      </Field>

      <fieldset>
        <legend className="label-xs mb-3 text-[var(--color-muted)]">Preferred contact method</legend>
        <div className="flex flex-wrap gap-3">
          {METHODS.map((method) => (
            <label key={method} data-cursor="open" className="cursor-pointer">
              <input
                type="radio"
                name="preferred-contact"
                value={method}
                checked={values.method === method}
                onChange={() => setValues((v) => ({ ...v, method }))}
                className="peer sr-only"
              />
              <span
                className={cn(
                  'inline-block rounded-full border border-[var(--color-line)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors duration-300',
                  'peer-checked:border-[var(--color-bone)] peer-checked:bg-[var(--color-bone)] peer-checked:text-[var(--color-bg)]',
                  'hover:border-[var(--color-muted)] peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2',
                )}
              >
                {method}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2.5 text-sm leading-relaxed text-error">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Something went wrong. Please try again or{' '}
            <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
              contact me directly
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        data-cursor="open"
        className="btn-solid w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto sm:min-w-56"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>
    </form>
  )
}
