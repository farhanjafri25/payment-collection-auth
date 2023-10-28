import { BaseEntity } from 'src/base/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_entity' })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'reciever_id', nullable: false })
  recieverId: string;

  @Column({ name: 'payer_id', nullable: false })
  payerId: string;

  @Column({ name: 'order_id', nullable: false, unique: true })
  orderId: string;

  @Column({ name: 'order_amount' })
  price: number;

  @Column({ name: 'order_status' })
  orderStatus: string;

  @Column({ name: 'order_type', nullable: true })
  orderType: string;

  @Column({ name: 'payment_link', nullable: false })
  paymentLink: string;
}
