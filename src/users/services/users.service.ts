import { Injectable } from '@nestjs/common';
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
  // Регистрация пользователя ( ниже )
  async createUser(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const userReg = this.Repository.create({
      username: data.username,
      password: hash,
      email: data.email,
    });
    await this.Repository.save(userReg);
    return { message: 'Пользователь создан!' };
  }
  // Аутификация пользователя ( ниже )
  jwt = require('jsonwebtoken');
  async authUser(data) {
    const checkUser = await this.Repository.findOneBy({
      username: data.login,
      email: data.login,
    });
    if (checkUser) {
      const bcryptPass = await bcrypt.compare(
        data.password,
        checkUser.password,
      );
      if (bcryptPass) {
        const token = this.jwt.sign(
          {
            userId: checkUser.id, // логика определения
          },
          'secret-key', // секретный ключ
          { expiresIn: '5h' }, // Указываем время жизни токена (5 часов)
        );
        return checkUser;
      } else {
        return { message: 'Пароль не корректный' }; // Error Handler
      }
    } else {
      return { message: 'Пользователь не был найден' }; // Error Handler добавить сюда
    }
  }
}
