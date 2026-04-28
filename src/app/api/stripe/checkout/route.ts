import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { SAMPLE_PROJECTS } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { toolIds, userId, userEmail } = await req.json()

    if (!toolIds?.length || !userId || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tools = SAMPLE_PROJECTS.filter((p) => toolIds.includes(p.id))
    const lineItems = tools
      .filter((p) => p.stripe_price_id)
      .map((p) => ({ price: p.stripe_price_id!, quantity: 1 }))

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'No purchasable tools selected' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: userEmail,
      metadata: {
        userId,
        toolIds: toolIds.join(','),
      },
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/projects?canceled=true`,
      subscription_data: {
        metadata: { userId, toolIds: toolIds.join(',') },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
