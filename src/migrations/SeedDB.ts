import {MigrationInterface, QueryRunner} from 'typeorm';

export class SeedDB implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "COPY eat FROM 'dist/src/migrations/seeders/eat.json';",
    );

    // await queryRunner.query(
    //   "COPY shop FROM 'dist/src/migrations/seeders/shop.json';",
    // );
  }

  public async saveInJson(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "COPY (SELECT * FROM eat) TO dist/src/migrations/seeders/eat.json';",
    );

    // await queryRunner.query(
    //   "COPY (SELECT * FROM shop) TO dist/src/migrations/seeders/shop.json';",
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE eat ;');

    // await queryRunner.query('TRUNCATE TABLE shop ;');
  }
}
