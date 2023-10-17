import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../enteties/users.entity';
import { Repository } from 'typeorm';
import { AuthDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly AuthRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async authUser(UserInfo: AuthDto) {
    try {
      const checkEmail = await this.AuthRepository.findOneBy({
        email: UserInfo.login,
      });
      if (!checkEmail) {
        const usernameCheck = await this.AuthRepository.findOneBy({
          username: UserInfo.login,
        });
        if (usernameCheck) {
          const bcryptUsername = await bcrypt.compare(
            UserInfo.password,
            usernameCheck.password,
          );
          if (bcryptUsername) {
            const token = await this.createJwtToken(usernameCheck);
            return {
              // access_token: token,
              id: usernameCheck.id,
              // email: usernameCheck.email,
            };
          } else {
            return { message: 'Пароль неверный' };
          }
        } else {
          return { message: 'Пользователь не найден' };
        }
      } else {
        const bcryptEmail = await bcrypt.compare(
          UserInfo.password,
          checkEmail.password,
        );
        if (bcryptEmail) {
          const token = await this.createJwtToken(checkEmail);
          return {
            // access_token: token,
            id: checkEmail.id,
            // email: checkEmail.email,
          };
        } else {
          return { message: 'Пароль неверный' };
        }
      }
    } catch (error) {
      return { message: 'Ошибка сервера' };
    }
  }
  async createJwtToken(user) {
    const userPayload = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return this.jwtService.sign(userPayload);
  }
}
