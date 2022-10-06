import { MigrationInterface, QueryRunner } from "typeorm";

export class editArticlesEntity1665023437319 implements MigrationInterface {
    name = 'editArticlesEntity1665023437319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_9cf383b5c60045a773ddced7f23"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_9cf383b5c60045a773ddced7f23" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_9cf383b5c60045a773ddced7f23"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_9cf383b5c60045a773ddced7f23" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
