import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center px-4">
        <div className="text-[120px] sm:text-[160px] font-black text-transparent bg-clip-text bg-gradient-to-b from-primary/50 to-transparent leading-none mb-4">
          404
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" fill="currentColor" />
          <h1 className="text-2xl font-bold text-text-primary">Page not found</h1>
        </div>
        <p className="text-text-secondary max-w-sm mx-auto mb-8">
          Looks like this page doesn&apos;t exist. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-xl btn-ghost text-text-primary font-semibold"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
