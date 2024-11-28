import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { StatusLoan } from '../statusLoan/statusLoan.entity';
import { MaterialLoan } from './material-loan.entity';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  idLoan: string;

  @ManyToOne(() => User, user => user.loans)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToOne(() => StatusLoan)
  @JoinColumn({ name: 'idStatus' })
  status: StatusLoan;

  @OneToMany(() => MaterialLoan, materialLoan => materialLoan.loan, {
    cascade: true,
  })
  materialLoans: MaterialLoan[];

  @Column()
  materialQuantityBorrowed: number;

  @Column({ default: 0 })
  materialQuantityReturned: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestDate: Date;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cancellationReason: string;
}
