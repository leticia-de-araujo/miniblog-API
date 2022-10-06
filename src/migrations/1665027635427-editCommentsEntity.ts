import { MigrationInterface, QueryRunner } from "typeorm";

export class editCommentsEntity1665027635427 implements MigrationInterface {
    name = 'editCommentsEntity1665027635427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "UQ_b22159685b114d104511b537fa2" UNIQUE ("text")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "UQ_b22159685b114d104511b537fa2"`);
    }

}
