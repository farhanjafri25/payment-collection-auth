import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';

export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  public transactionId: string;

  @IsNotEmpty()
  @IsString()
  public orderId: string;

  @IsNotEmpty()
  @IsString()
  public razorpaySignature: string;

  @IsEnum(TransactionStatusEnum)
  @IsNotEmpty()
  public orderStatus: TransactionStatusEnum;
}
