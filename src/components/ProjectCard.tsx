'use client'

import Link from 'next/link'
import { Lock, Zap, Bot, Workflow, Globe, Radio, Users, CheckCircle2, MessageSquare, Target, Check, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/types'
import { SITEFORGE_ID, SITEFORGE_INCLUDED_PAGES, SITEFORGE_EXTRA_PAGE_PRICE } from '@/lib/types'

const categoryConfig = {
  AI: {
    icon: Bot,
    gradient: 'from-violet-500/20 to-purple-600/10',
    border: 'border-violet-500/20',
    selectedBorder: 'border-violet-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(139,92,246,0.4)]',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
    checkBg: 'bg-violet-500',
  },
  'Web App': {
    icon: Globe,
    gradient: 'from-blue-500/20 to-cyan-600/10',
    border: 'border-blue-500/20',
    selectedBorder: 'border-blue-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    checkBg: 'bg-blue-500',
  },
  API: {
    icon: Zap,
    gradient: 'from-yellow-500/20 to-orange-600/10',
    border: 'border-yellow-500/20',
    selectedBorder: 'border-yellow-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(234,179,8,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(234,179,8,0.4)]',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    checkBg: 'bg-yellow-500',
  },
  Automation: {
    icon: Workflow,
    gradient: 'from-emerald-500/20 to-green-600/10',
    border: 'border-emerald-500/20',
    selectedBorder: 'border-emerald-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)]',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    checkBg: 'bg-emerald-500',
  },
  'HR & Payroll': {
    icon: Users,
    gradient: 'from-rose-500/20 to-pink-600/10',
    border: 'border-rose-500/20',
    selectedBorder: 'border-rose-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(244,63,94,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(244,63,94,0.4)]',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
    checkBg: 'bg-rose-500',
  },
  Communications: {
    icon: MessageSquare,
    gradient: 'from-teal-500/20 to-cyan-600/10',
    border: 'border-teal-500/20',
    selectedBorder: 'border-teal-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(20,184,166,0.4)]',
    iconBg: 'bg-teal-500/20',
    iconColor: 'text-teal-400',
    checkBg: 'bg-teal-500',
  },
  'CRM & Sales': {
    icon: Target,
    gradient: 'from-orange-500/20 to-amber-600/10',
    border: 'border-orange-500/20',
    selectedBorder: 'border-orange-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)]',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    checkBg: 'bg-orange-500',
  },
  Intelligence: {
    icon: Eye,
    gradient: 'from-sky-500/20 to-indigo-600/10',
    border: 'border-sky-500/20',
    selectedBorder: 'border-sky-400',
    glow: 'hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)]',
    selectedGlow: 'shadow-[0_20px_40px_-10px_rgba(14,165,233,0.4)]',
    iconBg: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
    checkBg: 'bg-sky-500',
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
  free: { label: 'Free', className: 'bg-surface-2 text-text-secondary border border-border' },
  pro: { label: 'Pro', className: 'bg-primary/10 text-primary border border-primary/20' },
  agency: { label: 'Agency', className: 'bg-accent/10 text-accent border border-accent/20' },
}

interface ProjectCardProps {
  project: Project
  userPlan?: string
  isSelected?: boolean
  onToggle?: (id: string) => void
}

export function ProjectCard({ project, userPlan = '', isSelected = false, onToggle }: ProjectCardProps) {
  const catConfig = categoryConfig[project.category as keyof typeof categoryConfig] || categoryConfig['Web App']
  const statConfig = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.live
  const plnConfig = planConfig[project.plan_required as keyof typeof planConfig] || planConfig.free
  const CategoryIcon = catConfig.icon
  const isComingSoon = project.status === 'coming_soon'
  const selectable = !!onToggle

  const handleCardClick = () => {
    if (selectable) onToggle!(project.id)
  }

  return (
    <div
      onClick={selectable ? handleCardClick : undefined}
      className={cn(
        'group relative rounded-2xl border bg-gradient-to-br transition-all duration-300 overflow-hidden',
        catConfig.gradient,
        isSelected ? catConfig.selectedBorder : catConfig.border,
        isSelected ? catConfig.selectedGlow : catConfig.glow,
        'bg-surface',
        selectable ? 'cursor-pointer' : '',
        !isSelected && 'hover:-translate-y-1',
        isSelected && 'scale-[1.01]',
      )}
    >
      {/* Selected overlay shimmer */}
      {isSelected && (
        <div className="absolute inset-0 bg-white/[0.03] pointer-events-none rounded-2xl" />
      )}

      {/* Checkmark badge */}
      {selectable && (
        <div className={cn(
          'absolute top-3 right-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
          isSelected
            ? `${catConfig.checkBg} border-transparent`
            : 'border-border bg-surface-2 group-hover:border-text-muted'
        )}>
          {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', catConfig.iconBg)}>
            <CategoryIcon className={cn('w-5 h-5', catConfig.iconColor)} />
          </div>
          <div className={cn('flex items-center gap-2', selectable && 'pr-7')}>
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', plnConfig.className)}>
              {plnConfig.label}
            </span>
            <span className={cn('flex items-center text-xs font-medium px-2 py-0.5 rounded-full', statConfig.className)}>
              {statConfig.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
              )}
              {statConfig.label}
            </span>
          </div>
        </div>

        {/* Name + price */}
        <div className="flex items-start justify-between mb-1 gap-2">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
            {project.name}
          </h3>
          {project.price !== null && (
            project.id === SITEFORGE_ID ? (
              <div className="text-right flex-shrink-0">
                <span className={cn('text-sm font-bold', catConfig.iconColor)}>
                  ${project.price}<span className="text-xs font-normal text-text-muted">/site</span>
                </span>
                <div className="text-xs text-text-muted whitespace-nowrap">
                  {SITEFORGE_INCLUDED_PAGES} pages · +${SITEFORGE_EXTRA_PAGE_PRICE}/extra
                </div>
              </div>
            ) : (
              <span className={cn('text-sm font-bold flex-shrink-0', catConfig.iconColor)}>
                ${project.price}<span className="text-xs font-normal text-text-muted">/mo</span>
              </span>
            )
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-surface-2 text-text-muted border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA — only shown when NOT in selection mode */}
        {!selectable && (
          isComingSoon ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface-2 text-text-muted border border-border cursor-not-allowed"
            >
              <Radio className="w-4 h-4" />
              Coming Soon
            </button>
          ) : userPlan ? (
            <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-success/10 text-success border border-success/30">
              <CheckCircle2 className="w-4 h-4" />
              Access Active — Check your email
            </div>
          ) : (
            <Link
              href="/projects"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white hover:border-primary hover:shadow-glow-sm'
              )}
            >
              <Lock className="w-4 h-4" />
              Get Access
            </Link>
          )
        )}

        {/* Selection mode footer */}
        {selectable && (
          <div className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
            isSelected
              ? `${catConfig.checkBg} bg-opacity-20 border-transparent text-white`
              : 'bg-surface-2 text-text-muted border-border group-hover:border-text-muted'
          )}>
            {isSelected ? (
              <><Check className="w-4 h-4" /> Selected</>
            ) : (
              <><span className="w-4 h-4 rounded-full border border-current opacity-50" /> Add to selection</>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
