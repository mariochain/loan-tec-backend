import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateLoanMaterialDto {
  @IsUUID()
  idMaterial: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
