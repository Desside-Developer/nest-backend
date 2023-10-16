import { Controller, Get } from '@nestjs/common';
import { OfferService } from '../services/offer.service';

@Controller('/offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  @Get('/api/save')
  async getApiReq() {
    return await this.offerService.fetchAndSaveOffers();
  }
}
