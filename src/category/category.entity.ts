import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Material } from '../material/material.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  idCategory: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Material, material => material.category)
  materials: Material[];
}
