import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersEntity } from './enteties/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FindService } from './services/find.service';
import { FindController } from './controllers/find.controller';

@Module({
  providers: [UsersService, FindService],
  controllers: [UsersController, FindController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        '5b0f65c68f589c1c6035d1f0f3cc9461f22b23a2f9c233a1c8c7a9e5d88de9f1',
      signOptions: { expiresIn: '5h' },
    }),
    // MailerModule.forRoot(mailerConfig),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
})
export class UsersModule {}
