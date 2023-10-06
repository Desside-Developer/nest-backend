import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/reg')
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);
        // const recordDB =
        // if (recordDB === 'success'){
        //     return 'recording in DB is ok';
        // } else {
        //     return 'Error';
        // }
    }
}
// Error Handler почитать