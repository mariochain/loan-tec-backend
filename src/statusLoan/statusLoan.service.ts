import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusLoan } from './statusLoan.entity';
import { CreateStatusLoanDto } from './dto/create-statusLoan.dto';
import { UpdateStatusLoanDto } from './dto/update-statusLoan.dto';

@Injectable()
export class StatusLoanService {
  constructor(
    @InjectRepository(StatusLoan)
    private statusLoanRepository: Repository<StatusLoan>,
  ) {}

  async createStatusLoan(
    createStatusLoanDto: CreateStatusLoanDto,
  ): Promise<StatusLoan> {
    const statusLoan = this.statusLoanRepository.create(createStatusLoanDto);
    return this.statusLoanRepository.save(statusLoan);
  }

  async updateStatusLoan(
    id: number,
    updateStatusLoanDto: UpdateStatusLoanDto,
  ): Promise<StatusLoan> {
    await this.statusLoanRepository.update(id, updateStatusLoanDto);
    const updatedStatusLoan = await this.statusLoanRepository.findOneBy({
      idStatusLoan: id,
    });
    if (!updatedStatusLoan) {
      throw new NotFoundException(`StatusLoan con id ${id} no encontrado`);
    }
    return updatedStatusLoan;
  }

  async findAllStatusLoans(): Promise<StatusLoan[]> {
    return this.statusLoanRepository.find();
  }

  async findStatusLoanById(id: number): Promise<StatusLoan> {
    const statusLoan = await this.statusLoanRepository.findOneBy({
      idStatusLoan: id,
    });
    if (!statusLoan) {
      throw new NotFoundException(`StatusLoan con id ${id} no encontrado`);
    }
    return statusLoan;
  }

  async deleteStatusLoan(id: number): Promise<void> {
    const result = await this.statusLoanRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`StatusLoan con id ${id} no encontrado`);
    }
  }
}
