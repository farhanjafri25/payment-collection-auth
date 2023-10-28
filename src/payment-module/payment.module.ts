import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { Utility } from '../utils/utility';
import { PaymentController } from './controllers/payment.controller';
import { UserOrderController } from './controllers/user-order.controller';
import { PaymentRepository } from './repositories/payment.repository';
import { UserOrderRepository } from './repositories/user-order.repository';
import { PaymentService } from './services/payment.service';
import { UserOrderService } from './services/user-order.service';

@Module({
  imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
  controllers: [UserOrderController, PaymentController],
  providers: [
    UserOrderService,
    UserOrderRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    Utility,
    PaymentService,
    PaymentRepository,
  ],
  exports: [
    UserOrderService,
    UserOrderRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    Utility,
    PaymentService,
    PaymentRepository,
  ],
})
export class PaymentModule {}
