import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository, EntityManager } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';
import * as EmailValidator from 'email-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Repository: Repository<UsersEntity>,
  ) {}

  // Регистрация пользователя ( ниже )
  async createUser(data) {
    try {
      if (!EmailValidator.validate(data.email)) {
        return { message: 'Некорректный формат email-адреса' };
      }
      const hash = await bcrypt.hash(data.password, 10);
      const userReg = this.Repository.create({
        username: data.username,
        email: data.email,
        password: hash,
      });
      if (data.password === data.repeatPass) {
        const checkEmailUser = await this.Repository.findOne({
          where: { email: data.email },
        });
        if (checkEmailUser) {
          return { message: 'Пользователь с таким email уже существует' };
        }
        const checkUserName = await this.Repository.findOne({
          where: { username: data.username },
        });
        if (checkUserName) {
          return { message: 'Пользователь уже существует с таким псевдонимом' };
        } else {
          await this.Repository.save(userReg);
          return { message: 'Пользователь создан!' };
        }
      } else {
        return { message: 'Пароли не совпадают' };
      }
    } catch (error) {
      // Откат транзакции при возникновении ошибки.
      return { message: 'Произошла ошибка при создании пользователя' };
    }
  }
}
