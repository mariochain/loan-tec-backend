import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UserService,
  ) {
    console.log('JWT_SECRET:', configService.get('JWT_SECRET')); // Log para verificar

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /*   async validate(payload: any) {
    const user = await this.usersService.findByControlNumber(
      payload.controlNumber,
    );

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return {
      userId: user.idUser,
      controlNumber: user.controlNumber,
      role: user.role.name,
    };
  } */
  async validate(payload: any) {
    console.log('Payload recibido:', payload);

    return {
      id: payload.id,
      controlNumber: payload.controlNumber,
      role: payload.role,
    };
  }
}
