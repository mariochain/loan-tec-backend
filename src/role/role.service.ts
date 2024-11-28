import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.roleRepository.update(id, updateRoleDto);
    const updatedRole = await this.roleRepository.findOneBy({ idRole: id });
    if (!updatedRole) {
      throw new NotFoundException(`Role con id ${id} no encontrado`);
    }
    return updatedRole;
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ idRole: id });
    if (!role) {
      throw new NotFoundException(`Role con id ${id} no encontrado`);
    }
    return role;
  }

  async deleteRole(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role con id ${id} no encontrado`);
    }
  }
}
