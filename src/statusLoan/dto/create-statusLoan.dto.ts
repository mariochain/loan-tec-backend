import { IsString } from 'class-validator';

export class CreateStatusLoanDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
