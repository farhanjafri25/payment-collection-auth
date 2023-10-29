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
import { CreateOrderAdmin } from '../dtos/create-order.dto';
import { DeleteOrderDto } from '../dtos/delete-order.dto';
import { UpdateOrderStatus } from '../dtos/update-status.enum';
import { AdminService } from '../services/admin.services';

@UseInterceptors(AppInterceptor)
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  //API to get all orders for admin
  @Get('/orders')
  async getAllOrders(
    @Query('type') type: string,
    @GetCurrentUser('id') adminId: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    const res = await this.adminService.getOrders(type, page, pageSize);
    return {
      docs: res,
      nextPage: res[res.length - 1]?.id ?? null,
    };
  }
  //API to delete order by admin
  @Delete('/delete-order')
  async deleteOrders(@Body() body: DeleteOrderDto): Promise<any> {
    const res = await this.adminService.deleteOrder(body);
    return res;
  }

  //API to create order by admin
  @Post('/create-order')
  async createOrder(@Body() body: CreateOrderAdmin): Promise<any> {
    if (
      !body.amount ||
      !body.orderStatus ||
      !body.payerUserId ||
      !body.recieverId
    )
      throw new BadRequestException('All fields are required');
    const res = await this.adminService.createOrder(body);
    return res;
  }
  //Update order status by admin
  @Post('/update-order-status')
  async updateOrderStatus(@Body() body: UpdateOrderStatus): Promise<any> {
    if (!body.status || !body.orderId)
      throw new BadRequestException('All fields are required');
    const res = await this.adminService.updateOrder(body);
    return res;
  }
}
