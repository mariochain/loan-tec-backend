import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log('Encabezado Authorization:', authHeader);

    const token = authHeader?.split(' ')[1];
    console.log('Token recibido:', token);
    console.log('Valor de JWT_SECRET:', process.env.JWT_SECRET);

    return super.canActivate(context) as boolean;
  }
}
