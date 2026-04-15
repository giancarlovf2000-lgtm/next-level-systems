'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Check, Sparkles, Layers, Package, AlertCircle,
  MessageSquare, Target, Globe, Radio, Lock, ChevronRight,
  Zap, Users, Bot
} from 'lucide-react'
import {
  SAMPLE_PROJECTS, SITEFORGE_ID, MERGEABLE_IDS, STANDALONE_ONLY_IDS,
  SITEFORGE_BASE_PRICE, SITEFORGE_INCLUDED_PAGES, SITEFORGE_EXTRA_PAGE_PRICE,
} from '@/lib/types'
import { cn } from '@/lib/utils'

// ─── Merge integration details ───────────────────────────────────────────────
const MERGE_DETAILS: Record<string, {
  icon: React.ElementType
  color: string
  bg: string
  title: string
  subtitle: string
  capabilities: string[]
  example: string
}> = {
  '4': { // Synapse
    icon: MessageSquare,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
    title: 'Synapse embedded in SiteForge',
    subtitle: 'Internal team layer inside your website dashboard',
    capabilities: [
      'Real-time team chat widget inside your SiteForge admin panel',
      'Comment threads attached to specific pages or sections of your site',
      'Notify teammates instantly when a lead fills out a contact form',
      'Assign tasks to team members directly from the website editor',
    ],
    example: 'Example: A visitor submits a quote request → Synapse instantly pings your sales team in the site dashboard → team member claims the lead and responds — all without leaving SiteForge.',
  },
  '5': { // Data Nest
    icon: Target,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    title: 'Data Nest embedded in SiteForge',
    subtitle: 'Your CRM lives inside your website, not beside it',
    capabilities: [
      'Every contact form submission automatically creates a CRM lead in Data Nest',
      'Visual pipeline view accessible directly from your SiteForge dashboard',
      'Lead source tracking — know which page or campaign generated each contact',
      'Auto-tag leads by the service page they visited before submitting',
    ],
    example: 'Example: A visitor lands on your "Services" page, fills out a form → Data Nest creates a tagged lead, scores it based on the page visited, and drops it into the correct pipeline stage — zero manual entry.',
  },
  '6': { // OutreachIQ
    icon: Radio,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
    title: 'OutreachIQ embedded in SiteForge',
    subtitle: 'Trigger campaigns from website actions',
    capabilities: [
      'Send automated welcome emails the moment someone submits a form on your site',
      'Trigger SMS follow-ups based on which page a visitor spent the most time on',
      'Build re-engagement campaigns for visitors who didn\'t convert',
      'Schedule newsletters and announcements from your SiteForge content calendar',
    ],
    example: 'Example: A visitor views your pricing page 3 times without converting → OutreachIQ auto-sends a personalized "Still thinking about it?" email with a limited discount — triggered by SiteForge behavior data.',
  },
  '7': { // Prospex
    icon: Zap,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    title: 'Prospex embedded in SiteForge',
    subtitle: 'Prospect research powered by your website analytics',
    capabilities: [
      'Run competitor domain searches directly from your SiteForge admin',
      'Automatically push verified prospect emails into Data Nest as new leads',
      'See which competitor sites your current visitors also visited (referral data)',
      'Launch OutreachIQ campaigns to prospect lists without switching platforms',
    ],
    example: 'Example: You notice traffic from a competitor\'s audience in SiteForge analytics → Prospex finds verified contacts from that audience → they\'re auto-added to Data Nest → OutreachIQ fires a targeted campaign. One unified flow.',
  },
}

// ─── Standalone-only tools info ───────────────────────────────────────────────
const STANDALONE_DETAILS: Record<string, { icon: React.ElementType; color: string; reason: string }> = {
  '1': { icon: Bot, color: 'text-violet-400', reason: 'Brandify is a dedicated AI content studio. It operates independently with its own workspace, asset library, and publishing integrations — it isn\'t embedded into website infrastructure.' },
  '2': { icon: Users, color: 'text-rose-400', reason: 'AtlasVitae is an HR & payroll platform with compliance requirements. It maintains its own secure environment, employee data, and reporting pipelines separate from your public website.' },
}

