const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const tools = [
  { id: '1',  name: 'Brandify',          description: 'AI-powered content creator for your brand',                         price: 2900  },
  { id: '2',  name: 'AtlasVitae',        description: 'Payroll & attendance management for modern teams',                   price: 9900  },
  { id: '3',  name: 'SiteForge',         description: 'Drag-and-drop website builder for modern businesses',                price: 7500  },
  { id: '4',  name: 'Synapse',           description: 'Internal team communications & collaboration hub',                   price: 2500  },
  { id: '5',  name: 'Data Nest',         description: 'Smart lead management & pipeline tracking CRM',                      price: 25400 },
  { id: '6',  name: 'OutreachIQ',        description: 'Multi-channel external communications for your clients',             price: 17800 },
  { id: '7',  name: 'Prospex',           description: "Find verified prospect emails from your competitors' audiences",     price: 4900  },
  { id: '8',  name: 'Observe',           description: 'Global situational awareness dashboard',                             price: 2900  },
  { id: '9',  name: 'Tavolo',            description: 'The digital menu your restaurant deserves',                          price: 4900  },
  { id: '10', name: 'stratos.builders',  description: 'Build software projects at the speed of thought',                   price: 1900  },
  { id: '11', name: 'stratos-ai',        description: 'AI-powered client reporting & presentation platform',                price: 1500  },
]

async function main() {
  console.log('Creating Stripe products and prices...\n')

  const results = []

  for (const tool of tools) {
    const product = await stripe.products.create({
      name: tool.name,
      description: tool.description,
      metadata: { tool_id: tool.id },
    })

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: tool.price,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: { tool_id: tool.id },
    })

    results.push({ id: tool.id, name: tool.name, price_id: price.id })
    console.log(`✓ ${tool.name.padEnd(20)} ${price.id}`)
  }

  console.log('\n--- Copy these into your code ---\n')
  for (const r of results) {
    console.log(`'${r.id}': '${r.price_id}',  // ${r.name}`)
  }
}

main().catch(console.error)
