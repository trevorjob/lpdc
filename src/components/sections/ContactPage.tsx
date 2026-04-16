'use client'

import { useState, useRef, type FormEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Mail, Phone } from 'lucide-react'
import { PageHero } from './PageHero'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const BUDGET_OPTIONS = [
  { value: '',         label: 'Select your investment budget' },
  { value: 'sub-100',  label: 'Under £100,000'              },
  { value: '100-250',  label: '£100,000 to £250,000'        },
  { value: '250-500',  label: '£250,000 to £500,000'        },
  { value: '500plus',  label: '£500,000+'                   },
]

const NEXT_STEPS = [
  {
    number: '01',
    title:  'We review your details',
    body:   'Tell us about your investment goals. Our team is available 24/7 and will connect with you shortly.',
  },
  {
    number: '02',
    title:  'Initial call',
    body:   'We schedule a brief call to understand your goals, answer questions, and confirm whether there is a fit.',
  },
  {
    number: '03',
    title:  'Your tailored plan',
    body:   'If we are aligned, we put together a bespoke investment strategy and introduce you to live opportunities.',
  },
]

/* ── ContactPage ───────────────────────────────── */

export function ContactPage() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <>
      <PageHero
        sectionNumber="04"
        sectionLabel="Contact"
        headlineLines={['Register your', 'interest.']}
        description="Tell us about your investment goals and we will be in touch within 48 hours."
      />

      <FormSection shouldReduce={shouldReduce} />
    </>
  )
}

/* ── FormSection ───────────────────────────────── */

function FormSection({ shouldReduce }: { shouldReduce: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })

  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-[1280px] px-6 lg:px-16"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[42%_1fr] lg:gap-24">

          {/* Left: what to expect */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <p className="mb-5 font-body text-xs font-medium tracking-[0.2em] uppercase text-sage-500">
              What happens next
            </p>

            <h2
              className="mb-8 font-display font-light leading-tight tracking-tight text-neutral-800"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
            >
              {['Simple process,', 'clear next steps.'].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={shouldReduce ? false : { y: '110%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE_EXPO }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Gold rule */}
            <motion.div
              aria-hidden
              className="mb-10 h-px origin-left bg-gold-400"
              style={{ width: '3rem' }}
              initial={shouldReduce ? false : { scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_EXPO }}
            />

            {/* Steps */}
            <div className="space-y-8">
              {NEXT_STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="flex gap-5"
                  initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: EASE_SMOOTH }}
                >
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-3xl font-light leading-none text-neutral-200"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-body text-sm font-medium text-neutral-800">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-neutral-500">
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact details */}
            <motion.div
              className="mt-12 border-t border-neutral-200 pt-10 space-y-4"
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE_SMOOTH }}
            >
              <a
                href="mailto:hello@lpdc.com"
                className="flex items-center gap-3 font-body text-sm text-neutral-600 transition-colors duration-200 hover:text-sage-600"
              >
                <Mail className="h-4 w-4 shrink-0 text-sage-500" />
                hello@lpdc.estate
              </a>
              <a
                href="tel:+441322643289"
                className="flex items-center gap-3 font-body text-sm text-neutral-600 transition-colors duration-200 hover:text-sage-600"
              >
                <Phone className="h-4 w-4 shrink-0 text-sage-500" />
                +44 (0)1322 643289
              </a>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}
          >
            <ContactForm shouldReduce={shouldReduce} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── ContactForm ───────────────────────────────── */

function ContactForm({ shouldReduce }: { shouldReduce: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const [fields, setFields] = useState({
    name:    '',
    email:   '',
    phone:   '',
    budget:  '',
    message: '',
    existing: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Submission failed.')
      }
      setSubmitted(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return <SuccessState shouldReduce={shouldReduce} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 bg-white p-8 lg:p-10"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className={inputCls}
          />
        </Field>

        <Field label="Email Address" required>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            className={inputCls}
          />
        </Field>
      </div>

      {/* Phone + Budget */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Phone Number">
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            placeholder="+44 7700 000000"
            className={inputCls}
          />
        </Field>

        <Field label="Investment Budget" required>
          <select
            name="budget"
            value={fields.budget}
            onChange={handleChange}
            required
            className={`${inputCls} cursor-pointer`}
          >
            {BUDGET_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Existing investor */}
      <Field label="Do you currently hold UK property investments?">
        <div className="flex gap-6 pt-1">
          {['Yes', 'No'].map(val => (
            <label
              key={val}
              className="flex cursor-pointer items-center gap-2.5 font-body text-sm text-neutral-700"
            >
              <input
                type="radio"
                name="existing"
                value={val.toLowerCase()}
                checked={fields.existing === val.toLowerCase()}
                onChange={handleChange}
                className="accent-sage-500"
              />
              {val}
            </label>
          ))}
        </div>
      </Field>

      {/* Message */}
      <Field label="Tell us about your goals">
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          rows={4}
          placeholder="What are you hoping to achieve? Any properties or regions in mind?"
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2.5 bg-sage-500 px-8 py-4 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-600 hover:shadow-[0_8px_24px_rgba(78,112,80,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span
              className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              aria-hidden
            />
            Sending...
          </span>
        ) : (
          <>
            Register Your Interest
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="font-body text-xs text-neutral-400">
        We will never share your details with third parties.
      </p>
    </form>
  )
}

/* ── SuccessState ──────────────────────────────── */

function SuccessState({ shouldReduce }: { shouldReduce: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-start bg-white p-8 lg:p-10"
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center bg-sage-500/10">
        <CheckCircle2 className="h-6 w-6 text-sage-500" />
      </div>

      <div aria-hidden className="mb-6 h-px w-10 bg-gold-400" />

      <h3 className="mb-3 font-display text-2xl font-light text-neutral-800 lg:text-3xl">
        We have received your details.
      </h3>
      <p className="mb-8 max-w-[40ch] font-body text-sm leading-relaxed text-neutral-600">
        A member of the Luli Properties team will be in touch soon to discuss your investment goals.
      </p>

      <p className="font-body text-xs text-neutral-400">
        In the meantime, browse our current portfolio.
      </p>
      <a
        href="/portfolio"
        className="group mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-sage-600 transition-colors duration-200 hover:text-sage-700"
      >
        View properties
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  )
}

/* ── helpers ───────────────────────────────────── */

const inputCls =
  'w-full border border-neutral-300 bg-white px-4 py-3 font-body text-sm text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 hover:border-neutral-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/30'

function Field({
  label,
  required,
  children,
}: {
  label:     string
  required?: boolean
  children:  React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 block font-body text-xs font-medium tracking-wide text-neutral-600">
        {label}
        {required && <span className="ml-1 text-gold-400">*</span>}
      </label>
      {children}
    </div>
  )
}
