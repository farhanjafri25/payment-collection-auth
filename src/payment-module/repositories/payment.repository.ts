import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { OrderEntity } from '../entites/order.entity';
import { TransactionEntity } from '../entites/transaction.entity';

@Injectable()
export class PaymentRepository {
  private paymentRepository: Repository<TransactionEntity>;
  private orderRepository: Repository<OrderEntity>;
  constructor(private db: Connection) {
    this.paymentRepository = this.db.getRepository(TransactionEntity);
    this.orderRepository = this.db.getRepository(OrderEntity);
  }

  public async getOrderById(orderId: string): Promise<any> {
    try {
      const res = await this.orderRepository.find({
        where: {
          orderId: orderId,
        },
      });
      return res;
    } catch (error) {
      console.log(`error getting order by id`, error);
      return null;
    }
  }

  public async updateOrder(body: any): Promise<any> {
    try {
      const res = await this.orderRepository.update(
        {
          orderId: body.orderId,
          payerId: body.userId,
        },
        {
          orderStatus: body.orderStatus,
        },
      );
      return res;
    } catch (error) {
      console.log(`Error updating order status`, error);
      return null;
    }
  }

  public async findTransaction(transactionId: string): Promise<any> {
    try {
      const res = await this.paymentRepository.find({
        where: {
          transactionId: transactionId,
        },
      });
      return res;
    } catch (error) {
      console.log(`Error finding transactions`, error);
      return null;
    }
  }

  public async addTransaction(body: any): Promise<any> {
    try {
      const transactionObj = new TransactionEntity();
      transactionObj.orderAmount = body.order_amount;
      transactionObj.orderId = body.orderId;
      transactionObj.payerId = body.payerId;
      transactionObj.recieverId = body.receiverId;
      transactionObj.transactionId = body.id;
      transactionObj.transactionStatus = body.status;
      const res = await this.paymentRepository.create(transactionObj);
      return res;
    } catch (error) {
      console.log(`Error saving transactions`, error);
      return null;
    }
  }
}
