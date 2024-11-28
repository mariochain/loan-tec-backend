import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path'; // Asegúrate de importar 'path'

// Configuración para NestJS (TypeOrmModuleOptions)
export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
  synchronize: configService.get('DB_SYNC') === 'true',
  autoLoadEntities: true,
  logging: ['query', 'error'], // Registra las consultas y errores
  logger: 'advanced-console', // Usa el logger avanzado de consola
  migrationsTableName: 'migrations',
});

// Configuración para TypeORM CLI (DataSourceOptions)
export const getDataSourceConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql', // Base de datos
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: ['/../**/*.entity{.ts,.js}'], // Ajusta esta ruta a tus entidades
  migrations: ['/../migrations/*{.ts,.js}'], // Ajusta esta ruta a las migraciones
  synchronize: false, // Desactivamos synchronize para usar migraciones
});
