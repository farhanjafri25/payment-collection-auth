import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionStatusEnum } from '../../payment-module/enums/transaction-status.enum';

export class UpdateOrderStatus {
  @IsString()
  @IsNotEmpty()
  orderId: string;
  @IsEnum(TransactionStatusEnum)
  @IsNotEmpty()
  status: TransactionStatusEnum;
}
