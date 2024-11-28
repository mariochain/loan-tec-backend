import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashExistingPasswords(): Promise<void> {
    const users = await this.userRepository.find();

    for (const user of users) {
      if (!user.password.startsWith('$2b$')) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
      }
    }

    console.log('Todas las contraseñas existentes han sido hasheadas.');
  }
}
