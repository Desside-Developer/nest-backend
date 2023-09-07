import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TestModule, ConfigModule.forRoot({
      envFilePath: 'env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
