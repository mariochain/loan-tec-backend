import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('status_loans')
export class StatusLoan {
  @PrimaryGeneratedColumn()
  idStatusLoan: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;
}
