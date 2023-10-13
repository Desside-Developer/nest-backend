import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, AuthDto } from '../dto/user.dto';
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Error Handler почитать
  // ( Post /reg ) регистрация пользователя.
  @Post('/reg')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
  // ( Post /auth ) аутификация пользователя.
  // @Post('/auth')
  // async authUser(@Body() authDto: AuthDto) {
  //   return await this.usersService.authUser(authDto);
  // }
}
