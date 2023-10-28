import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { GetCurrentUser } from 'src/decorators';
import { TransactionDto } from '../dtos/transaction.dto';
import { PaymentService } from '../services/payment.service';

@UseInterceptors(AppInterceptor)
@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  //API to Add Transaction for Orders Razorpay
  @Post('/add-transaction')
  async addPaymentTransaction(
    @Body() body: TransactionDto,
    @GetCurrentUser('id') userId: string,
  ): Promise<any> {
    if (
      !body.razorpaySignature ||
      !body.orderId ||
      !body.transactionId ||
      !body.razorpaySignature
    )
      throw new BadRequestException('Something went wrong');
    const res = await this.paymentService.addTransaction({
      ...body,
      userId,
    });
    if (!res) throw new BadRequestException('Something went wrong');
    return res;
  }

  //Webhook to add Transaction for a payment
  @Post('/webhook')
  async transactionWebhook(@Body() body: any): Promise<any> {
    console.log(`transactionWebhook body`, body);
    const res = await this.paymentService.addWebHookTransaction(body);
    return res;
  }
}
