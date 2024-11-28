import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn('uuid')
  idMaterial: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  urlImage: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'idCategory' })
  category: Category;

  @Column()
  idCategory: number;
}
