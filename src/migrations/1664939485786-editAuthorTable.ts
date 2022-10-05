import { MigrationInterface, QueryRunner } from "typeorm";

export class editAuthorTable1664939485786 implements MigrationInterface {
    name = 'editAuthorTable1664939485786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "authors" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "authors" ADD "password" character varying(30) NOT NULL`);
    }

}
