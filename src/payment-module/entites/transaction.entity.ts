import { BaseEntity } from 'src/base/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transaction_entity' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: string;

  @Column({ name: 'transaction_id' })
  transactionId: string;

  @Column({ name: 'transaction_status' })
  transactionStatus: string;

  @Column({ name: 'order_amount' })
  orderAmount: string;

  @Column({ name: 'reciever_id' })
  recieverId: string;

  @Column({ name: 'payer_id' })
  payerId: string;
}
