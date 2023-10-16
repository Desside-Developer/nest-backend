import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';
import * as EmailValidator from 'email-validator';
import { randomBytes } from 'crypto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Repository: Repository<UsersEntity>,
  ) {}
  // private readonly mailerService: MailerService,
  // Регистрация пользователя ( ниже )
  async createUser(data) {
    try {
      const confirmationToken = randomBytes(16).toString('hex');
      if (!EmailValidator.validate(data.email)) {
        return { message: 'Некорректный формат email-адреса' };
      }
      const hash = await bcrypt.hash(data.password, 10);
      const userReg = this.Repository.create({
        username: data.username,
        email: data.email,
        password: hash,
        confirmationToken,
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
          // const confirmationLink = `https://example.com/confirm/${data.confirmationToken}`;
          // await this.mailerService.sendEm({
          //   to: data.email,
          //   subject: 'Подтверждение регистрации',
          //   template: 'confirmation', // Шаблон письма
          //   context: {
          //     confirmationLink,
          //   },
          // });
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
