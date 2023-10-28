import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteInvoice {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  payerId: string;
}
