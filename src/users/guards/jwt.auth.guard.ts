import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      // верификация и декодирование jwt token
      // добавляем эти данные, в обработчик маршрута или типо того.
      request.user = this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
