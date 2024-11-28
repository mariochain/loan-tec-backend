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
import { StatusLoanService } from './statusLoan.service';
import { CreateStatusLoanDto } from './dto/create-statusLoan.dto';
import { UpdateStatusLoanDto } from './dto/update-statusLoan.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('status-loans')
export class StatusLoanController {
  constructor(private readonly statusLoanService: StatusLoanService) {}

  @Roles('Administrador')
  @Post()
  create(@Body() createStatusLoanDto: CreateStatusLoanDto) {
    return this.statusLoanService.createStatusLoan(createStatusLoanDto);
  }

  @Roles('Administrador')
  @Get()
  findAll() {
    return this.statusLoanService.findAllStatusLoans();
  }

  @Roles('Administrador')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statusLoanService.findStatusLoanById(id);
  }

  @Roles('Administrador')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStatusLoanDto: UpdateStatusLoanDto,
  ) {
    return this.statusLoanService.updateStatusLoan(id, updateStatusLoanDto);
  }

  @Roles('Administrador')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.statusLoanService.deleteStatusLoan(id);
  }
}
