import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
//import { PasswordHasherService } from './user/password-hasher.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtener el servicio y ejecutar el hash de contraseñas
  //const passwordHasher = app.get(PasswordHasherService);
  //await passwordHasher.hashExistingPasswords(); // Ejecuta el servicio

  const dataSource = app.get(DataSource);
  console.log(
    'Entidades cargadas por TypeORM:',
    dataSource.entityMetadatas.map(e => e.name),
  );

  await app.listen(3000);
}
bootstrap();
