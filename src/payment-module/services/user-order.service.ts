import { BadRequestException, Injectable } from '@nestjs/common';
import { createRazorpayOrder } from '../../razorpay/razorpay.service';
import { UserOrderRepository } from '../repositories/user-order.repository';

@Injectable()
export class UserOrderService {
  constructor(private userOrderRepository: UserOrderRepository) {}

  public async getUserOrders(
    type: string,
    userId: string,
    page: number = 0,
    pageSize: number = 15,
  ): Promise<any> {
    try {
      let res: string[];
      if (type === 'reciever') {
        res = await this.userOrderRepository.getUserOrdersReciever(
          userId,
          page,
          pageSize,
        );
      } else {
        res = await this.userOrderRepository.getUserOrderPayer(
          userId,
          page,
          pageSize,
        );
      }
      return res;
    } catch (error) {
      console.log(`getUserOrders error`, error);
      throw new BadRequestException('Something went wrong');
    }
  }
  public async createUserOrder(body: any): Promise<any> {
    try {
      const payload = {
        amount: `${body.amount}`,
        currency: 'INR',
        reciept: 'wsqaq1',
        partial_payment: false,
      };
      const orderId = await createRazorpayOrder(payload);
      if (!orderId) throw new BadRequestException('Unable to create Order');
      const saveOrder = await this.userOrderRepository.saveUserOrder({
        ...body,
        orderId,
      });
      if (!saveOrder) throw new BadRequestException('Something went wrong');
      return saveOrder;
    } catch (error) {
      console.log(`----- ~ Create User Order Error ~ ----`, error);
      return null;
    }
  }
  public async deleteUserOrder(body: any): Promise<any> {
    try {
      const doesOrderExists =
        await this.userOrderRepository.getOrderByOrderId(body);
      if (!doesOrderExists) throw new BadRequestException('No Orders Found');
      const res = await this.userOrderRepository.deleteOrder(body);
      if (!res) throw new BadRequestException('Error Deleting Order');
      return res;
    } catch (error) {
      console.log(`---- ~ Error deleting user Order ~ -----`, error);
      return null;
    }
  }
}
