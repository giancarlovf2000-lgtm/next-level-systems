export type ProjectCategory = 'Web App' | 'API' | 'Automation' | 'AI'
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
    description: 'Perfect for exploring our tools',
    features: [
      'Access to free tools',
      'SEO Toolkit',
      'Community support',
      'Basic analytics',
      '1 project workspace',
    ],
    highlighted: false,
    cta: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    description: 'For professionals who need more power',
    features: [
      'Everything in Starter',
      'AI Content Generator',
      'Analytics Dashboard',
      'API Gateway access',
      'Priority support',
      'Unlimited workspaces',
      'Advanced integrations',
    ],
    highlighted: true,
    cta: 'Start Pro Trial',
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 99,
    description: 'For teams and growing agencies',
    features: [
      'Everything in Pro',
      'Automation Hub',
      'Email Campaigns',
      'Team collaboration (10 seats)',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
    ],
    highlighted: false,
    cta: 'Contact Sales',
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID,
  },
]

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'AI Content Generator',
    description: 'Generate professional content with AI in seconds',
    long_description: 'Powerful AI-driven content creation tool for blogs, social media, and marketing copy.',
    url: 'https://app1.example.com',
    category: 'AI',
    tags: ['AI', 'Content', 'Marketing'],
    status: 'live',
    plan_required: 'pro',
    image_url: null,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics for your business',
    long_description: 'Track KPIs, conversions, and user behavior across all your channels in one place.',
    url: 'https://app2.example.com',
    category: 'Web App',
    tags: ['Analytics', 'Dashboard', 'Business'],
    status: 'live',
    plan_required: 'pro',
    image_url: null,
    featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Automation Hub',
    description: 'Connect and automate your workflows',
    long_description: 'No-code automation platform to connect your favorite apps and streamline operations.',
    url: 'https://app3.example.com',
    category: 'Automation',
    tags: ['Automation', 'Workflow', 'No-code'],
    status: 'beta',
    plan_required: 'agency',
    image_url: null,
    featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'SEO Toolkit',
    description: 'Boost your search rankings',
    long_description: 'Comprehensive SEO analysis, keyword research, and rank tracking in one dashboard.',
    url: 'https://app4.example.com',
    category: 'Web App',
    tags: ['SEO', 'Marketing', 'Analytics'],
    status: 'live',
    plan_required: 'free',
    image_url: null,
    featured: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'API Gateway',
    description: 'Manage and monitor your APIs',
    long_description: 'Rate limiting, authentication, and analytics for all your API endpoints.',
    url: 'https://app5.example.com',
    category: 'API',
    tags: ['API', 'Developer', 'Backend'],
    status: 'live',
    plan_required: 'pro',
    image_url: null,
    featured: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Email Campaigns',
    description: 'Professional email marketing',
    long_description: 'Design, send, and track email campaigns with advanced segmentation.',
    url: 'https://app6.example.com',
    category: 'Automation',
    tags: ['Email', 'Marketing', 'Automation'],
    status: 'coming_soon',
    plan_required: 'agency',
    image_url: null,
    featured: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
]
