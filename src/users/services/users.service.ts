import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';
import * as EmailValidator from 'email-validator';
import { randomBytes } from 'crypto';
import {AuthDto, TokenDto} from "../dto/user.dto";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Repository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}
  // private readonly mailerService: MailerService,
  // Регистрация пользователя ( ниже )
  async createUser(data) {
    try {
      // const confirmationToken = randomBytes(16).toString('hex');
      if (!EmailValidator.validate(data.email)) {
        return { message: 'Некорректный формат email-адреса' };
      }
      const hash = await bcrypt.hash(data.password, 10);
      const userReg = this.Repository.create({
        username: data.username,
        email: data.email,
        password: hash,
        // confirmationToken,
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
  async authUser(UserInfo: AuthDto) {
    try {
      const checkEmail = await this.Repository.findOneBy({
        email: UserInfo.login,
      });
      if (!checkEmail) {
        const usernameCheck = await this.Repository.findOneBy({
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
              access_token: token,
              id: usernameCheck.id,
              email: usernameCheck.email,
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
            access_token: token,
            id: checkEmail.id,
            email: checkEmail.email,
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
  async saveToken(tokenDto) {
    const TokenEmail = await this.Repository.findOneBy({
      email: tokenDto.email
    })
    if (!TokenEmail) {
      return { message: 'Email not found' }
    } else {
      TokenEmail.ApiToken = tokenDto.token;
      await this.Repository.save(TokenEmail);
      return { message: 'Successful save your token!'};
    }

  }
}
