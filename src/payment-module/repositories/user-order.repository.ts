import { Injectable } from '@nestjs/common';
import { Connection, MoreThan, Repository } from 'typeorm';
import { OrderEntity } from '../entites/order.entity';
import { CreateOrder } from '../interface/interface';

@Injectable()
export class UserOrderRepository {
  private userOrderRepository: Repository<OrderEntity>;
  constructor(private db: Connection) {
    this.userOrderRepository = this.db.getRepository(OrderEntity);
  }

  async getUserOrdersReciever(
    userId: string,
    page: number = 0,
    pageSize: number = 15,
  ): Promise<any> {
    try {
      const getUserOrders = await this.userOrderRepository.find({
        where: {
          recieverId: userId,
          id: MoreThan(page),
        },
        take: pageSize,
      });
      return getUserOrders;
    } catch (error) {
      console.log(`error getting userOrderReciever`, error);
      return null;
    }
  }

  async getUserOrderPayer(
    userId: string,
    page: number = 0,
    pageSize: number = 15,
  ): Promise<any> {
    try {
      const getUserOrders = await this.userOrderRepository.find({
        where: {
          payerId: userId,
          id: MoreThan(page),
        },
        take: pageSize,
      });
      return getUserOrders;
    } catch (error) {
      console.log(`error getting getUserOrderPayer`, error);
      return null;
    }
  }

  async saveUserOrder(body: CreateOrder): Promise<any> {
    try {
      const orderObj = new OrderEntity();
      orderObj.orderId = body.orderId;
      orderObj.orderStatus = body.orderStatus;
      orderObj.payerId = body.payerId;
      orderObj.recieverId = body.receiverId;
      orderObj.price = Number(body.amount);
      const saveOrder = await this.userOrderRepository.save(orderObj);
      return saveOrder;
    } catch (error) {
      console.log(`------- ~ Error creating Order ~ -----`, error);
      return null;
    }
  }
  async getOrderByOrderId(body: any): Promise<OrderEntity> {
    try {
      const res = await this.userOrderRepository.findOne({
        where: {
          orderId: body.orderId,
          payerId: body.payerId,
          recieverId: body.userId,
        },
      });
      return res;
    } catch (error) {
      console.log(`----- ~ Error fetching Order from DB ~ -----`, error);
      return null;
    }
  }
  async deleteOrder(body: any): Promise<any> {
    try {
      const res = await this.userOrderRepository.update(
        {
          recieverId: body.userId,
          payerId: body.payerId,
        },
        {
          isDeleted: true,
        },
      );
      return res;
    } catch (error) {
      console.log(`----- ~ Error deleting order ~ ----`, error);
      return null;
    }
  }
}
