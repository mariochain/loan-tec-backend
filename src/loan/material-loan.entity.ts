import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Loan } from './loan.entity';
import { Material } from '../material/material.entity';

@Entity('material_loan')
export class MaterialLoan {
  @PrimaryGeneratedColumn('uuid')
  idMaterialLoan: string;

  @ManyToOne(() => Loan, loan => loan.materialLoans)
  @JoinColumn({ name: 'idLoan' })
  loan: Loan;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'idMaterial' })
  material: Material;

  @Column()
  quantity: number;

  @Column({ default: false })
  returned: boolean;
}
