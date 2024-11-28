import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialResponseDto } from './dto/response-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async createMaterial(
    createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    const material = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(material);
  }

  async updateMaterial(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    await this.materialRepository.update(id, updateMaterialDto);
    const updatedMaterial = await this.materialRepository.findOneBy({
      idMaterial: id,
    });
    if (!updatedMaterial) {
      throw new NotFoundException(`Material con id ${id} no encontrado`);
    }
    return updatedMaterial;
  }

  async findAllMaterials(): Promise<MaterialResponseDto[]> {
    const materials = await this.materialRepository.find({
      relations: ['category'], // Incluye la relación con Category
    });

    // Transforma la respuesta para que el nombre de la categoría esté al mismo nivel
    return materials.map(material => ({
      idMaterial: material.idMaterial,
      name: material.name,
      description: material.description,
      stock: material.stock,
      urlImage: material.urlImage,
      categoryName: material.category.name, // Mueve el nombre al nivel superior
    }));
  }

  async findMaterialById(id: string): Promise<MaterialResponseDto> {
    const material = await this.materialRepository.findOne({
      where: { idMaterial: id },
      relations: ['category'],
    });

    if (!material) {
      throw new NotFoundException(`Material con id ${id} no encontrado`);
    }

    return {
      idMaterial: material.idMaterial,
      name: material.name,
      description: material.description,
      stock: material.stock,
      urlImage: material.urlImage,
      categoryName: material.category.name, // Mueve el nombre al nivel superior
    };
  }

  async deleteMaterial(id: string): Promise<void> {
    const result = await this.materialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Material con id ${id} no encontrado`);
    }
  }
}
