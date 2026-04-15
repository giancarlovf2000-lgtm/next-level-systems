import Link from 'next/link'
import { ArrowRight, Users, Zap, Globe, TrendingUp, Star, Check, ChevronRight } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { ProjectCard } from '@/components/ProjectCard'
import { PricingCard } from '@/components/PricingCard'
import { SAMPLE_PROJECTS, PRICING_TIERS } from '@/lib/types'

const featuredProjects = SAMPLE_PROJECTS.filter((p) => p.featured)

const stats = [
  { label: 'Apps Available', value: '2', icon: Zap, color: 'text-primary' },
  { label: 'Active Clients', value: '50+', icon: Users, color: 'text-cyan' },
  { label: 'Uptime', value: '99.9%', icon: TrendingUp, color: 'text-success' },
  { label: 'Countries Served', value: '5+', icon: Globe, color: 'text-accent' },
]

const testimonials = [
  {
    quote: "Brandify completely changed how we create content. Our social media output tripled in the first month.",
    author: "Maria G.",
    role: "Brand Manager",
    rating: 5,
  },
  {
    quote: "AtlasVitae simplified our payroll process. What used to take days now takes minutes.",
    author: "Carlos R.",
    role: "HR Director",
    rating: 5,
  },
  {
    quote: "Having everything under one platform makes billing and access management so much easier.",
    author: "Sofia M.",
    role: "Operations Lead",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats bar */}
      <section className="py-12 border-y border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex flex-col items-center text-center group">
                <div className={`mb-2 ${color}`}>
                  <Icon className="w-6 h-6 mx-auto mb-1 opacity-80" />
                </div>
                <div className={`text-4xl font-black ${color} mb-1`}>{value}</div>
                <div className="text-sm text-text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Featured Tools
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mb-4">
              Professional tools built to
              <br />
              <span className="gradient-text">power your business</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Two focused platforms — AI content creation and HR management.
              Subscribe once, get access, and grow with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-ghost text-text-primary font-medium group"
            >
              See full app details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-y border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-xs font-semibold text-warning uppercase tracking-widest mb-4">
              <Star className="w-3 h-3" fill="currentColor" />
              Testimonials
            </div>
            <h2 className="text-4xl font-black text-text-primary">
              Loved by teams worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author, role, rating }) => (
              <div
                key={author}
                className="relative p-6 rounded-2xl bg-surface border border-border hover:border-border-light transition-all duration-300 group"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
                    {author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{author}</div>
                    <div className="text-xs text-text-muted">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-xs font-semibold text-success uppercase tracking-widest mb-4">
              Simple Pricing
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mb-4">
              Plans that scale with you
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              Start free, upgrade when ready. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
            >
              Compare all features
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan/5 to-accent/10" />
        <div className="absolute inset-0 border-y border-primary/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-text-primary mb-4">
            Ready to go to the{' '}
            <span className="gradient-text">next level?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
            Subscribe to Brandify or AtlasVitae and we&apos;ll get you set up within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-primary text-white font-semibold text-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
            >
              Start for free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-8 py-4 rounded-xl btn-ghost text-text-primary font-semibold"
            >
              Browse tools
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-text-muted">
            {['No credit card required', 'Free plan forever', 'Cancel anytime'].map((text, i) => (
              <div key={text} className="flex items-center gap-2">
                {i > 0 && <div className="w-1 h-1 rounded-full bg-border" />}
                <Check className="w-3.5 h-3.5 text-success" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
