import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as any, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',
  },
})
