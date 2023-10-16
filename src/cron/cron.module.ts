import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronService } from './services/cron.service';
import { CronController } from './controllers/cron.controllers';
import { CronEntity } from './enteties/cron.entity';

@Module({
  providers: [CronService],
  controllers: [CronController],
  imports: [TypeOrmModule.forFeature([CronEntity])],
})
export class CronModule {}
