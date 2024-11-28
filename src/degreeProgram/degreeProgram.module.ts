import { Module } from '@nestjs/common';
import { DegreeProgramService } from './degreeProgram.service';
import { DegreeProgramController } from './degreeProgram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeProgram } from './degreeProgram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeProgram])],
  controllers: [DegreeProgramController],
  providers: [DegreeProgramService],
})
export class DegreeProgramModule {}
