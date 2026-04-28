import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ExternalLink,
  Settings,
  Zap,
  ArrowRight,
  BarChart3,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SAMPLE_PROJECTS } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch purchased tools
  let purchasedToolIds: string[] = []
  try {
    const { data } = await supabase
      .from('user_tools')
      .select('tool_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
    purchasedToolIds = (data ?? []).map((r: { tool_id: string }) => r.tool_id)
  } catch {
    // Table might not exist yet
  }

  const purchasedTools = SAMPLE_PROJECTS.filter((p) => purchasedToolIds.includes(p.id))
  const notPurchasedTools = SAMPLE_PROJECTS.filter((p) => !purchasedToolIds.includes(p.id))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-text-primary mb-2">
            Welcome back,{' '}
            <span className="gradient-text">
              {user.email?.split('@')[0]}
            </span>
          </h1>
          <p className="text-text-secondary">
            Manage your tools, subscription, and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Your Tools */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">Your Tools</h2>
                <span className="text-sm text-text-muted">{purchasedTools.length} active</span>
              </div>

              {purchasedTools.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
                  <Zap className="w-8 h-8 text-text-muted mx-auto mb-3" />
                  <p className="text-sm font-semibold text-text-primary mb-1">No tools yet</p>
                  <p className="text-xs text-text-muted mb-4">Browse our tools and subscribe to the ones you need.</p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-primary text-sm font-semibold text-white"
                  >
                    Browse Tools <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {purchasedTools.map((project) => (
                    <div
                      key={project.id}
                      className="bg-surface border border-border hover:border-primary/40 hover:bg-surface-2 rounded-xl transition-all duration-200 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                            {project.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-text-primary">{project.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                project.status === 'live' ? 'bg-success/10 text-success'
                                : project.status === 'beta' ? 'bg-warning/10 text-warning'
                                : 'bg-surface-2 text-text-muted'
                              }`}>
                                {project.status === 'coming_soon' ? 'Soon' : project.status}
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                              {project.long_description || project.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {project.status !== 'coming_soon' ? (
                            <a
                              href={project.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-200"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Open
                            </a>
                          ) : (
                            <span className="text-xs text-text-muted">Coming Soon</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other available tools */}
            {notPurchasedTools.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-text-muted uppercase tracking-widest">More tools</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-3 opacity-70">
                  {notPurchasedTools.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold bg-surface-2 text-text-muted">
                          {project.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-text-primary">{project.name}</span>
                          <p className="text-xs text-text-muted">{project.description}</p>
                        </div>
                      </div>
                      <Link
                        href="/projects"
                        className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        Add
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account info */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-text-muted" />
                Account
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-widest">Email</label>
                  <p className="text-sm text-text-primary mt-0.5 truncate">{user.email}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-widest">Joined</label>
                  <p className="text-sm text-text-primary mt-0.5">
                    {new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-text-muted" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Tools owned</span>
                  <span className="text-sm font-bold text-primary">{purchasedTools.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Monthly total</span>
                  <span className="text-sm font-bold text-primary">
                    ${purchasedTools.reduce((sum, p) => sum + (p.price ?? 0), 0)}/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Browse CTA */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" fill="currentColor" />
                <span className="text-sm font-bold text-primary">Add more tools</span>
              </div>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                Browse all available tools and subscribe to the ones that fit your workflow.
              </p>
              <Link
                href="/projects"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg btn-primary text-sm font-semibold text-white"
              >
                Browse Tools
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
