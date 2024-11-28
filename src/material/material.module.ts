import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialService } from './material.service';
import { Material } from './material.entity';
import { MaterialController } from './material.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Material])], // Importamos la entidad Material
  providers: [MaterialService], // Registramos el servicio de Materiales
  controllers: [MaterialController],
  exports: [MaterialService], // Exportamos el servicio para su uso en otros módulos
})
export class MaterialModule {}
