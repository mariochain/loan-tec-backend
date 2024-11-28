import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLoanMaterialDto } from './create-loan-material.dto';

export class CreateLoanDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLoanMaterialDto)
  materialLoan: CreateLoanMaterialDto[];
}
