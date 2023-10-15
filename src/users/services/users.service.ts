import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository, EntityManager } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';
import * as EmailValidator from 'email-validator';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthDto } from '../dto/user.dto';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OfferEntity } from '../enteties/offer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly Repository: Repository<UsersEntity>,
    @InjectRepository(OfferEntity)
    private readonly OfferRepository: Repository<OfferEntity>,
    private jwtService: JwtService,
  ) {}
  // private readonly mailerService: MailerService,
  async findAll() {
    return await this.Repository.find();
  }
  async findUsernames() {
    const users = await this.Repository.find();
    return users.map((username) => username.username);
  }
  async findEmails() {
    const UsersInfoEmails = await this.Repository.find();
    return UsersInfoEmails.map((email) => email.email);
  }
  async findPass() {
    const UsersInfoPass = await this.Repository.find();
    return UsersInfoPass.map((pass) => pass.password);
  }
  async findWebTokens() {
    const UsersWebToken = await this.Repository.find();
    return UsersWebToken.map((webtoken) => webtoken.confirmationToken);
  }
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
  async authUser(authDto: AuthDto) {
    const { login, password } = authDto;
    const isEmail = this.isEmail(login);
    const user = await this.Repository.findOne({
      where: isEmail ? { email: login } : { username: login },
    });
    if (!user) {
      return { message: 'Пользователь не найден' };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: 'Неправильный пароль' };
    }
    // Если пользователь найден и пароль верный получаем эти данные
    return { user, username: user.username, id: user.id };
  }

  private isEmail(login: string): boolean {
    // проверка на email по наличию символа @
    return login.includes('@');
  }
  async createJwtToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.sign(payload);
    return token;
  }
  // Watch Kitty Api (InfoOffers)
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  // Для более точного времени. (ниже)
  // @Cron(CronExpression.EVERY_DAY_AT, { hour: 2, minute: 0 })
  // @Cron('45 * * * * *')
  async fetchAndSaveOffers(show = 500) {
    try {
      let offset = 0;
      const processedOffers = new Set<number>();
      while (true) {
        if (processedOffers.has(offset)) {
          break; // Прерываем цикл, если уже обработали этот offset
        }
        const apiData = await this.fetchOffersFromApi(show, offset);
        if (Object.keys(apiData).length === 0) {
          break; // Стопаем цикл если нет данных
        }
        const offers = this.transformApiDataToOffers(apiData);
        await this.saveOffersToDatabase(offers);
        processedOffers.add(offset);
        offset += show;
      }
      return 'Данные успешно получены и сохранены.';
    } catch (error) {
      throw new Error('Произошла ошибка: ' + error.message);
    }
  }
  async fetchOffersFromApi(show: number, offset: number) {
    const apiUrl = `https://cpaw.cat/api/mon/offers.json?token=27d8de1e8dcc117efecaeb41a735f894c79&show=${show}&offset=${offset}`;
    const response = await axios.get(apiUrl);
    return response.data.offers;
  }
  transformApiDataToOffers(apiData: any): OfferEntity[] {
    const offers: OfferEntity[] = [];
    for (const key in apiData) {
      const apiOffer = apiData[key];
      const offer = new OfferEntity();
      offer.id = apiOffer.id;
      offer.show = apiOffer.name;
      offer.info = apiOffer.info; // Записываем в колонки то что получаем
      offers.push(offer);
    }
    return offers;
  }
  async saveOffersToDatabase(offers: OfferEntity[]) {
    return await this.OfferRepository.save(offers);
  }
}
