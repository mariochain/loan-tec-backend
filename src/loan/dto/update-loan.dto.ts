import { IsUUID, IsOptional, IsString } from 'class-validator';

export class UpdateLoanDto {
  @IsUUID()
  idLoan: string;

  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
