import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin-module/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { postGresConfig } from './database/typeorm.config';
import { PaymentModule } from './payment-module/payment.module';
import { UserModule } from './user-module/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postGresConfig),
    UserModule,
    PaymentModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
