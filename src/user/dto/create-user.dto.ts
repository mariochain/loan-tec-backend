import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  controlNumber: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsInt()
  semester: number;

  @IsString()
  pictureProfile: string;

  @IsInt()
  idDegreeProgram: number;

  @IsInt()
  idRole: number;
}