// ─── Main checkout content ─────────────────────────────────────────────────
function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [deliveryMode, setDeliveryMode] = useState<'standalone' | 'merged' | null>(null)
  const [extraPages, setExtraPages] = useState(0)

  const ids = searchParams.get('ids')?.split(',').filter(Boolean) ?? []
  const selected = SAMPLE_PROJECTS.filter((p) => ids.includes(p.id))

  if (selected.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-12 h-12 text-text-muted mb-4" />
        <h2 className="text-2xl font-bold text-text-primary mb-2">No tools selected</h2>
        <p className="text-text-muted mb-6">Go back and pick the tools you want.</p>
        <Link href="/projects" className="flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-semibold">
          <ArrowLeft className="w-4 h-4" /> Browse Tools
        </Link>
      </div>
    )
  }

  const siteForgeInCart = ids.includes(SITEFORGE_ID)
  const siteForgeLineTotal = siteForgeInCart
    ? SITEFORGE_BASE_PRICE + extraPages * SITEFORGE_EXTRA_PAGE_PRICE
    : 0
  const total = selected.reduce((sum, p) => {
    if (p.id === SITEFORGE_ID) return sum + siteForgeLineTotal
    return sum + (p.price ?? 0)
  }, 0)

  // Merge eligibility
  const hasSiteForge = ids.includes(SITEFORGE_ID)
  const mergeableSelected = selected.filter((p) => MERGEABLE_IDS.includes(p.id))
  const standaloneOnlySelected = selected.filter((p) => STANDALONE_ONLY_IDS.includes(p.id))
  const canMerge = hasSiteForge && mergeableSelected.length > 0

  const handleProceed = () => {
    // In a real flow this would create a Stripe checkout session
    // For now route to /pricing as placeholder
    router.push('/pricing')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to tools
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-text-primary mb-2">
            Your <span className="gradient-text">Order Summary</span>
          </h1>
          <p className="text-text-secondary">Review your selection, then choose how you want your tools delivered.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: summary ── */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Selected Tools</h2>
              <div className="space-y-4">
                {selected.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-text-primary">{p.name}</div>
                        <div className="text-xs text-text-muted">{p.category}</div>
                      </div>
                      <div className="text-sm font-bold text-text-primary flex-shrink-0">
                        {p.id === SITEFORGE_ID
                          ? <>${siteForgeLineTotal}<span className="text-xs font-normal text-text-muted">/site</span></>
                          : <>${p.price}<span className="text-xs font-normal text-text-muted">/mo</span></>
                        }
                      </div>
                    </div>

                    {/* SiteForge page stepper */}
                    {p.id === SITEFORGE_ID && (
                      <div className="mt-2 rounded-xl border border-border bg-surface-2 p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span>Base: {SITEFORGE_INCLUDED_PAGES} pages included</span>
                          <span className="text-text-primary font-semibold">${SITEFORGE_BASE_PRICE}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-text-muted">Extra pages (+${SITEFORGE_EXTRA_PAGE_PRICE}/page)</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setExtraPages(Math.max(0, extraPages - 1))}
                              className="w-7 h-7 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/40 transition-all text-lg leading-none"
                            >−</button>
                            <span className="w-6 text-center text-sm font-bold text-text-primary">{extraPages}</span>
                            <button
                              onClick={() => setExtraPages(extraPages + 1)}
                              className="w-7 h-7 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/40 transition-all text-lg leading-none"
                            >+</button>
                          </div>
                        </div>
                        {extraPages > 0 && (
                          <div className="flex items-center justify-between text-xs border-t border-border pt-2">
                            <span className="text-text-muted">{SITEFORGE_INCLUDED_PAGES + extraPages} total pages</span>
                            <span className="text-text-primary font-semibold">${siteForgeLineTotal}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-text-secondary">Total / month</span>
                <span className="text-2xl font-black text-text-primary">${total}</span>
              </div>
              <p className="text-xs text-text-muted mt-3">
                Billed monthly. Cancel anytime. Access granted within 24h of payment.
              </p>
            </div>

            {/* Proceed button */}
            <button
              onClick={handleProceed}
              disabled={deliveryMode === null}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200',
                deliveryMode !== null
                  ? 'btn-primary text-white shadow-glow-sm hover:shadow-glow-md'
                  : 'bg-surface-2 text-text-muted border border-border cursor-not-allowed'
              )}
            >
              {deliveryMode === null ? (
                <><Lock className="w-4 h-4" /> Choose a delivery option first</>
              ) : (
                <>Proceed to Payment <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* ── RIGHT: delivery options ── */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-lg font-bold text-text-primary">
              How would you like your tools?
            </h2>

            {/* Option A — Standalone */}
            <button
              onClick={() => setDeliveryMode('standalone')}
              className={cn(
                'w-full text-left rounded-2xl border p-5 transition-all duration-200',
                deliveryMode === 'standalone'
                  ? 'border-primary bg-primary/5 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]'
                  : 'border-border bg-surface hover:border-border-light'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                  deliveryMode === 'standalone' ? 'bg-primary/20' : 'bg-surface-2'
                )}>
                  <Package className={cn('w-5 h-5', deliveryMode === 'standalone' ? 'text-primary' : 'text-text-muted')} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-text-primary">Use each tool separately</span>
                    {deliveryMode === 'standalone' && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">
                    Each tool runs in its own dedicated dashboard. You log in to each platform independently.
                    Best if you want to keep your workflows separate or are only subscribing to one tool.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selected.map((p) => (
                      <span key={p.id} className="text-xs px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-text-secondary">
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>

            {/* Option B — Merged into SiteForge */}
            <button
              onClick={() => canMerge && setDeliveryMode('merged')}
              disabled={!canMerge}
              className={cn(
                'w-full text-left rounded-2xl border p-5 transition-all duration-200',
                !canMerge && 'opacity-60 cursor-not-allowed',
                canMerge && deliveryMode === 'merged'
                  ? 'border-primary bg-primary/5 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]'
                  : canMerge
                  ? 'border-border bg-surface hover:border-border-light'
                  : 'border-border bg-surface'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                  deliveryMode === 'merged' ? 'bg-primary/20' : 'bg-surface-2'
                )}>
                  <Layers className={cn('w-5 h-5', deliveryMode === 'merged' ? 'text-primary' : 'text-text-muted')} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-text-primary">Merge into SiteForge</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> Unified Experience
                    </span>
                    {deliveryMode === 'merged' && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>

                  {!canMerge && !hasSiteForge && (
                    <p className="text-sm text-warning flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Add <strong>SiteForge</strong> to your selection to enable merging.
                    </p>
                  )}
                  {!canMerge && hasSiteForge && mergeableSelected.length === 0 && (
                    <p className="text-sm text-warning flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Select at least one compatible tool (Synapse, Data Nest, OutreachIQ, or Prospex) to enable merging.
                    </p>
                  )}

                  {canMerge && (
                    <p className="text-sm text-text-secondary">
                      Run your compatible tools directly inside your SiteForge website dashboard — one login, one workspace.
                    </p>
                  )}
                </div>
              </div>
            </button>

            {/* ── Merge detail panels (only when merged mode selected) ── */}
            {deliveryMode === 'merged' && canMerge && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <Globe className="w-4 h-4 text-blue-400" />
                  SiteForge — your unified base
                </div>

                {/* Mergeable tools */}
                {mergeableSelected.map((p) => {
                  const detail = MERGE_DETAILS[p.id]
                  if (!detail) return null
                  const Icon = detail.icon
                  return (
                    <div key={p.id} className={cn('rounded-2xl border p-5', detail.bg)}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', detail.bg)}>
                          <Icon className={cn('w-4 h-4', detail.color)} />
                        </div>
                        <div>
                          <div className="font-bold text-text-primary text-sm">{detail.title}</div>
                          <div className="text-xs text-text-muted">{detail.subtitle}</div>
                        </div>
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {detail.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-text-secondary">
                            <Check className={cn('w-3.5 h-3.5 flex-shrink-0 mt-0.5', detail.color)} />
                            {cap}
                          </li>
                        ))}
                      </ul>
                      <div className={cn('rounded-xl p-3 text-xs text-text-muted border', detail.bg)}>
                        <span className={cn('font-semibold', detail.color)}>Use case → </span>
                        {detail.example}
                      </div>
                    </div>
                  )
                })}

                {/* Standalone-only tools (Brandify, AtlasVitae) shown as separate */}
                {standaloneOnlySelected.length > 0 && (
                  <div className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-text-muted" />
                      <span className="text-sm font-semibold text-text-primary">Remains standalone</span>
                    </div>
                    <p className="text-xs text-text-muted mb-4">
                      These tools serve a fundamentally different function and cannot be embedded into a website dashboard. They will be provisioned as independent platforms.
                    </p>
                    <div className="space-y-3">
                      {standaloneOnlySelected.map((p) => {
                        const detail = STANDALONE_DETAILS[p.id]
                        if (!detail) return null
                        const Icon = detail.icon
                        return (
                          <div key={p.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
                              <Icon className={cn('w-4 h-4', detail.color)} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-text-primary">{p.name}</div>
                              <div className="text-xs text-text-muted leading-relaxed">{detail.reason}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
