import { BaseEntity } from 'src/base/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_details' })
export class UserEntitiy extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'user_id', primary: true, nullable: false })
  userId: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;
}
