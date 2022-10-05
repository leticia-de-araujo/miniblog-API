import { MigrationInterface, QueryRunner } from "typeorm";

export class editArticlesTable1665000120108 implements MigrationInterface {
    name = 'editArticlesTable1665000120108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_1008f52e8bb41a03e5b41ec93fc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_1008f52e8bb41a03e5b41ec93fc" UNIQUE ("description")`);
    }

}
