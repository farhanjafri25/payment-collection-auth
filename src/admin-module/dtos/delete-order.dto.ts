import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOrderDto {
  @IsString()
  @IsNotEmpty()
  payerId: string;
  @IsString()
  @IsNotEmpty()
  recieverId: string;
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
