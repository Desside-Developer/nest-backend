import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, AuthDto } from '../dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
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
  @Get('/api/save')
  async getApiReq() {
    return await this.usersService.fetchAndSaveOffers();
  }
  // Настраиваем для тестирования http запросов curl * отдельно
  // -
  // Получение всей информации о пользователях
  @Get('/userInfo')
  async usersInfo() {
    return await this.usersService.findAll();
  }
  // Получение информации о именах-пользователей
  @Get('/userInfo/usernames')
  async usersInfoUsernames() {
    return await this.usersService.findUsernames();
  }
  // Получение информации о почтах-пользователей
  @Get('/UserInfo/emails')
  async usersInfoEmail() {
    return await this.usersService.findEmails();
  }
  // Полученеи информации о паролях-зашифрованных-пользователей
  @Get('/UserInfo/password')
  async usersInfoPass() {
    return await this.usersService.findPass();
  }
  // Получение информации о веб-токенах-пользователей
  @Get('/UserInfo/webtoken')
  async usersInfoWebTokens() {
    return await this.usersService.findPass();
  }
  // ( Post /auth ) аутификация пользователя.
  @Post('/auth')
  async AuthUser(@Body() authDto: AuthDto, @Res() res: Response) {
    const user = await this.usersService.authUser(authDto);
    if (user && typeof user !== 'string') {
      const payload = {
        username: user.username,
        sub: user.id,
      };
      // Создание JWT-токена
      const token = await this.usersService.createJwtToken(payload);
      // Вывод токена в консоль
      console.log('JWT Token:', token);

      return res.status(200).json({ access_token: token });
    } else {
      return res.status(401).json({ message: 'Ошибка аутентификации' });
    }
  }
}
