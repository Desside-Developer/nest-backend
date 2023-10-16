import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferEntity } from '../enteties/offer.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly OfferRepository: Repository<OfferEntity>,
  ) {}
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
