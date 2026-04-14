import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, STRIPE_PLANS } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { plan, userId, userEmail } = await req.json()

    if (!plan || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const planConfig = STRIPE_PLANS[plan as keyof typeof STRIPE_PLANS]
    if (!planConfig) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    if (!planConfig.priceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured for this plan' },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await createCheckoutSession({
      priceId: planConfig.priceId,
      userId,
      userEmail,
      successUrl: `${baseUrl}/dashboard?success=true&plan=${plan}`,
      cancelUrl: `${baseUrl}/pricing?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
