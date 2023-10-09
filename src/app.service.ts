import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  showMessage(): string {
    const message = 'Пример';
    console.log(message);
    return message;
  }
}
