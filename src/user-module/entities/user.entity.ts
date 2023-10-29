import { BaseEntity } from 'src/base/entites/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'user_details' })
export class UserEntitiy extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Index()
  @Column({ name: 'user_id', primary: true, nullable: false })
  userId: string;

  @Index()
  @Column({ name: 'email', nullable: false, primary: true })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;
}
