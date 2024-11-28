import { IsString, IsInt } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  stock: number;

  @IsString()
  urlImage: string;

  @IsInt()
  idCategory: number;
}
