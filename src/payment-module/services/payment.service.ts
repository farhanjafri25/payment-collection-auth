import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment.repository';
// const crypto = require('crypto');
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}
  async addTransaction(body: any): Promise<any> {
    try {
      const { transactionId, orderId, razorpaySignature, orderStatus } = body;
      const order = await this.paymentRepository.getOrderById(orderId);
      if (!order) {
        throw new BadRequestException('Selected order not found');
      }
      if (orderStatus.toUpperCase() !== 'SUCCESS') {
        await this.paymentRepository.updateOrder({
          payerId: body.userId,
          orderId: body.orderId,
          orderStatus: orderStatus,
        });
      }
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRETKEY);
      hmac.update(orderId + '|' + transactionId);
      const generated_signature = hmac.digest('hex');

      if (generated_signature !== razorpaySignature) {
        console.log('signature verification failed');
        throw new BadRequestException('Payment verification failed!');
      }
      const doesTransactionExists =
        await this.paymentRepository.findTransaction(transactionId);
      if (doesTransactionExists) {
        console.log('this transaction already exist in database');
        throw new BadRequestException(
          'Payment verification failed,used transaction!',
        );
      }
      const saveTransaction = await this.paymentRepository.addTransaction({
        ...body,
        recieverId: order.reciever_id,
        payerId: order.payer_id,
        amount: order.order_amount,
      });
      return saveTransaction;
    } catch (error) {}
  }
  async addWebHookTransaction(body: any): Promise<any> {
    try {
      const entity = body.entity;
      const order = await this.paymentRepository.getOrderById(entity.order_id);
      if (!order) {
        throw new BadRequestException('Selected order not found');
      }
      if (entity.status.toUpperCase() !== 'CAPTURED') {
        await this.paymentRepository.updateOrder({
          payerId: body.userId,
          orderId: body.orderId,
          orderStatus: 'SUCCESS',
        });
      }
      const doesTransactionExists =
        await this.paymentRepository.findTransaction(entity.id);
      if (doesTransactionExists) {
        console.log('this transaction already exist in database');
        throw new BadRequestException(
          'Payment verification failed,used transaction!',
        );
      }
      const saveTransaction = await this.paymentRepository.addTransaction({
        ...body.entity,
        recieverId: order.reciever_id,
        payerId: order.payer_id,
        amount: order.order_amount,
      });
      return saveTransaction;
    } catch (error) {
      console.log(`Error creating transaction`, error);
      return null;
    }
  }
}
