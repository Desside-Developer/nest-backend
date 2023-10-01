import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from './interface/user';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {

  }
  // HTTP GET /USERS
  @Get()
  GetUsers(): User[] {
    return this.userService.getUsers();
  }
  // HTTP POST /USER
  @Post()
  PostUser(@Body() user: User): User {
    return this.userService.addUser(user);
  }
  // HTTP DELETE /users/EMAIL@GMAIL.COM
  @Delete('/:email')
  DeleteUser(@Param('email') email: string): User[] {
    return this.userService.deleteUser(email);
  }
}
