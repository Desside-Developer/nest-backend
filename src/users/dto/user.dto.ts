import { IsString, MinLength, MaxLength, IsEmail, Matches } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'Поле "username" должно быть строкой' })
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString({ message: 'Поле "ПАРОЛЬ" должно быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(20, { message: 'Пароль должен содержать максимум 20 символов' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
    message:
      'Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву и одну цифру',
  })
  password: string;
  @IsEmail({}, { message: 'Некорректный формат email-адреса' })
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
