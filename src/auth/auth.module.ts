import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key', // Clave secreta
      signOptions: { expiresIn: '1h' }, // Opcional: establece el tiempo de expiración
    }),
    UserModule, // Para validar usuarios en AuthService
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy], // Exporta JwtStrategy si lo necesitas en otro módulo
})
export class AuthModule {}
