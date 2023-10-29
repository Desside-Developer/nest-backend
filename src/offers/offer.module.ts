import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './enteties/offer.entity';
import { OfferController } from './controllers/offer.controller';
import { OfferService } from './services/offer.service';
import { UsersEntity } from '../users/enteties/users.entity';

@Module({
  providers: [OfferService],
  controllers: [OfferController],
  imports: [TypeOrmModule.forFeature([OfferEntity, UsersEntity])],
})
export class OfferModule {}
