import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';

export class UserRoleDto {
  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  public type: UserRoleEnum;
}
