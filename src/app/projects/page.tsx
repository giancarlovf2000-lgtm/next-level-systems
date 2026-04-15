'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Grid3X3, List, ShoppingCart, X, ChevronRight, Sparkles } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { SAMPLE_PROJECTS } from '@/lib/types'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'AI', 'HR & Payroll', 'Web App', 'Communications', 'CRM & Sales', 'Automation', 'API']
const STATUSES = ['All', 'Live', 'Beta', 'Coming Soon']

export default function ProjectsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeStatus, setActiveStatus] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

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
      return matchSearch && matchCategory && matchStatus
    })
  }, [search, activeCategory, activeStatus])

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('All')
    setActiveStatus('All')
  }

  const clearSelection = () => setSelectedIds(new Set())

  const hasActiveFilters = search || activeCategory !== 'All' || activeStatus !== 'All'

  const selectedProjects = SAMPLE_PROJECTS.filter((p) => selectedIds.has(p.id))
  const total = selectedProjects.reduce((sum, p) => sum + (p.price ?? 0), 0)

  const handleCheckout = () => {
    if (selectedIds.size === 0) return
    const ids = Array.from(selectedIds).join(',')
    router.push(`/checkout?ids=${ids}`)
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
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
            Select the tools you need. Mix and match — your total updates automatically.
            When you&apos;re ready, hit <span className="text-primary font-semibold">Checkout</span>.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="mb-8 space-y-4">
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

            {/* View mode */}
            <div className="ml-auto flex items-center gap-3">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-text-muted hover:text-primary transition-colors">
                  Clear filters
                </button>
              )}
              <div className="flex items-center rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-primary text-white' : 'bg-surface-2 text-text-muted hover:text-text-primary')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-primary text-white' : 'bg-surface-2 text-text-muted hover:text-text-primary')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-text-muted">
            Showing <span className="text-text-primary font-semibold">{filtered.length}</span>{' '}
            of {SAMPLE_PROJECTS.length} tools
            {selectedIds.size > 0 && (
              <span className="ml-3 text-primary font-semibold">
                · {selectedIds.size} selected
              </span>
            )}
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
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          )}>
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedIds.has(project.id)}
                onToggle={toggleSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Sticky cart bar ── */}
      <div className={cn(
        'fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        selectedIds.size > 0 ? 'translate-y-0' : 'translate-y-full'
      )}>
        {/* Blur backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-primary/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Icon + count */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-primary">
                  {selectedIds.size} tool{selectedIds.size !== 1 ? 's' : ''} selected
                </div>
                {/* Pill list of selected names */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedProjects.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface-2 border border-border text-text-secondary"
                    >
                      {p.name}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelect(p.id) }}
                        className="text-text-muted hover:text-error transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Merge hint */}
            {selectedIds.has('3') && Array.from(selectedIds).some(id => ['4','5','6','7'].includes(id)) && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                SiteForge merge available
              </div>
            )}

            {/* Total */}
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-text-muted">Total / month</div>
              <div className="text-2xl font-black text-text-primary">${total}</div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={clearSelection}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text-primary border border-border hover:border-border-light bg-surface-2 transition-all duration-200"
              >
                Clear
              </button>
              <button
                onClick={handleCheckout}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl btn-primary text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-all duration-200"
              >
                Checkout
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
