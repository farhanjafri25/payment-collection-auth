import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { UserEntitiy } from '../entities/user.entity';

@Injectable()
export class UserAuthRepository {
  private userRepository: Repository<UserEntitiy>;
  constructor(private db: Connection) {
    this.userRepository = this.db.getRepository(UserEntitiy);
  }
  //Save User in DB
  public async saveUser(body: any): Promise<any> {
    try {
      const userObj = new UserEntitiy();
      userObj.userName = body.name;
      userObj.userId = body.userId;
      userObj.email = body.email;
      userObj.password = body.password;
      return await this.userRepository.save(userObj);
    } catch (error) {
      console.log(` error saveUser`, error);
      throw new BadRequestException('Sokethig went wrong');
    }
  }

  public async findUser(email: string): Promise<UserEntitiy> {
    try {
      const res = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      console.log(`---- User Obj through email ----`, res);
      return res;
    } catch (error) {
      console.log(`error getting user by email`, error);
      return null;
    }
  }
}
