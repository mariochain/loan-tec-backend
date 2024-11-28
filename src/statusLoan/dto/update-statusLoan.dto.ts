import { IsOptional, IsString } from 'class-validator';

export class UpdateStatusLoanDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
