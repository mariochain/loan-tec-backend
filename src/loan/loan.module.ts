import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { MaterialLoan } from './material-loan.entity';
import { Material } from '../material/material.entity';
import { User } from '../user/user.entity';
import { StatusLoan } from '../statusLoan/statusLoan.entity';
import { LoanController } from './loan.controller';
import { LoansService } from './loan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan, MaterialLoan, Material, User, StatusLoan]),
  ],
  controllers: [LoanController],
  providers: [LoansService],
})
export class LoanModule {}
