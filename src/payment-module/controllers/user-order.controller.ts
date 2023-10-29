import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { GetCurrentUser } from 'src/decorators';
import { UserInvoice } from '../dtos/create-invoice.dto';
import { DeleteInvoice } from '../dtos/delete-invoice.dto';
import { UserOrderService } from '../services/user-order.service';

@UseInterceptors(AppInterceptor)
@Controller('/user')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  //Get user Orders, queryParam type to distinguish between reciever and payer
  @Get('/orders')
  async getUserPayments(
    @Query('type') type: string,
    @GetCurrentUser('id') userId: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    if (!type) throw new BadRequestException('Something went wrong');
    const res = await this.userOrderService.getUserOrders(
      type,
      userId,
      page,
      pageSize,
    );
    return {
      docs: res,
      nextPage: res[res.length - 1]?.id ?? null,
    };
  }
  //Create order by a user
  @Post('/create-order')
  async createUserOrder(
    @Body() body: UserInvoice,
    @GetCurrentUser('id') userId: string,
  ): Promise<any> {
    if (!body.amount) throw new BadRequestException('Amount should be added');
    if (!body.payerUserId)
      throw new BadRequestException('Payer should be added');
    const res = await this.userOrderService.createUserOrder({
      ...body,
      userId,
    });
    return res;
  }
  //Delete order by user
  @Delete(`/delete-order`)
  async deleteUserOrder(
    @Body() body: DeleteInvoice,
    @GetCurrentUser('id') userId: string,
  ): Promise<any> {
    if (!body.orderId || !body.payerId)
      throw new BadRequestException('All details are required');
    const res = await this.userOrderService.deleteUserOrder({
      ...body,
      userId,
    });
    if (!res) throw new BadRequestException('Something went wrong');
    return {
      code: 201,
      message: 'Deleted successsfully!',
    };
  }
}
