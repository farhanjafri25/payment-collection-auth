import {
  BadRequestException,
  Body,
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

  /*API to sign-up for a user, Input parameters are name, email, password*/
  @Public()
  @Post('/signup')
  public async userSignUp(@Body() body: UserDto): Promise<UserSignUpInterface> {
    if (!body.email || !body.password || !body.name) {
      throw new BadRequestException('All fields are required');
    }
    //Validation to check if the incoming body request has these keys
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
  }

  /** API to login for a user, input fields are email and password */
  @Public()
  @Post('/login')
  public async loginUser(
    @Body() body: UserLoginDto,
  ): Promise<UserSignUpInterface> {
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
