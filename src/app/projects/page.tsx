'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Grid3X3, List } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { SAMPLE_PROJECTS } from '@/lib/types'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Web App', 'API', 'Automation', 'AI']
const STATUSES = ['All', 'Live', 'Beta', 'Coming Soon']
const PLANS = ['All', 'Free', 'Pro', 'Agency']

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeStatus, setActiveStatus] = useState('All')
  const [activePlan, setActivePlan] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return SAMPLE_PROJECTS.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

      const matchCategory = activeCategory === 'All' || p.category === activeCategory

      const matchStatus =
        activeStatus === 'All' ||
        (activeStatus === 'Live' && p.status === 'live') ||
        (activeStatus === 'Beta' && p.status === 'beta') ||
        (activeStatus === 'Coming Soon' && p.status === 'coming_soon')

      const matchPlan =
        activePlan === 'All' ||
        (activePlan === 'Free' && p.plan_required === 'free') ||
        (activePlan === 'Pro' && p.plan_required === 'pro') ||
        (activePlan === 'Agency' && p.plan_required === 'agency')

      return matchSearch && matchCategory && matchStatus && matchPlan
    })
  }, [search, activeCategory, activeStatus, activePlan])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('All')
    setActiveStatus('All')
    setActivePlan('All')
  }

  const hasActiveFilters =
    search || activeCategory !== 'All' || activeStatus !== 'All' || activePlan !== 'All'

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Page header */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Our Tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-primary mb-4">
            The Complete <span className="gradient-text">Toolkit</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Browse our full suite of professional tools. Filter by category, status, or plan
            to find exactly what you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools, categories, or tags..."
              className="w-full input-dark pl-10 pr-4 py-3 rounded-xl text-sm"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category filter */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-text-muted mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                    activeCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 text-text-secondary border border-border hover:border-primary/40 hover:text-primary'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-border hidden sm:block" />

            {/* Status filter */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-text-muted mr-1">Status:</span>
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                    activeStatus === status
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 text-text-secondary border border-border hover:border-primary/40 hover:text-primary'
                  )}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-border hidden sm:block" />

            {/* Plan filter */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-text-muted mr-1">Plan:</span>
              {PLANS.map((plan) => (
                <button
                  key={plan}
                  onClick={() => setActivePlan(plan)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                    activePlan === plan
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 text-text-secondary border border-border hover:border-primary/40 hover:text-primary'
                  )}
                >
                  {plan}
                </button>
              ))}
            </div>

            {/* View mode + results count */}
            <div className="ml-auto flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-text-muted hover:text-primary transition-colors"
                >
                  Clear filters
                </button>
              )}
              <div className="flex items-center rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 text-text-muted hover:text-text-primary'
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 text-text-muted hover:text-text-primary'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing{' '}
            <span className="text-text-primary font-semibold">{filtered.length}</span>{' '}
            of {SAMPLE_PROJECTS.length} tools
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>

        {/* Projects grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No tools found</h3>
            <p className="text-text-muted mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 rounded-lg bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-all duration-200"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            )}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
