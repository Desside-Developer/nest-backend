import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CronEntity } from '../enteties/cron.entity';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(CronEntity)
    private readonly CronRepository: Repository<CronEntity>,
  ) {}
}
