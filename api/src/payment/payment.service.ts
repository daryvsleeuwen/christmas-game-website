require('dotenv').config()
import { Injectable } from '@nestjs/common';
const stripe = require("stripe")(process.env.STRIPE_KEY);

@Injectable()
export class PaymentService {
    constructor(){}

    async createPaymentIntent(){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2,
            currency: 'eur',
            payment_method_types: ['ideal'],
        });

        if  (!paymentIntent) return null
        return { clientSecret: paymentIntent.client_secret}
    }
}
