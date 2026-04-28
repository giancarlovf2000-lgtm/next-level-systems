CREATE TABLE IF NOT EXISTS user_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_id text NOT NULL,
  stripe_subscription_id text,
  stripe_customer_id text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, tool_id)
);

ALTER TABLE user_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tools" ON user_tools
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all" ON user_tools
  USING (true)
  WITH CHECK (true);
