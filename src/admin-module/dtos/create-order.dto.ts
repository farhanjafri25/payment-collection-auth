import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { TransactionStatusEnum } from '../../payment-module/enums/transaction-status.enum';

export class CreateOrderAdmin {
  @IsNotEmpty()
  @IsString()
  payerUserId: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  reciverId: string;

  @IsEnum(TransactionStatusEnum)
  orderStatus: TransactionStatusEnum;
}
