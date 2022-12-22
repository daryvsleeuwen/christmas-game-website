import { Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @Post('intent/new')
    createPaymentIntent(){
        return this.paymentService.createPaymentIntent()
    }
}
