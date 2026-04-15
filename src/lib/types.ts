export type ProjectCategory = 'Web App' | 'API' | 'Automation' | 'AI' | 'HR & Payroll'
export type ProjectStatus = 'live' | 'beta' | 'coming_soon'
export type PlanType = 'free' | 'pro' | 'agency'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export interface Project {
  id: string
  name: string
  description: string | null
  long_description: string | null
  url: string | null
  category: ProjectCategory | string
  tags: string[]
  status: ProjectStatus
  plan_required: PlanType
  image_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: PlanType
  status: SubscriptionStatus
  current_period_end: string | null
  created_at: string
}

export interface PricingTier {
  id: PlanType
  name: string
  price: number | null
  description: string
  features: string[]
  highlighted: boolean
  cta: string
  stripePriceId?: string
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    description: 'Get a feel for what Next Level Systems offers',
    features: [
      'Browse all available apps',
      'Community support',
      'Access to free resources',
      'Early access announcements',
    ],
    highlighted: false,
    cta: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Brandify',
    price: 29,
    description: 'AI-powered content creation for your brand',
    features: [
      'Full Brandify platform access',
      'AI image & video generation',
      'Social media scheduling',
      'Brand template library',
      'Priority support',
      'Up to 3 brand workspaces',
    ],
    highlighted: true,
    cta: 'Get Brandify Access',
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  {
    id: 'agency',
    name: 'AtlasVitae',
    price: 99,
    description: 'Complete payroll & attendance management',
    features: [
      'Full AtlasVitae platform access',
      'Payroll processing & history',
      'Attendance & time tracking',
      'Employee management',
      'Reporting & exports',
      'Dedicated onboarding support',
      'Multi-location support',
    ],
    highlighted: false,
    cta: 'Get AtlasVitae Access',
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID,
  },
]

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Brandify',
    description: 'AI-powered content creator for your brand',
    long_description:
      'Brandify lets you design stunning social media content with AI. Upload your photos and videos, generate professional designs, and publish everywhere — in minutes, not hours. Perfect for brands, creators, and marketing teams who want to move fast without sacrificing quality.',
    url: null,
    category: 'AI',
    tags: ['AI', 'Content', 'Branding', 'Social Media'],
    status: 'live',
    plan_required: 'pro',
    image_url: null,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'AtlasVitae',
    description: 'Payroll & attendance management for modern teams',
    long_description:
      'AtlasVitae is a complete HR operations platform built for businesses of all sizes. Manage employee attendance, run payroll, track time, and generate compliance-ready reports — all from one clean dashboard. Trusted by institutions across multiple locations.',
    url: null,
    category: 'HR & Payroll',
    tags: ['Payroll', 'HR', 'Attendance', 'Business'],
    status: 'live',
    plan_required: 'agency',
    image_url: null,
    featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
]
