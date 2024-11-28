import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtén los roles requeridos de los metadatos
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    console.log('que es', requiredRoles);

    if (!requiredRoles || requiredRoles.length === 0) {
      // Si no hay roles requeridos, permite el acceso
      return true;
    }

    // Obtén el usuario del contexto (por ejemplo, del JWT)
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('Request', request);

    if (!user) {
      throw new UnauthorizedException(
        'No se encontró al usuario en la solicitud.',
      );
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este recurso.',
      );
    }

    return true; // Permite el acceso si el rol del usuario coincide
  }
}
