import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/user.dto';
import { AuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private JwtService: JwtService,
  ) {}
  // Error Handler почитать
  @Post('/reg')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const recordDB = await this.usersService.createUser(createUserDto);
    if (recordDB === 'success') {
      return 'Recording in DB is ok';
    } else {
      return 'Error';
    }
  }
  @Post('/auth')
  async authUser(@Body() authDto: AuthDto) {
    await this.usersService.authUser(authDto);
    const authDB = await this.usersService.authUser(authDto);
    if (authDB) {
      return authDB;
    } else {
      return 'User found';
    }
  }
}
