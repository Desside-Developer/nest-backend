import { Controller, Get } from '@nestjs/common';
import { FindService } from '../services/find.service';

@Controller()
export class FindController {
  constructor(private readonly findService: FindService) {}
  // Получение всей информации о пользователях
  @Get('/userInfo')
  async usersInfo() {
    return await this.findService.findAll();
  }
  // Получение информации о именах-пользователей
  @Get('/userInfo/usernames')
  async usersInfoUsernames() {
    return await this.findService.findUsernames();
  }
  // Получение информации о почтах-пользователей
  @Get('/UserInfo/emails')
  async usersInfoEmail() {
    return await this.findService.findEmails();
  }
  // Полученеи информации о паролях-зашифрованных-пользователей
  @Get('/UserInfo/password')
  async usersInfoPass() {
    return await this.findService.findPass();
  }
  // Получение информации о веб-токенах-пользователей
  @Get('/UserInfo/webtoken')
  async usersInfoWebTokens() {
    return await this.findService.findPass();
  }
}
