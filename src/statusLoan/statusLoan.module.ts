import { Module } from '@nestjs/common';
import { StatusLoanService } from './statusLoan.service';
import { StatusLoanController } from './statusLoan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusLoan } from './statusLoan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusLoan])],
  controllers: [StatusLoanController],
  providers: [StatusLoanService],
})
export class StatusLoanModule {}
