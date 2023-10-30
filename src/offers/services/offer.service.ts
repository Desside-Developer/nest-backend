import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferEntity } from '../enteties/offer.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { NetworkEntity } from '../../network/enteties/network.entity';
import { UsersEntity } from '../../users/enteties/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly OfferRepository: Repository<OfferEntity>,
    @InjectRepository(UsersEntity)
    private readonly UsersRepository: Repository<UsersEntity>,
  ) {}
  async offerSave(data) {
    const findOneByEmailUser = await this.UsersRepository.findOneBy({
      email: data.email,
    });
    if (!findOneByEmailUser) {
      return { message: 'Your email is not correct!' };
    } else {
      const checkUserPass = await bcrypt.compare(
        String(data.password),
        findOneByEmailUser.password,
      );
      if (checkUserPass) {
        if (findOneByEmailUser.ApiToken === null) {
          return { message: "You don't have an ApiToken" };
        } else {
          const user = await this.offersApiUrl(findOneByEmailUser.ApiToken, offsetValue, showValue);

          // await this.clearDataOffers();
          await this.saveDataOffers(user);
          return { message: 'User found, and data saved to the database.' };
        }
      } else {
        return { message: 'Your password is not correct!' };
      }
    }
  }

  async fetchAndSaveOffers(ApiToken, offset = 0, show = 500) {
    for (;;) {
      const offersData = await this.offersApiUrl(ApiToken, offset, show);

      if (offersData.length === 0) {
        break;
      }

      await this.saveDataOffers(offersData);
      offset += show;
      console.log(`Received and saved ${offset} offers.`);
    }

    console.log('All offers have been received and saved.');
  }

  async offersApiUrl(ApiToken, offset, show) {
    const getApiNetworks = `https://cpaw.cat/api/mon/offers.json?token=${ApiToken}&offset=${offset}&show=${show}`;
    const response = await axios.get(getApiNetworks);
    return response.data.offers || [];
  }

  async saveDataOffers(data) {
    for (const key in data) {
      const offerData = data[key];

      const offerEntity = this.OfferRepository.create({
        OfferId: offerData.id,
        active: offerData.active,
        name: offerData.name,
        info: offerData.info,
        nid: offerData.nid,
        network: offerData.network,
        url: offerData.url,
        add: offerData.add,
        time: offerData.time,
        date: offerData.date,
        first: offerData.first,
        sub: offerData.sub,
        goal: offerData.goal,
        goals: offerData.goals,
        geo: JSON.stringify(offerData.geo),
        private: offerData.private,
      });
      try {
        await this.OfferRepository.save(offerEntity);
        console.log(`Data for offer ${offerData.id} saved successfully`);
      } catch (error) {
        console.error(`Error saving data for offer ${offerData.id}:`, error);
      }
    }
    console.log('All offers have been saved.');
  }


  // Watch Kitty Api (InfoOffers)
  // @Cron(CronExpression.EVERY_DAY_AT_2AM)
  // @Cron(CronExpression.EVERY_DAY_AT, { hour: 2, minute: 0 })
  // @Cron('45 * * * * *')
  // async saveOffers {
  //   const show = 500;
  //   let offset = 0;
  //   while (true) {
  //     const apiData = await this.saveOffers(show, offset);
  //     if (!Array.isArray(apiData)) {
  //       console.log('Данные API не являются массивом:', apiData);
  //       break;
  //     }
  //     if (apiData.length === 0) {
  //       break;
  //     }
  //     try {
  //       const offers = apiData.map((apiOffer) => {
  //         const offer = this.OfferRepository.create();
  //         offer.id = apiOffer.id;
  //         offer.name = apiOffer.name;
  //         offer.url = apiOffer.info;
  //         return offer;
  //       })
  //     }
  //   }
  // }
  // async saveOffers() {
  //   const show = 500;
  //   let offset = 0;
  //   let allOffers = [];
  //   const apiData = await this.offersApi(show, offset);
  //   if (typeof apiData === 'object' && Object.keys(apiData).length > 0) {
  //     for (const key in apiData) {
  //       const apiOffer = apiData[key];
  //       const offer = this.OfferRepository.create({
  //         OfferId: apiOffer.id,
  //         name: apiOffer.name,
  //         domain: apiOffer.domain,
  //         offer: apiOffer.offer,
  //         auths: apiOffer.auths,
  //       });
  //       const savedOffer = await this.OfferRepository.save(offer);
  //       allOffers.push(savedOffer);
  //     }
  //     return console.log(allOffers);
  //   } else {
  //     return `Все данные успешно получены и сохранены. Всего получено ${allOffers.length} предложений.`;
  //   }
  // }
  //
  // async offersApi(show, offset) {
  //   const apiUrl = `https://cpaw.cat/api/mon/network.json?token=27d8de1e8dcc117efecaeb41a735f894c79`;
  //   const response = await axios.get(apiUrl);
  //   return response.data.offers;
  // }
  // async saveOffers() {
  //   const show = 500;
  //   let offset = 0;
  //   let allOffers = [];
  //   let apiData = await this.offersApi(show, offset);
  //   console.log(apiData);
  //   for (let offset = 0; Array.isArray(apiData) && apiData.length > 0; offset += show) {
  //     apiData = await this.offersApi(show, offset);
  //     try {
  //       const offers = apiData.map((apiOffer) => {
  //         return this.OfferRepository.create({
  //           offer: apiOffer.id,
  //           name: apiOffer.name,
  //           url: apiOffer.info,
  //         });
  //       });
  //       // await this.OfferRepository.save(offers);
  //       console.log('Offers saved:', offers.length);
  //       allOffers = allOffers.concat(offers);
  //     } catch (error) {
  //       console.error('Ошибка при сохранении данных в базу:', error);
  //     }
  //   }
  // }
  //
  // async offersApi(show, offset) {
  //   const apiUrl = `https://cpaw.cat/api/mon/network.json?token=27d8de1e8dcc117efecaeb41a735f894c79`;
  //   const response = await axios.get(apiUrl);
  //   return response.data.offers;
  // }
  // async saveOffersFromJson(apiData: Record<string, any>) {
  //   const offersToSave = Object.values(apiData).map(({ id, name, domain }) => ({
  //     OfferId: id.toString(),
  //     name,
  //     domain,
  //   }));
  //
  //   await this.OfferRepository.save(offersToSave);
  // }
}
