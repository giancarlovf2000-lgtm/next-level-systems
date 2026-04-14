import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ExternalLink,
  CreditCard,
  Settings,
  Zap,
  ArrowRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Crown,
  BarChart3,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SAMPLE_PROJECTS, PRICING_TIERS } from '@/lib/types'

function planCanAccess(userPlan: string, requiredPlan: string): boolean {
  const planOrder = { free: 0, pro: 1, agency: 2 }
  const userLevel = planOrder[userPlan as keyof typeof planOrder] ?? 0
  const requiredLevel = planOrder[requiredPlan as keyof typeof planOrder] ?? 0
  return userLevel >= requiredLevel
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Try to fetch subscription from DB, fallback to free
  let subscription = null
  try {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()
    subscription = data
  } catch {
    // Table might not exist yet, that's okay
  }

  const userPlan = subscription?.plan || 'free'
  const currentTier = PRICING_TIERS.find((t) => t.id === userPlan) || PRICING_TIERS[0]
  const accessibleProjects = SAMPLE_PROJECTS.filter((p) =>
    planCanAccess(userPlan, p.plan_required)
  )

  const planColors = {
    free: 'text-text-secondary',
    pro: 'text-primary',
    agency: 'text-accent',
  }

  const planBg = {
    free: 'bg-surface-2 border-border',
    pro: 'bg-primary/10 border-primary/30',
    agency: 'bg-accent/10 border-accent/30',
  }

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
            {/* Subscription card */}
            <div
              className={`rounded-2xl border p-6 ${planBg[userPlan as keyof typeof planBg] || planBg.free}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crown
                      className={`w-5 h-5 ${planColors[userPlan as keyof typeof planColors]}`}
                    />
                    <h2 className="text-lg font-bold text-text-primary">
                      {currentTier.name} Plan
                    </h2>
                  </div>
                  <p className="text-sm text-text-secondary">{currentTier.description}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-2xl font-black ${planColors[userPlan as keyof typeof planColors]}`}
                  >
                    {currentTier.price === 0 ? 'Free' : `$${currentTier.price}/mo`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {userPlan === 'free' ? (
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg btn-primary text-sm font-semibold text-white"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Upgrade to Pro
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-border-light transition-all">
                    <CreditCard className="w-3.5 h-3.5" />
                    Manage Billing
                  </button>
                )}

                {subscription?.current_period_end && (
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    Renews {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                )}

                <div
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    subscription?.status === 'active' || !subscription
                      ? 'bg-success/10 text-success'
                      : 'bg-warning/10 text-warning'
                  }`}
                >
                  {subscription?.status === 'active' || !subscription ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {subscription?.status || 'Active'}
                </div>
              </div>
            </div>

            {/* Accessible tools */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">Your Tools</h2>
                <span className="text-sm text-text-muted">
                  {accessibleProjects.filter((p) => p.status !== 'coming_soon').length} accessible
                </span>
              </div>

              <div className="space-y-3">
                {SAMPLE_PROJECTS.map((project) => {
                  const hasAccess =
                    planCanAccess(userPlan, project.plan_required) &&
                    project.status !== 'coming_soon'
                  const isComingSoon = project.status === 'coming_soon'

                  return (
                    <div
                      key={project.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        hasAccess
                          ? 'bg-surface border-border hover:border-primary/40 hover:bg-surface-2'
                          : 'bg-surface/50 border-border opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                            hasAccess
                              ? 'bg-primary/10 text-primary'
                              : 'bg-surface-2 text-text-muted'
                          }`}
                        >
                          {project.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-text-primary">
                              {project.name}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                project.status === 'live'
                                  ? 'bg-success/10 text-success'
                                  : project.status === 'beta'
                                  ? 'bg-warning/10 text-warning'
                                  : 'bg-surface-2 text-text-muted'
                              }`}
                            >
                              {project.status === 'coming_soon' ? 'Soon' : project.status}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted">{project.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!hasAccess && !isComingSoon && (
                          <Link
                            href="/pricing"
                            className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-200"
                          >
                            Upgrade
                          </Link>
                        )}
                        {isComingSoon && (
                          <span className="text-xs text-text-muted">Coming Soon</span>
                        )}
                        {hasAccess && (
                          <a
                            href={project.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-200"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
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
                  <label className="text-xs text-text-muted uppercase tracking-widest">User ID</label>
                  <p className="text-xs text-text-muted font-mono mt-0.5 truncate">{user.id}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-widest">
                    Joined
                  </label>
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
                  <span className="text-sm text-text-secondary">Tools accessible</span>
                  <span className="text-sm font-bold text-primary">
                    {accessibleProjects.filter((p) => p.status !== 'coming_soon').length}/
                    {SAMPLE_PROJECTS.filter((p) => p.status !== 'coming_soon').length}
                  </span>
                </div>
                <div className="w-full bg-surface-2 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        (accessibleProjects.filter((p) => p.status !== 'coming_soon').length /
                          SAMPLE_PROJECTS.filter((p) => p.status !== 'coming_soon').length) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Current plan</span>
                  <span
                    className={`text-sm font-bold capitalize ${
                      planColors[userPlan as keyof typeof planColors]
                    }`}
                  >
                    {userPlan}
                  </span>
                </div>
              </div>
            </div>

            {/* Upgrade CTA */}
            {userPlan === 'free' && (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" fill="currentColor" />
                  <span className="text-sm font-bold text-primary">Unlock more tools</span>
                </div>
                <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                  Upgrade to Pro to access the AI Content Generator, Analytics Dashboard, and more.
                </p>
                <Link
                  href="/pricing"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg btn-primary text-sm font-semibold text-white"
                >
                  Upgrade to Pro — $29/mo
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
