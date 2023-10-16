import { Controller } from '@nestjs/common';
import { CronService } from '../services/cron.service';

@Controller('/cron')
export class CronController {
  constructor(private readonly offerService: CronService) {}
}
