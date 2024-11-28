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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles('Administrador')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Roles('Administrador')
  @Get()
  findAll() {
    console.log('entra');
    return this.categoryService.findAll();
  }

  @Roles('Administrador')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles('Administrador')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles('Administrador')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
