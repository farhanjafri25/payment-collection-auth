import { BadRequestException, Injectable } from '@nestjs/common';
import { Utility } from '../../utils/utility';
import { createRazorpayLink } from '../../razorpay/razorpay.service';
import { UserOrderRepository } from '../repositories/user-order.repository';
import { UserRoleDto } from '../dtos/user-role.dto';

@Injectable()
export class UserOrderService {
  constructor(
    private userOrderRepository: UserOrderRepository,
    private utility: Utility,
  ) {}

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
      } else if (type === 'payer') {
        res = await this.userOrderRepository.getUserOrderPayer(
          userId,
          page,
          pageSize,
        );
      } else {
        throw new BadRequestException('Invalid Arguments');
      }
      return res;
    } catch (error) {
      console.log(`getUserOrders error`, error);
      throw new BadRequestException('Something went wrong');
    }
  }
  public async createUserOrder(body: any): Promise<any> {
    try {
      const orderId = this.utility.generateOrderId(body.userId);
      const payload = {
        amount: Number(body.amount),
        currency: 'INR',
        reference_id: `${orderId}`,
        customer: {
          email: `${body.payerEmail}`,
        },
      };
      const paymentLink = await createRazorpayLink(payload);
      console.log(`paymentLink -->`, paymentLink);
      if (!paymentLink) throw new BadRequestException('Unable to create Order');
      if (!orderId) throw new BadRequestException('Unable to create Order');
      const saveOrder = await this.userOrderRepository.saveUserOrder({
        ...body,
        orderId: orderId,
        paymentLink: JSON.stringify(paymentLink),
        receiverId: body.userId,
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
