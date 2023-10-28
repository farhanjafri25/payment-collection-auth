import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';

export class UserInvoice {
  @IsNotEmpty()
  @IsString()
  payerUserId: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsEnum(TransactionStatusEnum)
  orderStatus: TransactionStatusEnum;

  @IsEmail()
  @IsNotEmpty()
  payerEmail: string;
}
