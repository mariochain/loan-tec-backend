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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('Administrador')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Roles('Administrador')
  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Roles('Administrador')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Roles('Administrador')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Roles('Administrador')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
