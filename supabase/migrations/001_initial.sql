-- Next Level Systems — Initial Schema
-- Run this in your Supabase SQL editor or via supabase db push

-- ============================================================
-- Projects/tools table
-- ============================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  long_description text,
  url text,
  category text,
  tags text[],
  status text default 'live', -- live, beta, coming_soon
  plan_required text default 'free', -- free, pro, agency
  image_url text,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- User subscriptions
-- ============================================================
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free', -- free, pro, agency
  status text default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table projects enable row level security;
alter table subscriptions enable row level security;

-- Projects are publicly readable
create policy "Projects are publicly readable"
  on projects for select
  using (true);

-- Only admins can insert/update/delete projects
create policy "Service role can manage projects"
  on projects for all
  using (auth.role() = 'service_role');

-- Users can read their own subscription
create policy "Users can read own subscription"
  on subscriptions for select
  using (auth.uid() = user_id);

-- Users can insert their own subscription (initial creation)
create policy "Users can insert own subscription"
  on subscriptions for insert
  with check (auth.uid() = user_id);

-- Service role can manage all subscriptions (for webhooks)
create policy "Service role can manage subscriptions"
  on subscriptions for all
  using (auth.role() = 'service_role');

-- ============================================================
-- Updated at trigger
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger subscriptions_updated_at
  before update on subscriptions
  for each row execute function update_updated_at();

-- ============================================================
-- Seed sample projects
-- ============================================================
insert into projects (name, description, long_description, url, category, tags, status, plan_required, featured, sort_order)
values
  (
    'AI Content Generator',
    'Generate professional content with AI in seconds',
    'Powerful AI-driven content creation tool for blogs, social media, and marketing copy. Supports 50+ content types with GPT-4 quality output.',
    'https://app1.example.com',
    'AI',
    ARRAY['AI', 'Content', 'Marketing'],
    'live',
    'pro',
    true,
    1
  ),
  (
    'Analytics Dashboard',
    'Real-time analytics for your business',
    'Track KPIs, conversions, and user behavior across all your channels in one place. Beautiful visualizations, custom reports, and data exports.',
    'https://app2.example.com',
    'Web App',
    ARRAY['Analytics', 'Dashboard', 'Business'],
    'live',
    'pro',
    true,
    2
  ),
  (
    'Automation Hub',
    'Connect and automate your workflows',
    'No-code automation platform to connect your favorite apps and streamline operations. 200+ integrations, visual workflow builder, and advanced triggers.',
    'https://app3.example.com',
    'Automation',
    ARRAY['Automation', 'Workflow', 'No-code'],
    'beta',
    'agency',
    true,
    3
  ),
  (
    'SEO Toolkit',
    'Boost your search rankings',
    'Comprehensive SEO analysis, keyword research, and rank tracking in one dashboard. Get actionable insights to dominate search results.',
    'https://app4.example.com',
    'Web App',
    ARRAY['SEO', 'Marketing', 'Analytics'],
    'live',
    'free',
    false,
    4
  ),
  (
    'API Gateway',
    'Manage and monitor your APIs',
    'Rate limiting, authentication, and analytics for all your API endpoints. Enterprise-grade API management without the enterprise price tag.',
    'https://app5.example.com',
    'API',
    ARRAY['API', 'Developer', 'Backend'],
    'live',
    'pro',
    false,
    5
  ),
  (
    'Email Campaigns',
    'Professional email marketing',
    'Design, send, and track email campaigns with advanced segmentation. Beautiful templates, A/B testing, and detailed performance analytics.',
    'https://app6.example.com',
    'Automation',
    ARRAY['Email', 'Marketing', 'Automation'],
    'coming_soon',
    'agency',
    false,
    6
  )
on conflict do nothing;
