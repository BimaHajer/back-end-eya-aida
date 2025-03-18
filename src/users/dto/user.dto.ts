import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  readonly firstName?: string;

  @ApiProperty()
  readonly lastName?: string;

  @ApiProperty()
  readonly phone?: string;
  @ApiProperty()
  roleId :any;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  picture?: string;

  saltRounds?: string;
  readonly token?: string;

  @ApiProperty()
  readonly active?: boolean;
  @ApiProperty()
  readonly address?: string;

  @ApiProperty()
  readonly zipCode?: string;

  createdBy?: number;
}
