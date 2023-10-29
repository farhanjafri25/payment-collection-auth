import { BadRequestException, Injectable } from '@nestjs/common';
import { createRazorpayLink } from '../../razorpay/razorpay.service';
import { Utility } from '../../utils/utility';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly utility: Utility,
  ) {}

  async getOrders(type: string, page: number, pageSize: number): Promise<any> {
    try {
      let res: any;
      if (type === 'orders') {
        res = await this.adminRepository.getAllOrders(page, pageSize);
      } else {
        res = await this.adminRepository.getAllTransactions(page, pageSize);
      }
      if (!res) throw new BadRequestException('Error fetching orders list');
      return res;
    } catch (error) {
      console.log(`---- ~ Error getting admin orders ~ ----`, error);
      return null;
    }
  }

  async deleteOrder(body: any): Promise<any> {
    try {
      const doesOrderExists = await this.adminRepository.getOrder(body); //Check if order exists
      if (!doesOrderExists) throw new BadRequestException('No order found');
      const res = await this.adminRepository.deleteOrder(body);
      if (!res) throw new BadRequestException('Something went wrong');
      return res;
    } catch (error) {
      console.log(`--- ~ Error deleting order ~ ----`, error);
      return null;
    }
  }
  async createOrder(body: any): Promise<any> {
    try {
      const orderId = this.utility.generateOrderId(body.recieverId);
      const payload = {
        amount: Number(body.amount),
        currency: 'INR',
        reference_id: `${orderId}`,
        customer: {
          email: `${body.payerEmail}`,
        },
      };
      const paymentLink = await createRazorpayLink(payload);
      if (!paymentLink) throw new BadRequestException('Error creating order');
      if (!orderId) throw new BadRequestException('Unable to create Order');
      const saveUserOrder = await this.adminRepository.createOrderByAdmin({
        ...body,
        paymentLink: paymentLink,
        orderId: orderId,
      });
      if (!saveUserOrder) throw new BadRequestException('Somethin went wrong');
      return saveUserOrder;
    } catch (error) {
      console.log(`Error creating order`, error);
      return null;
    }
  }
  async updateOrder(body: any): Promise<any> {
    try {
      //Check if order exists
      const doesOrderExists = await this.adminRepository.getOrderById(
        body.orderId,
      );
      if (!doesOrderExists)
        throw new BadRequestException('Order does not exists');
      const updateOrderStatus = await this.adminRepository.updateStatus(body);
      if (!updateOrderStatus)
        throw new BadRequestException('Someting went wrong');
      return updateOrderStatus;
    } catch (error) {
      console.log(`Error updating order`, error);
      return null;
    }
  }
}
