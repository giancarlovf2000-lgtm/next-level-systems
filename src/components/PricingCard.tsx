'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/types'

interface PricingCardProps {
  tier: PricingTier
  isCurrentPlan?: boolean
  userId?: string
  userEmail?: string
}

export function PricingCard({ tier, isCurrentPlan, userId, userEmail }: PricingCardProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!userId || !userEmail) {
      window.location.href = '/auth/signup'
      return
    }

    if (tier.id === 'free') return

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: tier.id,
          userId,
          userEmail,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl border transition-all duration-300 overflow-hidden',
        tier.highlighted
          ? 'border-primary bg-gradient-to-b from-primary/10 to-surface shadow-glow-md scale-105'
          : 'border-border bg-surface hover:border-border-light',
        'hover:-translate-y-1 hover:shadow-card-hover'
      )}
    >
      {/* Popular badge */}
      {tier.highlighted && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-1.5 bg-primary px-4 py-1 text-xs font-semibold text-white rounded-b-lg">
            <Zap className="w-3 h-3" fill="white" />
            Most Popular
          </div>
        </div>
      )}

      <div className={cn('p-8', tier.highlighted && 'pt-10')}>
        {/* Plan name & price */}
        <div className="mb-6">
          <h3
            className={cn(
              'text-lg font-bold mb-1',
              tier.highlighted ? 'text-primary' : 'text-text-primary'
            )}
          >
            {tier.name}
          </h3>
          <p className="text-sm text-text-muted mb-4">{tier.description}</p>

          <div className="flex items-end gap-1">
            {tier.price === 0 ? (
              <span className="text-4xl font-black text-text-primary">Free</span>
            ) : (
              <>
                <span className="text-2xl font-bold text-text-secondary mt-2">$</span>
                <span className="text-5xl font-black text-text-primary">{tier.price}</span>
                <span className="text-text-muted mb-1">/mo</span>
              </>
            )}
          </div>
        </div>

        {/* Features list */}
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                  tier.highlighted ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'
                )}
              >
                <Check className="w-3 h-3" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {isCurrentPlan ? (
          <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-success/10 text-success border border-success/30">
            <Check className="w-4 h-4" />
            Current Plan
          </div>
        ) : tier.id === 'free' ? (
          <Link
            href="/auth/signup"
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
              'bg-surface-2 text-text-primary border border-border hover:border-primary/40 hover:bg-primary/10 hover:text-primary'
            )}
          >
            {tier.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : tier.id === 'agency' ? (
          <a
            href="mailto:hello@nextlevelsystems.io"
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
              'bg-surface-2 text-text-primary border border-border hover:border-primary/40 hover:bg-primary/10 hover:text-primary'
            )}
          >
            {tier.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
              tier.highlighted
                ? 'btn-primary text-white shadow-glow-sm hover:shadow-glow-md'
                : 'bg-surface-2 text-text-primary border border-border hover:border-primary/40 hover:bg-primary/10 hover:text-primary',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
