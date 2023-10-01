import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('Hello')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // Hello HTTP GET
  @Get()
  getHelloGet(): string {
    return this.appService.getHello();
  }
  // Hello Post
  @Post()
  getHelloPost(): string {
    return this.appService.getHello();
  }
}
