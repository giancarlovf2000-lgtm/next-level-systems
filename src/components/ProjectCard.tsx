'use client'

import Link from 'next/link'
import { ExternalLink, Lock, Zap, Bot, BarChart3, Workflow, Globe, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/types'

const categoryConfig = {
  AI: {
    icon: Bot,
    gradient: 'from-violet-500/20 to-purple-600/10',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.3)]',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  'Web App': {
    icon: Globe,
    gradient: 'from-blue-500/20 to-cyan-600/10',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)]',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  API: {
    icon: Zap,
    gradient: 'from-yellow-500/20 to-orange-600/10',
    accent: 'text-yellow-400',
    border: 'border-yellow-500/20',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(234,179,8,0.3)]',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  Automation: {
    icon: Workflow,
    gradient: 'from-emerald-500/20 to-green-600/10',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
}

const statusConfig = {
  live: {
    label: 'Live',
    className: 'bg-success/10 text-success border border-success/20',
    pulse: true,
  },
  beta: {
    label: 'Beta',
    className: 'bg-warning/10 text-warning border border-warning/20',
    pulse: false,
  },
  coming_soon: {
    label: 'Coming Soon',
    className: 'bg-text-muted/10 text-text-muted border border-text-muted/20',
    pulse: false,
  },
}

const planConfig = {
  free: {
    label: 'Free',
    className: 'bg-surface-2 text-text-secondary border border-border',
  },
  pro: {
    label: 'Pro',
    className: 'bg-primary/10 text-primary border border-primary/20',
  },
  agency: {
    label: 'Agency',
    className: 'bg-accent/10 text-accent border border-accent/20',
  },
}

interface ProjectCardProps {
  project: Project
  userPlan?: string
}

function canAccess(userPlan: string, requiredPlan: string): boolean {
  const planOrder = { free: 0, pro: 1, agency: 2 }
  const userLevel = planOrder[userPlan as keyof typeof planOrder] ?? -1
  const requiredLevel = planOrder[requiredPlan as keyof typeof planOrder] ?? 0
  return userLevel >= requiredLevel
}

export function ProjectCard({ project, userPlan = '' }: ProjectCardProps) {
  const catConfig = categoryConfig[project.category as keyof typeof categoryConfig] || categoryConfig['Web App']
  const statConfig = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.live
  const plnConfig = planConfig[project.plan_required as keyof typeof planConfig] || planConfig.free
  const CategoryIcon = catConfig.icon
  const hasAccess = canAccess(userPlan, project.plan_required)
  const isComingSoon = project.status === 'coming_soon'

  return (
    <div
      className={cn(
        'group relative rounded-2xl border bg-gradient-to-br',
        catConfig.gradient,
        catConfig.border,
        catConfig.glow,
        'bg-surface transition-all duration-300 overflow-hidden',
        'hover:-translate-y-1'
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-primary" />
      </div>

      {/* Card shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', catConfig.iconBg)}>
            <CategoryIcon className={cn('w-5 h-5', catConfig.iconColor)} />
          </div>
          <div className="flex items-center gap-2">
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', plnConfig.className)}>
              {plnConfig.label}
            </span>
            <span
              className={cn(
                'flex items-center text-xs font-medium px-2 py-0.5 rounded-full',
                statConfig.className
              )}
            >
              {statConfig.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
              )}
              {statConfig.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-surface-2 text-text-muted border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {isComingSoon ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface-2 text-text-muted border border-border cursor-not-allowed"
          >
            <Radio className="w-4 h-4" />
            Notify Me When Live
          </button>
        ) : hasAccess || project.plan_required === 'free' ? (
          <a
            href={project.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white hover:border-primary hover:shadow-glow-sm'
            )}
          >
            <ExternalLink className="w-4 h-4" />
            Open App
          </a>
        ) : (
          <Link
            href="/pricing"
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              'bg-surface-2 text-text-secondary border border-border hover:border-primary/40 hover:text-primary'
            )}
          >
            <Lock className="w-4 h-4" />
            Upgrade to {plnConfig.label}
          </Link>
        )}
      </div>
    </div>
  )
}
