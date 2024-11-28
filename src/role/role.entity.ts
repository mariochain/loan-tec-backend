import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
