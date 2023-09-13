import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TestModule,
    ConfigModule.forRoot({
      envFilePath: 'env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE,
      entities: ['dist/entities/**/*.entity.js'],
      synchronize: Boolean(process.env.SYNCHRONIZE),
      // migrations: [ 'dist/db/migrations/**/*.js ]
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
