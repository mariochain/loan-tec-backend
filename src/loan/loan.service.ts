import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { MaterialLoan } from './material-loan.entity';
import { Material } from '../material/material.entity';
import { User } from '../user/user.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { StatusLoan } from 'src/statusLoan/statusLoan.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(MaterialLoan)
    private readonly materialLoanRepository: Repository<MaterialLoan>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(StatusLoan)
    private readonly statusLoanRepository: Repository<StatusLoan>,
  ) {}

  async createLoan(
    createLoanDto: CreateLoanDto,
    userId: string,
  ): Promise<Loan> {
    const user = await this.userRepository.findOne({
      where: { idUser: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // Fetch the actual StatusLoan entity instead of creating it
    const status = await this.statusLoanRepository.findOne({
      where: { idStatusLoan: 1 },
    });
    if (!status) {
      throw new Error('Status not found');
    }

    const loan = this.loanRepository.create({
      user,
      status,
      materialQuantityBorrowed: createLoanDto.materialLoan.length,
      materialQuantityReturned: 0,
      requestDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      returnDate: null,
      cancellationReason: null,
    });

    const savedLoan = await this.loanRepository.save(loan);

    for (const material of createLoanDto.materialLoan) {
      const materialEntity = await this.materialRepository.findOne({
        where: { idMaterial: material.idMaterial },
      });

      if (!materialEntity) {
        throw new Error(`Material with ID ${material.idMaterial} not found`);
      }

      if (materialEntity.stock < material.quantity) {
        throw new Error(
          `Insufficient stock for material ${materialEntity.name}`,
        );
      }

      await this.materialRepository.decrement(
        { idMaterial: material.idMaterial },
        'stock',
        material.quantity,
      );

      const materialLoan = this.materialLoanRepository.create({
        loan: savedLoan,
        material: materialEntity,
        quantity: material.quantity,
        returned: false,
      });

      await this.materialLoanRepository.save(materialLoan);
    }

    return savedLoan;
  }
}
