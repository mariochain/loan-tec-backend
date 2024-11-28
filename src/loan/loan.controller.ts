import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LoansService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoansService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLoan(@Request() req, @Body() createLoanDto: CreateLoanDto) {
    const userId = req.user.id;
    return this.loanService.createLoan(createLoanDto, userId);
  }
}
