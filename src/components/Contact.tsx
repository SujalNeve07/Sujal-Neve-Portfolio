import { useState, useRef, useEffect, type FormEvent } from 'react'
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  MessageSquare,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { VERIFIED_PROFILE } from '@/data/verifiedData'
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '@/components/icons'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: '',
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [clientErrors, setClientErrors] = useState<{ [K in keyof FormState]?: string }>({})

  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(VERIFIED_PROFILE.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {
      setCopiedEmail(false)
    }
  }

  const validate = (): boolean => {
    const errors: { [K in keyof FormState]?: string } = {}

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.'
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name must not exceed 100 characters.'
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.'
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject.'
    } else if (formData.subject.trim().length > 150) {
      errors.subject = 'Subject must not exceed 150 characters.'
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide message details.'
    } else if (formData.message.trim().length > 5000) {
      errors.message = 'Message must not exceed 5000 characters.'
    }

    setClientErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate() || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus('idle')
    setStatusMessage('')

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.success) {
        setSubmissionStatus('success')
        setStatusMessage(
          data?.message ||
            'Thank you for reaching out! Your message was delivered directly to Sujal Neve.'
        )
        setFormData(INITIAL_FORM)
        setClientErrors({})
      } else {
        setSubmissionStatus('error')
        setStatusMessage(
          data?.message ||
            'Unable to transmit message. Please contact sujal.neve07@gmail.com directly.'
        )
      }
    } catch {
      setSubmissionStatus('error')
      setStatusMessage(
        'Backend connection timed out. Please ensure the backend server is active or reach out directly at sujal.neve07@gmail.com.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetForm = () => {
    setSubmissionStatus('idle')
    setStatusMessage('')
    setFormData(INITIAL_FORM)
    setClientErrors({})
  }

  return (
    <section
      ref={containerRef}
      id="contact"
      aria-label="Contact Section"
      className="w-full bg-canvas border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header - No numbered labels */}
        <div ref={headerRef} className="space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <MessageSquare className="w-4 h-4 text-accent-green" />
            <span>Contact</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Let's Build Something <span className="text-accent-green">Resilient</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Open to full-time engineering roles, backend systems development, and technical discussions.
            Send an inquiry below or reach out directly across verified channels.
          </p>
        </div>

        {/* 2-Column Grid: Direct Channels & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-accent-green font-bold uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent-green" />
                  <span>DIRECT EMAIL</span>
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent-lime-badge text-accent-lime-badge-text font-semibold">
                  Primary
                </span>
              </div>

              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Prefer direct email correspondence? Drop a message directly to:
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <a
                  href={VERIFIED_PROFILE.links.email}
                  className="flex-1 px-4 py-3 rounded-xl bg-surface-2 border border-border-subtle hover:border-accent-green text-xs sm:text-sm font-mono text-text-primary hover:text-accent-green transition-colors truncate font-medium"
                >
                  {VERIFIED_PROFILE.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-medium text-xs font-sans font-semibold text-text-primary transition-all active:scale-95"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-accent-green" />
                      <span className="text-accent-green font-mono">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-text-muted" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Profiles */}
            <div className="p-7 sm:p-8 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card space-y-4">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider block font-semibold">
                Verified Profiles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={VERIFIED_PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle hover:border-accent-green transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <GithubIcon className="w-5 h-5 text-text-primary" />
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-green" />
                  </div>
                  <span className="text-xs font-sans font-semibold text-text-primary">GitHub</span>
                  <span className="text-[10px] font-mono text-text-muted">@SujalNeve07</span>
                </a>

                <a
                  href={VERIFIED_PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle hover:border-accent-green transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <LinkedinIcon className="w-5 h-5 text-accent-green" />
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-green" />
                  </div>
                  <span className="text-xs font-sans font-semibold text-text-primary">LinkedIn</span>
                  <span className="text-[10px] font-mono text-text-muted">sujal-neve-1784</span>
                </a>

                <a
                  href={VERIFIED_PROFILE.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle hover:border-accent-green transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <LeetcodeIcon className="w-5 h-5 text-amber-500" />
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-amber-500" />
                  </div>
                  <span className="text-xs font-sans font-semibold text-text-primary">LeetCode</span>
                  <span className="text-[10px] font-mono text-text-muted">@Sujal784</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-surface-1 border border-border-medium shadow-surface-card relative">
              {/* Success Status Banner */}
              {submissionStatus === 'success' && (
                <div className="p-5 rounded-2xl bg-surface-2 border border-accent-green/40 text-text-primary mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-sans font-semibold text-sm text-accent-green">
                        Message Delivered Successfully
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {statusMessage}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-1 hover:bg-accent-green hover:text-white border border-border-medium text-xs font-mono font-medium transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              )}

              {/* Error Status Banner */}
              {submissionStatus === 'error' && (
                <div className="p-5 rounded-2xl bg-surface-2 border border-rose-500/40 text-text-primary mb-6 space-y-2">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-sans font-semibold text-sm text-rose-600">
                        Transmission Notice
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {statusMessage}
                      </p>
                      <p className="text-[11px] font-mono text-text-muted pt-1">
                        Your draft below is preserved. You can also contact directly at{' '}
                        <a href={VERIFIED_PROFILE.links.email} className="underline text-accent-green font-semibold">
                          {VERIFIED_PROFILE.email}
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Anti-bot Honeypot Field */}
                <div aria-hidden="true" className="sr-only">
                  <label htmlFor="hp-field">Leave empty</label>
                  <input
                    id="hp-field"
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold"
                    >
                      Your Name <span className="text-accent-green">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (clientErrors.name) setClientErrors({ ...clientErrors, name: undefined })
                      }}
                      placeholder="e.g. Alex Mercer"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-2 border text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all ${
                        clientErrors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-border-medium focus:border-accent-green'
                      }`}
                    />
                    {clientErrors.name && (
                      <p className="text-[11px] font-mono text-rose-500">{clientErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold"
                    >
                      Your Email <span className="text-accent-green">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (clientErrors.email)
                          setClientErrors({ ...clientErrors, email: undefined })
                      }}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-2 border text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all ${
                        clientErrors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-border-medium focus:border-accent-green'
                      }`}
                    />
                    {clientErrors.email && (
                      <p className="text-[11px] font-mono text-rose-500">{clientErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold"
                  >
                    Subject <span className="text-accent-green">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    maxLength={150}
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value })
                      if (clientErrors.subject)
                        setClientErrors({ ...clientErrors, subject: undefined })
                    }}
                    placeholder="e.g. Software Engineering Opportunity"
                    className={`w-full px-4 py-3 rounded-xl bg-surface-2 border text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all ${
                      clientErrors.subject
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-border-medium focus:border-accent-green'
                    }`}
                  />
                  {clientErrors.subject && (
                    <p className="text-[11px] font-mono text-rose-500">{clientErrors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold"
                    >
                      Message Details <span className="text-accent-green">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-text-muted">
                      {formData.message.length} / 5000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    maxLength={5000}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (clientErrors.message)
                        setClientErrors({ ...clientErrors, message: undefined })
                    }}
                    placeholder="Outline your engineering project or opportunity details here..."
                    className={`w-full px-4 py-3 rounded-xl bg-surface-2 border text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all resize-y min-h-[130px] ${
                      clientErrors.message
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-border-medium focus:border-accent-green'
                    }`}
                  />
                  {clientErrors.message && (
                    <p className="text-[11px] font-mono text-rose-500">{clientErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-sans font-semibold text-sm bg-accent-green hover:bg-accent-green-hover text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Transmit Enquiry</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
