import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt'; // JWT
import * as bcrypt from 'bcrypt'; // Импорт bcrypt
import { Repository } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Repository: Repository<UsersEntity>,
  ) {}
  // private readonly jwtService: JwtService,

  async createUser(data) {
    const reg = await this.Repository.create(data);
    await this.Repository.save(reg);
    return 'success';
  }
  async authUser(data) {
    const userName = await this.Repository.findOneBy({
      username: data.username,
    });
    if (!userName) {
      const userEmail = await this.Repository.findOneBy({
        email: data.login,
      });
      if (userEmail) {
        const decryptPass = await bcrypt.compare(
          data.password,
          userEmail.password,
        );
        if (decryptPass) {
          return userEmail;
        } else {
          return { message: 'Password do not correct' };
        }
      }
    }
  }
  // async login(user: UsersEntity) {
  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
