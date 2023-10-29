import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { TransactionStatusEnum } from '../../payment-module/enums/transaction-status.enum';

export class CreateOrderAdmin {
  @IsNotEmpty()
  @IsString()
  payerUserId: string;

  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  @IsString()
  recieverId: string;

  @IsEnum(TransactionStatusEnum)
  orderStatus: TransactionStatusEnum;

  @IsEmail()
  @IsNotEmpty()
  payerEmail: string;
}
