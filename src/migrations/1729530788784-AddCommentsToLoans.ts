import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentsToLoans1729530788784 implements MigrationInterface {
  name = 'AddCommentsToLoans1729530788784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Aquí agregamos solo la columna "comments" a la tabla "loan"
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD \`comments\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // En caso de revertir la migración, eliminamos la columna "comments"
    await queryRunner.query(`ALTER TABLE \`loan\` DROP COLUMN \`comments\``);
  }
}
