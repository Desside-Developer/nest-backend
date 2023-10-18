import { Body, Controller, Get, Post } from '@nestjs/common';
import { OfferService } from '../services/offer.service';

@Controller('/offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  // @Get('/api/save')
  // async getApiReq() {
  //   return await this.offerService.saveOffers();
  // }
  // @Get('/api/save1')
  // async getApiReque() {
  //   return await this.offerService.getNetworks();
  // }
  // @Post('save-from-api')
  // async saveOffersFromApi(@Body() apiData: Record<string, any>) {
  //   await this.offerService.saveOffersFromJson(apiData);
  // }
}
