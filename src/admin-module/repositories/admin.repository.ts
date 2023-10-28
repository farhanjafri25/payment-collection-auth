import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';

@Injectable()
export class AdminRepository {
  private adminRepository: Repository<AdminEntity>;

  constructor(private db: Connection) {
    this.adminRepository = this.db.getRepository(AdminEntity);
  }

  public async saveAdmin(body: any): Promise<any> {
    try {
      const adminObj = new AdminEntity();
      adminObj.adminId = body.adminId;
      adminObj.adminName = body.name;
      adminObj.email = body.email;
      adminObj.password = body.password;
      const res = await this.adminRepository.save(adminObj);
      return res;
    } catch (error) {
      console.log(`---- ~ Error Saving Admin ~ ----`, error);
      return null;
    }
  }

  public async findAdminByEmail(body: any): Promise<any> {
    try {
      const res = await this.adminRepository.find({
        where: {
          adminId: body.adminId,
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
      const query = `Select * from order_entity where id > ? order by created_at desc limit ?`;
      const res = await this.db.query(query, [page, pageSize]);
      return res[0];
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
      const query = `select * from transaction_entity where id > ? order by created_at desc limit ?`;
      const res = await this.db.query(query, [page, pageSize]);
      return res[0];
    } catch (error) {
      console.log(`---- ~ error fetching transactions ~ ----`, error);
      return null;
    }
  }
  public async getOrder(body: any): Promise<any> {
    try {
      const query = `select * from order_entity where order_id = ? and reciever_id = ? and payer_id = ?`;
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
      const query = `update order_entity set is_deleted = 1 where reciever_id = ? and payer_id = ? and order_id = ?`;
      const res = await this.db.query(query, [
        body.reciever_id,
        body.payer_id,
        body.order_id,
      ]);
      return res;
    } catch (error) {
      console.log(`--- ~ Error deleting order ~ ---`, error);
      return null;
    }
  }

  public async createOrderByAdmin(body: any): Promise<any> {
    try {
      const query = `Insert into order_entity (reciever_id, payer_id, order_id, order_amount, order_status) VALUES (?,?,?,?,?)`;
      const res = await this.db.query(query, [
        body.recieverId,
        body.payerId,
        body.orderId,
        body.amount,
        body.orderStatus,
      ]);
      return res[0];
    } catch (error) {
      console.log(`Error createOrderByAdmin`, error);
      return null;
    }
  }
  public async getOrderById(orderId: string): Promise<any> {
    try {
      const query = `Select * from order_entity where order_id = "${orderId}"`;
      const res = await this.db.query(query);
      return res[0];
    } catch (error) {
      console.log(`error getting order by id`, error);
      return null;
    }
  }
  async updateStatus(body: any): Promise<any> {
    try {
      const query = `Update order_entity set order_status = ${body.orderStatus} where order_id = "${body.orderId}"`;
      const res = await this.db.query(query);
      return res[0];
    } catch (error) {
      console.log(`error updating order in SQL`, error);
      return null;
    }
  }
}
