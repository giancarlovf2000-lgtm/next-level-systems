import Link from 'next/link'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Projects', href: '/projects' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Changelog', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
}

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@nextlevelsystems.io', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-mono text-text-muted tracking-widest uppercase">NLS</span>
                <span className="text-sm font-bold text-text-primary">
                  Next Level <span className="text-primary">Systems</span>
                </span>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Building the next generation of developer tools and automation solutions.
              Trusted by 500+ teams worldwide.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Next Level Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>Built with</span>
            <span className="text-primary font-semibold">Next.js</span>
            <span>&</span>
            <span className="text-cyan font-semibold">Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
