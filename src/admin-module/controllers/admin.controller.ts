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
  @Get('/orders')
  async getAllOrders(
    @Query('type') type: string,
    @GetCurrentUser('id') adminId: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    const isAdmin = adminId.charAt(adminId.length - 1);
    if (!isAdmin) throw new BadRequestException('Not authorised to perform');
    const res = await this.adminService.getOrders(type, page, pageSize);
    return res;
  }

  @Delete('/delete-order')
  async deleteOrders(
    @Body() body: DeleteOrderDto,
    @GetCurrentUser('id') adminId: string,
  ): Promise<any> {
    const isAdmin = adminId.charAt(adminId.length - 1);
    if (!isAdmin) throw new BadRequestException('Not authorised to perform');
    const res = await this.adminService.deleteOrder(body);
    return res;
  }

  @Post('/create-order')
  async createOrder(
    @Body() body: CreateOrderAdmin,
    @GetCurrentUser('id') adminId: string,
  ): Promise<any> {
    const isAdmin = adminId.charAt(adminId.length - 1);
    if (!isAdmin) throw new BadRequestException('Not authorised to perform');
    if (
      !body.amount ||
      !body.orderStatus ||
      !body.payerUserId ||
      !body.reciverId
    )
      throw new BadRequestException('All fields are required');
    const res = await this.adminService.createOrder(body);
    return res;
  }

  @Post('/update-order-status')
  async updateOrderStatus(
    @Body() body: UpdateOrderStatus,
    @GetCurrentUser('id') adminId: string,
  ): Promise<any> {
    const isAdmin = adminId.charAt(adminId.length - 1);
    if (!isAdmin) throw new BadRequestException('Not authorised to perform');
    if (!body.status || !body.orderId)
      throw new BadRequestException('All fields are required');
    const res = await this.adminService.updateOrder(body);
    return res;
  }
}
