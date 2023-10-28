import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { Utility } from '../utils/utility';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminController } from './controllers/admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminService } from './services/admin.services';

@Module({
  imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
  controllers: [AdminAuthController, AdminController],
  providers: [
    AdminAuthService,
    AdminService,
    Utility,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AdminRepository,
  ],
  exports: [
    AdminAuthService,
    AdminService,
    Utility,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AdminRepository,
  ],
})
export class AdminModule {}
