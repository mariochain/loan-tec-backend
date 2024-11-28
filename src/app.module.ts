import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { LoanModule } from './loan/loan.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getTypeOrmConfig } from './config/ormconfig';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cargamos variables de entorno desde el archivo .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    CategoryModule,
    RoleModule,
    AuthModule,
    UserModule,
    MaterialModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
