import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ idUser: id });
    if (!updatedUser) {
      throw new NotFoundException(`User con id ${id} no encontrado`);
    }
    return updatedUser;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['degreeProgram', 'role'] });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { idUser: id },
      relations: ['degreeProgram', 'role'],
    });
    if (!user) {
      throw new NotFoundException(`User con id ${id} no encontrado`);
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User con id ${id} no encontrado`);
    }
  }

  async findByControlNumber(controlNumber: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { controlNumber },
      relations: ['degreeProgram', 'role'], // Ajusta las relaciones según tu esquema
    });

    if (!user) {
      throw new NotFoundException(
        `User con controlNumber ${controlNumber} no encontrado`,
      );
    }

    return user;
  }
}
