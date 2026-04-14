import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Next Level Systems — Professional Developer Tools & Agency',
    template: '%s | Next Level Systems',
  },
  description:
    'Next Level Systems delivers enterprise-grade tools, AI-powered apps, and automation solutions for modern businesses and developers.',
  keywords: [
    'developer tools',
    'AI tools',
    'automation',
    'analytics',
    'SaaS',
    'agency',
    'Next Level Systems',
  ],
  authors: [{ name: 'Next Level Systems' }],
  creator: 'Next Level Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextlevelsystems.io',
    siteName: 'Next Level Systems',
    title: 'Next Level Systems — Professional Developer Tools & Agency',
    description:
      'Enterprise-grade tools, AI-powered apps, and automation solutions for modern businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Level Systems',
    description: 'Enterprise-grade tools and automation solutions.',
    creator: '@nextlevelsys',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-background text-text-primary antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
