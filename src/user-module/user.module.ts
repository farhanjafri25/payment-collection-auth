import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { Utility } from '../utils/utility';
import { UserAuthController } from './controllers/user-auth.controller';
import { UserAuthRepository } from './repositories/user.reposity';
import { UserAuthService } from './services/user-auth.service';

@Module({
  imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
  controllers: [UserAuthController],
  providers: [
    UserAuthService,
    UserAuthRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    Utility,
  ],
  exports: [
    UserAuthService,
    UserAuthRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    Utility,
  ],
})
export class UserModule {}
