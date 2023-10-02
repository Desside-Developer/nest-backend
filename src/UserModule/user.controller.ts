import { Body, Controller, Get, Param, Post, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import { UserDto, UserParamsDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {

  }
  // HTTP GET /user
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
  @Get()
  getUser(@Param() param: UserParamsDto): User {
    return this.userService.getUser(param.email);
  }
  // HTTP POST /USER
  @Post()
  @UsePipes(new ValidationPipe(

  ))
  PostUser(@Body() user: User): User {
    return this.userService.addUser(user);
  }
  // HTTP DELETE /users/EMAIL@GMAIL.COM
  @Delete('/:email')
  DeleteUser(@Param() params: UserParamsDto): User[] {
    return this.userService.deleteUser(params.email);
  }
}
