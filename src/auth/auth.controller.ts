import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    const user = await this.authService.validateUser(
      loginDto.controlNumber,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Número de control o contraseña incorrectos',
      );
    }
    return this.authService.login(user);
  }
}
