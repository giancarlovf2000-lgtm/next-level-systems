import { Check, X, Zap } from 'lucide-react'
import { PricingCard } from '@/components/PricingCard'
import { PRICING_TIERS } from '@/lib/types'

const featureComparison = [
  {
    category: 'Access & Tools',
    features: [
      { name: 'Free tools (SEO Toolkit)', starter: true, pro: true, agency: true },
      { name: 'AI Content Generator', starter: false, pro: true, agency: true },
      { name: 'Analytics Dashboard', starter: false, pro: true, agency: true },
      { name: 'API Gateway', starter: false, pro: true, agency: true },
      { name: 'Automation Hub', starter: false, pro: false, agency: true },
      { name: 'Email Campaigns', starter: false, pro: false, agency: true },
    ],
  },
  {
    category: 'Workspaces & Collaboration',
    features: [
      { name: 'Project workspaces', starter: '1', pro: 'Unlimited', agency: 'Unlimited' },
      { name: 'Team seats', starter: '1', pro: '3', agency: '10' },
      { name: 'White-label options', starter: false, pro: false, agency: true },
      { name: 'Custom domain', starter: false, pro: true, agency: true },
    ],
  },
  {
    category: 'Support & SLA',
    features: [
      { name: 'Community support', starter: true, pro: true, agency: true },
      { name: 'Priority email support', starter: false, pro: true, agency: true },
      { name: 'Dedicated account manager', starter: false, pro: false, agency: true },
      { name: 'Uptime SLA', starter: '99%', pro: '99.5%', agency: '99.9%' },
      { name: 'Custom integrations', starter: false, pro: false, agency: true },
    ],
  },
]

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-success mx-auto" strokeWidth={2.5} />
    ) : (
      <X className="w-5 h-5 text-text-muted/40 mx-auto" strokeWidth={2.5} />
    )
  }
  return <span className="text-sm text-text-secondary font-medium">{value}</span>
}

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" fill="currentColor" />
            Transparent Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary mb-4">
            Simple, honest{' '}
            <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Start free and scale as you grow. No hidden fees, no contracts, no surprises.
            Upgrade or downgrade at any time.
          </p>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
          Full feature comparison
        </h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 bg-surface border-b border-border">
            <div className="p-4 col-span-1">
              <span className="text-sm font-semibold text-text-muted">Feature</span>
            </div>
            {['Starter', 'Pro', 'Agency'].map((plan, i) => (
              <div key={plan} className={`p-4 text-center ${i === 1 ? 'bg-primary/5 border-x border-primary/20' : ''}`}>
                <span className={`text-sm font-bold ${i === 1 ? 'text-primary' : 'text-text-primary'}`}>
                  {plan}
                </span>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {featureComparison.map(({ category, features }) => (
            <div key={category}>
              {/* Category header */}
              <div className="px-4 py-3 bg-surface-2 border-b border-border">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                  {category}
                </span>
              </div>

              {/* Feature rows */}
              {features.map(({ name, starter, pro, agency }, idx) => (
                <div
                  key={name}
                  className={`grid grid-cols-4 border-b border-border last:border-0 ${
                    idx % 2 === 0 ? 'bg-surface' : 'bg-surface/50'
                  }`}
                >
                  <div className="p-4 col-span-1">
                    <span className="text-sm text-text-secondary">{name}</span>
                  </div>
                  <div className="p-4 text-center">
                    <FeatureValue value={starter} />
                  </div>
                  <div className="p-4 text-center bg-primary/5 border-x border-primary/20">
                    <FeatureValue value={pro} />
                  </div>
                  <div className="p-4 text-center">
                    <FeatureValue value={agency} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I change plans at any time?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'Is there a free trial for paid plans?',
                a: 'Yes, Pro plans include a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers for annual plans.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee on all paid plans, no questions asked.',
              },
              {
                q: 'What happens to my data if I cancel?',
                a: 'Your data is retained for 30 days after cancellation, giving you time to export everything.',
              },
              {
                q: 'Do you offer discounts for annual plans?',
                a: 'Yes! Annual plans come with 2 months free — a 17% saving compared to monthly billing.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="p-6 rounded-xl bg-surface border border-border hover:border-border-light transition-colors">
                <h4 className="font-semibold text-text-primary mb-2">{q}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
