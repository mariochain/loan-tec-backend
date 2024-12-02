import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) { }

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

  async getLoansByRole(userId: string, isAdmin: boolean): Promise<Loan[]> {
    if (isAdmin) {
      // Si el usuario es administrador, obtener todos los préstamos cronológicamente (más recientes primero)
      return this.loanRepository.find({
        order: { requestDate: 'DESC' },
        relations: ['user', 'status'],
      });
    } else {
      // Si el usuario no es administrador, obtener solo los préstamos del usuario
      return this.loanRepository.find({
        where: { user: { idUser: userId } },
        order: { requestDate: 'DESC' },
        relations: ['status'],
      });
    }
  }

  async getLoanById(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { idLoan: id },
      relations: ['user', 'status', 'materialLoans', 'materialLoans.material'],
    });

    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }

    return loan;
  }

  async getLoanByIdForUser(id: string, userId: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { idLoan: id, user: { idUser: userId } },
      relations: ['status', 'materialLoans', 'materialLoans.material'],
    });

    if (!loan) {
      throw new Error('Préstamo no encontrado o no pertenece al usuario');
    }

    return loan;
  }

  async cancelLoan(
    idLoan: string,
    cancellationReason: string,
    isAdmin: boolean,
    userId: string,
  ): Promise<{ message: string }> {
    // Buscar el préstamo por ID
    const loan = await this.loanRepository.findOne({
      where: { idLoan },
      relations: ['materialLoans', 'materialLoans.material', 'user', 'status'],
    });

    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }

    // Verificar permisos
    if (!isAdmin && loan.user.idUser !== userId) {
      throw new Error('No tienes permiso para cancelar este préstamo');
    }

    // Verificar si el estado del préstamo permite cancelación
    if (loan.status.idStatusLoan !== 1) {
      throw new Error('Solo se pueden cancelar préstamos en estado Pendiente');
    }

    // Incrementar el stock de los materiales
    for (const materialLoan of loan.materialLoans) {
      await this.materialRepository.increment(
        { idMaterial: materialLoan.material.idMaterial },
        'stock',
        materialLoan.quantity,
      );
    }

    // Actualizar el estado y razón de cancelación
    loan.status.idStatusLoan = { idStatusLoan: 6 } as any;
    loan.cancellationReason = cancellationReason;
    await this.loanRepository.save(loan);

    return { message: 'Préstamo cancelado correctamente' };
  }

  async approveLoan(idLoan: string): Promise<{ message: string }> {
    // Buscar el préstamo por ID
    const loan = await this.loanRepository.findOne({
      where: { idLoan },
      relations: ['status'],
    });

    if (!loan) {
      throw new NotFoundException('Préstamo no encontrado');
    }

    // Verificar que el estado actual sea 1 (Pendiente)
    if (loan.status.idStatusLoan !== 1) {
      throw new BadRequestException(
        'Solo se pueden aprobar préstamos en estado Pendiente',
      );
    }

    // Actualizar el estado a aprobado (2)
    loan.status.idStatusLoan = { idStatusLoan: 2 } as any;
    await this.loanRepository.save(loan);

    return { message: 'Préstamo aprobado correctamente' };
  }

  async returnMaterial(
    idLoan: string,
    idMaterial: string,
  ): Promise<{ message: string }> {
    // Buscar el préstamo
    const loan = await this.loanRepository.findOne({
      where: { idLoan },
      relations: ['status', 'materialLoans', 'materialLoans.material'],
    });

    if (!loan) {
      throw new NotFoundException('Préstamo no encontrado');
    }

    // Verificar que el préstamo está en estado aprobado (2)
    if (loan.status.idStatusLoan !== 2) {
      throw new BadRequestException(
        'Solo se pueden devolver materiales de préstamos aprobados',
      );
    }

    // Buscar el material dentro del préstamo
    const materialLoan = loan.materialLoans.find(
      ml => ml.material.idMaterial === idMaterial,
    );

    if (!materialLoan) {
      throw new NotFoundException(
        'El material especificado no está asociado con este préstamo',
      );
    }

    // Verificar si el material ya fue devuelto
    if (materialLoan.returned) {
      throw new BadRequestException(
        'El material ya ha sido marcado como devuelto',
      );
    }

    // Marcar el material como devuelto
    materialLoan.returned = true;
    await this.materialLoanRepository.save(materialLoan);

    // Incrementar la cantidad devuelta en el préstamo
    loan.materialQuantityReturned += 1;

    // Actualizar el stock del material
    await this.materialRepository.increment(
      { idMaterial },
      'stock',
      materialLoan.quantity,
    );

    // Verificar si todos los materiales fueron devueltos
    if (loan.materialQuantityReturned === loan.materialQuantityBorrowed) {
      loan.status.idStatusLoan = 5; // Cambiar estado a "Finalizado"
      loan.returnDate = new Date();
    }

    // Guardar el préstamo actualizado
    await this.loanRepository.save(loan);

    return { message: 'Material devuelto correctamente' };
  }
}
