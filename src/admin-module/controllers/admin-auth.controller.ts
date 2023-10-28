import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { Public } from 'src/decorators';
import { AdminLoginDto } from '../dtos/admin-login.dto';
import { AdminSignupDto } from '../dtos/admin-signup.dto';
import { AdminAuthService } from '../services/admin-auth.service';

@UseInterceptors(AppInterceptor)
@Controller('/admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Public()
  @Post('/signUp')
  async signupAdmin(@Body() body: AdminSignupDto): Promise<any> {
    if (!body.name || !body.email || !body.password)
      throw new BadRequestException('All fields are required');
    const validUserKeys = ['name', 'email', 'password'];
    const isValidUserObj = Object.keys(body).every((key) =>
      validUserKeys.includes(key),
    );
    if (!isValidUserObj) {
      throw new BadRequestException('Something Went Wrong');
    }
    if (!body['name'].match(/^[0-9a-zA-Z]+$/)) {
      throw new BadRequestException(
        'Username must not contain special characters',
      );
    }
    const res = await this.adminAuthService.adminSignUp(body);
    if (!res) throw new BadRequestException('Error saving admin');
    return res;
  }

  @Public()
  @Post('/login')
  public async loginUser(body: AdminLoginDto): Promise<any> {
    try {
      if (!body.email || !body.password)
        throw new BadRequestException('All fields are required');
      const validUserKeys = ['email', 'password'];
      const isValidUserObj = Object.keys(body).every((key) =>
        validUserKeys.includes(key),
      );
      if (!isValidUserObj) {
        throw new BadRequestException('Something Went Wrong');
      }
      const res = await this.adminAuthService.loginAdmin(body);
      return res;
    } catch (error) {}
  }
}
