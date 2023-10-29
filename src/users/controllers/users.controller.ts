import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthDto, CreateUserDto, TokenDto } from '../dto/user.dto';
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
  @Post('/user')
  async AuthUser(@Body() authDto: AuthDto, @Res() response) {
    try {
      const result = await this.usersService.authUser(authDto);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  @Post('/token')
  async TokenUser(@Body() tokenDto: TokenDto) {
    return await this.usersService.saveToken(tokenDto);
  }
}
