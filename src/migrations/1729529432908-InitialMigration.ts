import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1729529432908 implements MigrationInterface {
  name = 'InitialMigration1729529432908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_ef7a63b4c4f0edd90e389edb103\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` DROP FOREIGN KEY \`FK_4e2650bb65a2070d9f299a99ab1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` DROP FOREIGN KEY \`FK_324a8bad8b25f7bed4828571ee5\``,
    );
    await queryRunner.query(`ALTER TABLE \`material\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`material\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`material\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`material\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`material\` DROP COLUMN \`image\``);
    await queryRunner.query(
      `ALTER TABLE \`material\` ADD \`image\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`loan\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD \`status\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f53423632742cabf957d90f74f\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`controlNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`controlNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_f53423632742cabf957d90f74f\` (\`controlNumber\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`pictureProfile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`pictureProfile\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_ef7a63b4c4f0edd90e389edb103\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` ADD CONSTRAINT \`FK_4e2650bb65a2070d9f299a99ab1\` FOREIGN KEY (\`loanId\`) REFERENCES \`loan\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` ADD CONSTRAINT \`FK_324a8bad8b25f7bed4828571ee5\` FOREIGN KEY (\`materialId\`) REFERENCES \`material\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` DROP FOREIGN KEY \`FK_324a8bad8b25f7bed4828571ee5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` DROP FOREIGN KEY \`FK_4e2650bb65a2070d9f299a99ab1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_ef7a63b4c4f0edd90e389edb103\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`pictureProfile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`pictureProfile\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\` (\`email\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_f53423632742cabf957d90f74f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`controlNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`controlNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_f53423632742cabf957d90f74f\` ON \`user\` (\`controlNumber\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`loan\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD \`status\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`material\` DROP COLUMN \`image\``);
    await queryRunner.query(
      `ALTER TABLE \`material\` ADD \`image\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`material\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`material\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`material\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`material\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` ADD CONSTRAINT \`FK_324a8bad8b25f7bed4828571ee5\` FOREIGN KEY (\`materialId\`) REFERENCES \`prestamomaterial\`.\`material\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_materials_material\` ADD CONSTRAINT \`FK_4e2650bb65a2070d9f299a99ab1\` FOREIGN KEY (\`loanId\`) REFERENCES \`prestamomaterial\`.\`loan\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_ef7a63b4c4f0edd90e389edb103\` FOREIGN KEY (\`userId\`) REFERENCES \`prestamomaterial\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
