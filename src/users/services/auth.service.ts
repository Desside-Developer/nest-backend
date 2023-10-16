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
  async userAuthentication(authDto: AuthDto) {
    const { login, password } = authDto;
    const checkIsEmailUser = this.checkIsEmailUser(login);
    if (login.includes('@')) {
      return { message: 'Логин не может содержать символ "@"' };
    }
    const findUserRepository = await this.AuthRepository.findOne({
      where: checkIsEmailUser ? { email: login } : { username: login },
    });
    if (!findUserRepository) {
      return { message: 'Пользователь не найден!' };
    }
    const userIsPasswordValidate = await bcrypt.compare(
      password,
      findUserRepository.password,
    );
    if (!userIsPasswordValidate) {
      return { message: 'Неправильный пароль!' };
    }
    return {
      findUserRepository,
      username: findUserRepository.username,
      id: findUserRepository.id,
    };
  }
  async checkIsEmailUser(login) {
    return login.includes('@');
  }
  async createJwtToken(user) {
    const userPayload = { username: user.username, sub: user.id };
    return this.jwtService.sign(userPayload);
  }
}
