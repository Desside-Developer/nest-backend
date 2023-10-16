import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/user.dto';
import { Response, Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // ( Post /auth ) аутификация пользователя.
  @Post('/user')
  async AuthUser(@Body() authDto: AuthDto, @Res() res: Response) {
    const user = await this.authService.userAuthentication(authDto);
    if (user && typeof user !== 'string') {
      const payload = {
        username: user.username,
        sub: user.id,
      };
      // Создание JWT-токена
      const token = await this.authService.createJwtToken(payload);
      // Вывод токена в консоль
      console.log('JWT Token:', token);

      return res.status(200).json({ access_token: token });
    } else {
      return res.status(401).json({ message: 'Ошибка аутентификации' });
    }
  }
  // @Get('/user/menu')
  // @UseGuards(JwtAuthGuard)
  // getProtectedData(@Request() request: Request) {
  //   const user = request.user;
  //   return {
  //     message: 'This is a protected endpoint',
  //     user,
  //   };
  // }
}
