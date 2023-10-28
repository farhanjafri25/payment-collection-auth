import {
  BadRequestException,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { Public } from 'src/decorators';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserDto } from '../dtos/user-signup.dto';
import { UserSignUpInterface } from '../interface/user-signup.interface';
import { UserAuthService } from '../services/user-auth.service';

@UseInterceptors(AppInterceptor)
@Controller('/user/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Public()
  @Post('/signup')
  public async userSignUp(body: UserDto): Promise<UserSignUpInterface> {
    try {
      if (!body.email || !body.password || !body.name) {
        throw new BadRequestException('All fields are required');
      }
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
      const res = await this.userAuthService.saveNewUser(body);
      return res;
    } catch (error) {}
  }

  @Public()
  @Post('/login')
  public async loginUser(body: UserLoginDto): Promise<UserSignUpInterface> {
    try {
      const validUserKeys = ['email', 'password'];
      const isValidUserObj = Object.keys(body).every((key) =>
        validUserKeys.includes(key),
      );
      if (!isValidUserObj) {
        throw new BadRequestException('Something Went Wrong');
      }
      if (!body.email || !body.password)
        throw new BadRequestException('Enter all the fields');
      const res = await this.userAuthService.loginUser(body);
      return res;
    } catch (error) {}
  }
}
