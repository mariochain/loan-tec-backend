import { IsString } from 'class-validator';

export class CreateDegreeProgramDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
