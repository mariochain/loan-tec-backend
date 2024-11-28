import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateLoanMaterialDto {
  @IsUUID()
  idMaterialLoan: string;

  @IsBoolean()
  returned: boolean;
}
