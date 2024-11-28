import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'; // Importamos bcrypt para manejo de contraseñas

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(controlNumber: string, password: string): Promise<any> {
    const user = await this.usersService.findByControlNumber(controlNumber);

    if (!user) {
      console.log('Usuario no encontrado');
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (await bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    console.log('Contraseña ingresada:', password);
    console.log('Contraseña encriptada:', user.password);

    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(user: any) {
    const payload = {
      controlNumber: user.controlNumber,
      id: user.idUser,
      role: user.role.name,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h', // Configurar el tiempo de expiración
    });

    return {
      status: 200,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name + ' ' + user.lastName,
          email: user.email,
          semester: user.semester,
          degreeProgramName: user.degreeProgram.name,
          pictureProfile: user.pictureProfile,
          controlNumber: user.controlNumber,
          role: user.role.name,
        },
      },
    };
  }

  async decodeToken(token: string): Promise<any> {
    const decoded = this.jwtService.decode(token);
    if (typeof decoded === 'object' && decoded) {
      const userId = decoded.sub;
      const creationDate = new Date(decoded.iat * 1000);
      const username = decoded.username;

      return {
        userId,
        username,
        creationDate,
      };
    }

    throw new UnauthorizedException('Token inválido');
  }
}
