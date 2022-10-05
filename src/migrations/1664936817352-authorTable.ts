import { MigrationInterface, QueryRunner } from "typeorm";

export class authorTable1664936817352 implements MigrationInterface {
    name = 'authorTable1664936817352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authors" ("id" uuid NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(50) NOT NULL, "age" integer NOT NULL, "email" character varying(40) NOT NULL, "password" character varying(30) NOT NULL, CONSTRAINT "UQ_ea066641108f693660071dfa790" UNIQUE ("email"), CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "authors"`);
    }

}
