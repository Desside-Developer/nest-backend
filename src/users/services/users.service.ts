import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Repository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const userReg = this.Repository.create({
      username: data.username,
      password: hash,
      email: data.email,
    });
    console.log(userReg);
    await this.Repository.save(userReg);
    return 'success';
  }
  async authUser(data) {
    const userName = await this.Repository.findOneBy({ username: data.username });
    if (!userName) {
      const userEmail = await this.Repository.findOneBy({ email: data.email });
      if (userEmail) {
        const decryptPass = await bcrypt.compare(
          data.password,
          userEmail.password,
        );
        if (decryptPass) {
          return {
            access_token: await this.jwtService.signAsync(userEmail),
          };
        } else {
          return { message: 'Password do not correct' };
        }
      }
    }
    if (userName) {
      const decryptPass = await bcrypt.compare(
        data.password,
        userName.password,
      );
      if (decryptPass) {
        return {
          access_token: await this.jwtService.signAsync(userName),
        };
      } else {
        return { message: 'Password is not correct' };
      }
    } else {
      return { message: 'user not found' };
    }
  }
}
