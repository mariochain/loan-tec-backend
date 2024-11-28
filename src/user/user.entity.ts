import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DegreeProgram } from '../degreeProgram/degreeProgram.entity';
import { Role } from '../role/role.entity';
import { Loan } from 'src/loan/loan.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 8 })
  controlNumber: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'int' })
  semester: number;

  @Column({ type: 'varchar', length: 255 })
  pictureProfile: string;

  @ManyToOne(() => DegreeProgram)
  @JoinColumn({ name: 'idDegreeProgram' })
  degreeProgram: DegreeProgram;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'idRole' })
  role: Role;

  @OneToMany(() => Loan, loan => loan.user)
  loans: Loan[]; // Relación inversa hacia Loan
}
