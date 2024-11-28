import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('degree_programs')
export class DegreeProgram {
  @PrimaryGeneratedColumn()
  idDegreeProgram: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => User, user => user.degreeProgram)
  users: User[];
}
