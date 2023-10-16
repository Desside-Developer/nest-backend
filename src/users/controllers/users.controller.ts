import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/user.dto';
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Error Handler почитать
  // ( Post /reg ) регистрация пользователя.
  @Post('/reg')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
  // Настраиваем для тестирования http запросов curl * отдельно
  // -
}
