export type ProjectCategory = 'Web App' | 'API' | 'Automation' | 'AI' | 'HR & Payroll' | 'Communications' | 'CRM & Sales'
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
  price: number | null          // monthly price in USD
  image_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

// Tools that can be merged into SiteForge
export const SITEFORGE_ID = '3'
export const MERGEABLE_IDS = ['4', '5', '6', '7']        // Synapse, Data Nest, OutreachIQ, Prospex
export const STANDALONE_ONLY_IDS = ['1', '2']             // Brandify, AtlasVitae

// SiteForge page-based pricing
export const SITEFORGE_BASE_PRICE = 75                    // includes 3 pages
export const SITEFORGE_INCLUDED_PAGES = 3
export const SITEFORGE_EXTRA_PAGE_PRICE = 154             // per additional page

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
    price: 29,
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
    price: 99,
    image_url: null,
    featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'SiteForge',
    description: 'Drag-and-drop website builder for modern businesses',
    long_description:
      'SiteForge lets you build stunning, fully responsive websites without writing a single line of code. Choose from professional templates, customize every detail, and publish to a custom domain in minutes. SEO-ready, fast, and built for conversion.',
    url: null,
    category: 'Web App',
    tags: ['Website', 'No-Code', 'Builder', 'SEO'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 75,
    image_url: null,
    featured: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Synapse',
    description: 'Internal team communications & collaboration hub',
    long_description:
      'Synapse keeps your team aligned with real-time messaging, channels, file sharing, and task threads — all in one place. Cut through email noise and bring your internal communications into a focused, organized workspace built for productivity.',
    url: null,
    category: 'Communications',
    tags: ['Team Chat', 'Collaboration', 'Internal', 'Messaging'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 25,
    image_url: null,
    featured: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Data Nest',
    description: 'Smart lead management & pipeline tracking CRM',
    long_description:
      'Data Nest gives your sales team a clean, visual pipeline to capture, qualify, and close leads faster. Track every interaction, set follow-up reminders, assign leads to team members, and get real-time reporting on your entire sales funnel.',
    url: null,
    category: 'CRM & Sales',
    tags: ['CRM', 'Leads', 'Pipeline', 'Sales'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 254,
    image_url: null,
    featured: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'OutreachIQ',
    description: 'Multi-channel external communications for your clients',
    long_description:
      'OutreachIQ centralizes all your client-facing communication — email campaigns, SMS, WhatsApp, and more — in one unified platform. Schedule messages, track open rates, automate follow-ups, and keep every client conversation organized.',
    url: null,
    category: 'Communications',
    tags: ['Email', 'SMS', 'WhatsApp', 'Outreach', 'Clients'],
    status: 'coming_soon',
    plan_required: 'agency',
    price: 178,
    image_url: null,
    featured: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Prospex',
    description: "Find verified prospect emails from your competitors' audiences",
    long_description:
      'Prospex lets you discover and verify contact information for potential clients who are already engaging with your competitors. Enter a competitor domain, filter by role or industry, and export a clean list of verified emails — ready to add to your outreach pipeline.',
    url: null,
    category: 'CRM & Sales',
    tags: ['Prospecting', 'Email Finder', 'Lead Gen', 'Competitors', 'Sales'],
    status: 'coming_soon',
    plan_required: 'agency',
    price: 49,
    image_url: null,
    featured: false,
    sort_order: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Observe',
    description: 'Global situational awareness dashboard',
    long_description:
      'OBSERVE is a global situational awareness dashboard. It aggregates publicly available data — weather events, market prices, flight tracking, conflict reports, and news — into a single command center. Connect your own free API keys to unlock additional layers.',
    url: null,
    category: 'Intelligence',
    tags: ['Dashboard', 'Weather', 'Markets', 'News', 'Awareness'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 29,
    image_url: null,
    featured: false,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Tavolo',
    description: 'The digital menu your restaurant deserves',
    long_description:
      'Let customers order directly from their table by scanning a QR code. Kitchen and bar get notified instantly. No apps. No friction.',
    url: null,
    category: 'Hospitality',
    tags: ['Restaurant', 'QR Code', 'Menu', 'Orders', 'Kitchen'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 49,
    image_url: null,
    featured: false,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'stratos.builders',
    description: 'Build software projects at the speed of thought',
    long_description:
      'Build software projects at the speed of thought. AI-powered planning, real-time collaboration, and one-click provisioning — all in one command center.',
    url: null,
    category: 'AI',
    tags: ['AI', 'Dev Tools', 'Collaboration', 'Provisioning'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 19,
    image_url: null,
    featured: false,
    sort_order: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'stratos-ai',
    description: 'AI-powered client reporting & presentation platform',
    long_description:
      'Stratos AI is an AI-powered client reporting and presentation platform for marketing/admissions agencies.',
    url: null,
    category: 'AI',
    tags: ['AI', 'Reporting', 'Presentations', 'Marketing', 'Agencies'],
    status: 'coming_soon',
    plan_required: 'pro',
    price: 15,
    image_url: null,
    featured: false,
    sort_order: 11,
    created_at: new Date().toISOString(),
  },
]
