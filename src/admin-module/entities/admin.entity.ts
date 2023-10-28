import { BaseEntity } from 'src/base/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin_details' })
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'admin_name', nullable: false })
  adminName: string;

  @Column({ name: 'admin_id', primary: true, nullable: false })
  adminId: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;
}
