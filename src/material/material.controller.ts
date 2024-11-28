import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  // Solo accesible por usuarios con rol 'admin'
  @Roles('Administrador')
  @Post()
  async createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createMaterial(createMaterialDto);
  }

  // Solo accesible por usuarios con rol 'admin'
  @Roles('Administrador')
  @Patch(':id')
  async updateMaterial(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.updateMaterial(id, updateMaterialDto);
  }

  // Nueva ruta para eliminar un material (accesible solo para 'admin')
  @Roles('Administrador')
  @Delete(':id')
  async deleteMaterial(@Param('id') id: string) {
    return this.materialService.deleteMaterial(id);
  }

  // Ruta accesible para todos los usuarios autenticados
  @Get()
  async getMaterials() {
    return this.materialService.findAllMaterials();
  }

  // Ruta accesible para todos los usuarios autenticados
  @Get(':id')
  async getMaterial(@Param('id') id: string) {
    return this.materialService.findMaterialById(id);
  }
}
