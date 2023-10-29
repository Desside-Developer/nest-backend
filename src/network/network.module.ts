import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkService } from './services/network.service';
import { NetworkController } from './controllers/network.controller';
import { NetworkEntity } from './enteties/network.entity';
import { UsersEntity } from '../users/enteties/users.entity';

@Module({
  providers: [NetworkService],
  controllers: [NetworkController],
  imports: [TypeOrmModule.forFeature([NetworkEntity, UsersEntity])],
})
export class NetworkModule {}
