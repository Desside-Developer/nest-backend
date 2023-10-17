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
  async saveOffers() {
    const show = 500;
    let offset = 0;
    let offsets = [];
    const apiData = await this.offersApi(show, offset);
    for () {

    }
  }

  async offersApi(show, offset) {
    const apiUrl = `https://cpaw.cat/api/mon/offers.json?token=27d8de1e8dcc117efecaeb41a735f894c79&show=${show}&offset=${offset}`;
    const response = await axios.get(apiUrl);
    return response.data.offers;
  }
}
