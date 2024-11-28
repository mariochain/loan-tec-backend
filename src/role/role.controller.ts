import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('Administrador')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Roles('Administrador')
  @Get()
  findAll() {
    return this.roleService.findAllRoles();
  }

  @Roles('Administrador')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findRoleById(id);
  }

  @Roles('Administrador')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Roles('Administrador')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
