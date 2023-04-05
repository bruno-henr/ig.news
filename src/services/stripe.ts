import Stripe from 'stripe';

export const stripe = new Stripe(
    'sk_test_51MrsHzA5YLvKJEBnpbT66MDYsOXbojAOXQN8h4Zmu9mN5oGG0Sx8yc5CGnuY60MrG3gulUbTBWYahCxIdggWtATF00T3Ibgx9G',
    {
        apiVersion: '2022-11-15', //'2020-08-27',
        appInfo: {
            name: 'ignews',
            version: '0.1.0'
        }
    }
)