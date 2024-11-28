import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path'; // Asegúrate de importar 'path'

// Crea una instancia de ConfigService
const configService = new ConfigService();

// Verifica si las variables de entorno están siendo cargadas
console.log('DB_HOST:', configService.get<string>('DB_HOST'));
console.log('DB_USER:', configService.get<string>('DB_USER'));
console.log('DB_PASS:', configService.get<string>('DB_PASS'));
console.log('DB_NAME:', configService.get<string>('DB_NAME'));

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
});
