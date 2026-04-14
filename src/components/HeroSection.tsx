import Link from 'next/link'
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-16">
      {/* Background orbs */}
      <div className="orb orb-blue w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-40" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-1/3 -left-20 opacity-20" />
      <div className="orb orb-purple w-[400px] h-[400px] bottom-1/3 -right-20 opacity-20" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-8 animate-fade-in">
          <Zap className="w-3.5 h-3.5" fill="currentColor" />
          <span>6 powerful tools now live — explore the ecosystem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-up">
          <span className="text-text-primary">Build at the</span>
          <br />
          <span className="gradient-text">Next Level</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Enterprise-grade AI tools, automation solutions, and developer infrastructure —
          built for teams that refuse to settle for ordinary.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-primary text-white font-semibold text-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300"
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/auth/signup"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-ghost text-text-primary font-semibold text-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning" />
            <span>99.9% Uptime SLA</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span>Global Edge Network</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
