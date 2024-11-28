import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsString()
  urlImage?: string;

  @IsOptional()
  @IsInt()
  idCategory?: number;
}
