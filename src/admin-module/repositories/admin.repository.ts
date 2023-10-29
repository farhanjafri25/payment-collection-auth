import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../payment-module/entites/order.entity';
import { Connection, MoreThan, Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { TransactionEntity } from '../../payment-module/entites/transaction.entity';

@Injectable()
export class AdminRepository {
  private adminRepository: Repository<AdminEntity>;
  private orderRepository: Repository<OrderEntity>;
  private transactionRepository: Repository<TransactionEntity>;
  constructor(private db: Connection) {
    this.adminRepository = this.db.getRepository(AdminEntity);
    this.orderRepository = this.db.getRepository(OrderEntity);
    this.transactionRepository = this.db.getRepository(TransactionEntity);
  }

  public async saveAdmin(body: any): Promise<any> {
    try {
      const adminObj = new AdminEntity();
      adminObj.adminId = body.adminId;
      adminObj.adminName = body.adminName;
      adminObj.email = body.email;
      adminObj.password = body.password;
      console.log(`admin object`, adminObj);
      const res = await this.adminRepository.save(adminObj);
      return res;
    } catch (error) {
      console.log(`---- ~ Error Saving Admin ~ ----`, error);
      return null;
    }
  }

  public async findAdminByEmail(email: string): Promise<any> {
    try {
      const res = await this.adminRepository.find({
        where: {
          email: email,
        },
      });
      return res;
    } catch (error) {
      console.log(`---- ~ Error geting ADmin details ~ ---`, error);
      return null;
    }
  }

  public async getAllOrders(
    page: number = 0,
    pageSize: number = 15,
  ): Promise<any> {
    try {
      //const query = `Select * from order_entity where id > ? order by created_at desc limit ?`;
      const res = await this.orderRepository.find({
        where: {
          id: MoreThan(page),
        },
        order: {
          createdAt: 1,
        },
        take: pageSize,
      });
      return res;
    } catch (error) {
      console.log(`--- ~ Error fetching orders ~ ----`, error);
      return null;
    }
  }

  public async getAllTransactions(
    page: number = 0,
    pageSize: number = 15,
  ): Promise<any> {
    try {
      //const query = `select * from transaction_entity where id > ? order by created_at desc limit ?`;
      const res = await this.transactionRepository.find({
        where: {
          id: MoreThan(page),
        },
        order: {
          createdAt: 1,
        },
        take: pageSize,
      });
      return res;
    } catch (error) {
      console.log(`---- ~ error fetching transactions ~ ----`, error);
      return null;
    }
  }
  public async getOrder(body: any): Promise<any> {
    try {
      const query = `select * from order_entity where order_id = $1 and reciever_id = $2 and payer_id = $3`;
      const res = await this.db.query(query, [
        body.orderId,
        body.recieverId,
        body.payerId,
      ]);
      return res[0];
    } catch (error) {
      console.log(`--- ~ Error getting Order ~ ----`, error);
      return null;
    }
  }
  public async deleteOrder(body: any): Promise<any> {
    try {
      const query = `update order_entity set is_deleted = true where reciever_id = $1 and payer_id = $2 and order_id = $3`;
      const res = await this.db.query(query, [
        body.recieverId,
        body.payerId,
        body.orderId,
      ]);
      return res;
    } catch (error) {
      console.log(`--- ~ Error deleting order ~ ---`, error);
      return null;
    }
  }

  public async createOrderByAdmin(body: any): Promise<any> {
    try {
      const query = `Insert into order_entity (reciever_id, payer_id, order_id, order_amount, order_status, payment_link) VALUES ($1, $2, $3, $4, $5, $6)`;
      const res = await this.db.query(query, [
        body.recieverId,
        body.payerUserId,
        body.orderId,
        body.amount,
        body.orderStatus,
        JSON.stringify(body.paymentLink),
      ]);
      console.log(`response creating order`, res);
      return res;
    } catch (error) {
      console.log(`Error createOrderByAdmin`, error);
      return null;
    }
  }
  public async getOrderById(orderId: string): Promise<any> {
    try {
      const query = `Select * from order_entity where order_id = $1`;
      const res = await this.db.query(query, [orderId]);
      return res[0];
    } catch (error) {
      console.log(`error getting order by id`, error);
      return null;
    }
  }
  async updateStatus(body: any): Promise<any> {
    try {
      const query = `Update order_entity set order_status = $1 where order_id = $2`;
      const res = await this.db.query(query, [
        body.status.toUpperCase(),
        body.orderId,
      ]);
      return res[0];
    } catch (error) {
      console.log(`error updating order in SQL`, error);
      return null;
    }
  }
}
