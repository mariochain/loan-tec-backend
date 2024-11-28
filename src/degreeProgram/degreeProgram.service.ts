import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DegreeProgram } from './degreeProgram.entity';
import { CreateDegreeProgramDto } from './dto/create-degreeProgram.dto';
import { UpdateDegreeProgramDto } from './dto/update-degreeProgram.dto';

@Injectable()
export class DegreeProgramService {
  constructor(
    @InjectRepository(DegreeProgram)
    private degreeProgramRepository: Repository<DegreeProgram>,
  ) {}

  async createDegreeProgram(
    createDegreeProgramDto: CreateDegreeProgramDto,
  ): Promise<DegreeProgram> {
    const degreeProgram = this.degreeProgramRepository.create(
      createDegreeProgramDto,
    );
    return this.degreeProgramRepository.save(degreeProgram);
  }

  async updateDegreeProgram(
    id: number,
    updateDegreeProgramDto: UpdateDegreeProgramDto,
  ): Promise<DegreeProgram> {
    await this.degreeProgramRepository.update(id, updateDegreeProgramDto);
    const updatedDegreeProgram = await this.degreeProgramRepository.findOneBy({
      idDegreeProgram: id,
    });
    if (!updatedDegreeProgram) {
      throw new NotFoundException(`DegreeProgram con id ${id} no encontrado`);
    }
    return updatedDegreeProgram;
  }

  async findAllDegreePrograms(): Promise<DegreeProgram[]> {
    return this.degreeProgramRepository.find();
  }

  async findDegreeProgramById(id: number): Promise<DegreeProgram> {
    const degreeProgram = await this.degreeProgramRepository.findOneBy({
      idDegreeProgram: id,
    });
    if (!degreeProgram) {
      throw new NotFoundException(`DegreeProgram con id ${id} no encontrado`);
    }
    return degreeProgram;
  }

  async deleteDegreeProgram(id: number): Promise<void> {
    const result = await this.degreeProgramRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`DegreeProgram con id ${id} no encontrado`);
    }
  }
}
