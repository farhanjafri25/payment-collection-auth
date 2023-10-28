import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user-signup.dto';
import { UserSignUpInterface } from '../interface/user-signup.interface';
import { UserAuthRepository } from '../repositories/user.reposity';
import { genSalt, hash } from 'bcryptjs';
import { Utility } from 'src/utils/utility';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dtos/user-login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userAuthRepository: UserAuthRepository,
    private utility: Utility,
    private readonly jwtService: JwtService,
  ) {}

  public async saveNewUser(body: UserDto): Promise<UserSignUpInterface> {
    try {
      const salt = await genSalt(10);
      const passwordHash = await hash(body.password, salt);
      const userId = this.utility.getUniqueId();
      const res = await this.userAuthRepository.saveUser({
        userId: userId,
        password: passwordHash,
        email: body.email,
        name: body.name,
      });
      if (res) {
        const payload = {
          id: userId,
          email: body.email,
          name: body.name,
        };
        const accessToken = this.jwtService.sign(payload, {
          expiresIn: '30d',
        });
        return {
          userId,
          email: body.email,
          username: body.name,
          accessToken: accessToken,
        };
      }
    } catch (error) {}
  }

  public async loginUser(body: UserLoginDto): Promise<UserSignUpInterface> {
    try {
      const user = await this.userAuthRepository.findUser(body.email);
      if (!user) throw new BadRequestException('Not authorized to perform');
      const comparePassword = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (!comparePassword) {
        throw new BadRequestException('Passwords do not match');
      }
      const accessToken = await this.jwtService.sign({
        userId: user.id,
        email: user.email,
        name: user.userName,
      });
      return {
        accessToken: accessToken,
        username: user.userName,
        userId: user.userId,
        email: user.email,
      };
    } catch (error) {}
  }
}
