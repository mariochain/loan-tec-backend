import { IsOptional, IsString } from 'class-validator';

export class UpdateDegreeProgramDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
