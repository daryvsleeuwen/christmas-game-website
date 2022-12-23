require('dotenv').config()
import { Injectable } from '@nestjs/common';
const stripe = require("stripe")(process.env.STRIPE_KEY);

@Injectable()
export class PaymentService {
    constructor(private config: ConfigService){}

    async createPaymentIntent(){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(this.config.get('SUBSCRIPTION_AMOUNT')),
            currency: 'eur',
            payment_method_types: ['ideal'],
        });

        if  (!paymentIntent) return null
        return { clientSecret: paymentIntent.client_secret}
    }
}
