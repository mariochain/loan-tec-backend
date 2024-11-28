import { IsOptional, IsString, IsInt, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  controlNumber?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  semester?: number;

  @IsOptional()
  @IsString()
  pictureProfile?: string;

  @IsOptional()
  @IsInt()
  idDegreeProgram?: number;

  @IsOptional()
  @IsInt()
  idRole?: number;
}
