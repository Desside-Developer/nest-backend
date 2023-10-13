import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  repeatPass: string;
}
export class AuthDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  login: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
