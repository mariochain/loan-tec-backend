import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { LoansService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Loan } from './loan.entity';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoansService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLoan(@Request() req, @Body() createLoanDto: CreateLoanDto) {
    const userId = req.user.id;
    return this.loanService.createLoan(createLoanDto, userId);
  }

  @Get()
  async getLoans(@Request() req: any) {
    const userId = req.user.id; // Se obtiene el ID del usuario desde el token JWT
    const isAdmin = req.user.role === 'Administrador'; // Verifica si el usuario tiene rol de administrador

    const loans = await this.loanService.getLoansByRole(userId, isAdmin);

    return loans;
  }

  @Get(':id')
  async getLoanById(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<Loan> {
    const userId = req.user.id; // Se asume que el userId está en el JWT.
    const isAdmin = req.user.role === 'Administrador'; // Se asume que el rol se obtiene del JWT.

    if (isAdmin) {
      // Si es administrador, busca el préstamo por ID sin restricciones.
      return await this.loanService.getLoanById(id);
    } else {
      // Si no es administrador, asegura que el préstamo pertenece al usuario.
      return await this.loanService.getLoanByIdForUser(id, userId);
    }
  }

  @Patch('cancel/:idLoan')
  async cancelLoan(
    @Param('idLoan') idLoan: string,
    @Body('cancellationReason') cancellationReason: string | null,
    @Request() req: any,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'Administrador';

    if (!isAdmin) {
      cancellationReason = 'Cancelado por el solicitante';
    }

    return await this.loanService.cancelLoan(
      idLoan,
      cancellationReason,
      isAdmin,
      userId,
    );
  }

  @Patch('approve/:idLoan')
  @Roles('Administrador')
  async approveLoan(
    @Param('idLoan') idLoan: string,
  ): Promise<{ message: string }> {
    return this.loanService.approveLoan(idLoan);
  }

  @Patch('return-material/:idLoan')
  @Roles('Administrador')
  async returnMaterial(
    @Param('idLoan') idLoan: string,
    @Body('idMaterial') idMaterial: string,
  ): Promise<{ message: string }> {
    return this.loanService.returnMaterial(idLoan, idMaterial);
  }
}
