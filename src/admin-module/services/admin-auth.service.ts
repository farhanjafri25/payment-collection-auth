import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';
import * as bcrypt from 'bcryptjs';
import { genSalt, hash } from 'bcryptjs';
import { Utility } from '../../utils/utility';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly utility: Utility,
    private readonly jwtService: JwtService,
  ) {}

  public async adminSignUp(body: any): Promise<any> {
    try {
      const salt = await genSalt(10);
      const passwordHash = await hash(body.password, salt);
      const adminId = this.utility.getUniqueId(true);
      const res = await this.adminRepository.saveAdmin({
        adminId: adminId,
        password: passwordHash,
        email: body.email,
        adminName: body.name,
      });
      if (res) {
        const payload = {
          id: adminId,
          email: body.email,
          name: body.name,
        };
        const accessToken = this.jwtService.sign(payload, {
          expiresIn: '30d',
        });
        return {
          adminId,
          email: body.email,
          name: body.name,
          accessToken: accessToken,
        };
      }
      return null;
    } catch (error) {
      console.log(`--- ~ Error saving admin ~ ----`, error);
      return null;
    }
  }

  public async loginAdmin(body: any): Promise<any> {
    try {
      //Find admin by email to check admin record
      const admin = await this.adminRepository.findAdminByEmail(body.email);
      if (!admin) throw new BadRequestException('Not authorised to perform');
      console.log(`comparePassword`, admin);
      const comparePassword = await bcrypt.compare(
        body.password,
        admin.password,
      );

      if (!comparePassword) {
        throw new BadRequestException('Passwords do not match');
      }
      const accessToken = this.jwtService.sign(
        {
          id: admin.adminId,
          email: admin.email,
          name: admin.adminName,
        },
        {
          expiresIn: '30d',
        },
      );
      return {
        accessToken: accessToken,
        username: admin.adminName,
        adminId: admin.adminId,
        email: admin.email,
      };
    } catch (error) {
      console.log(`---- ~ Error loggin Admin ~ ----`, error);
      return null;
    }
  }
}
