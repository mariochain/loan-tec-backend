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
import { DegreeProgramService } from './degreeProgram.service';
import { CreateDegreeProgramDto } from './dto/create-degreeProgram.dto';
import { UpdateDegreeProgramDto } from './dto/update-degreeProgram.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('degree-programs')
export class DegreeProgramController {
  constructor(private readonly degreeProgramService: DegreeProgramService) {}

  @Roles('Administrador')
  @Post()
  create(@Body() createDegreeProgramDto: CreateDegreeProgramDto) {
    return this.degreeProgramService.createDegreeProgram(
      createDegreeProgramDto,
    );
  }

  @Roles('Administrador')
  @Get()
  findAll() {
    return this.degreeProgramService.findAllDegreePrograms();
  }

  @Roles('Administrador')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.degreeProgramService.findDegreeProgramById(id);
  }

  @Roles('Administrador')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDegreeProgramDto: UpdateDegreeProgramDto,
  ) {
    return this.degreeProgramService.updateDegreeProgram(
      id,
      updateDegreeProgramDto,
    );
  }

  @Roles('Administrador')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.degreeProgramService.deleteDegreeProgram(id);
  }
}
