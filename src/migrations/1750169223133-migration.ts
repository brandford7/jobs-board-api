import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750169223133 implements MigrationInterface {
    name = 'Migration1750169223133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "company" character varying NOT NULL, "location" character varying NOT NULL, "jobType" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "salary" character varying, "experienceLevel" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appliedAt" TIMESTAMP NOT NULL DEFAULT now(), "applicantId" uuid, "jobId" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('candidate', 'recruiter', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "keycloakId" character varying NOT NULL, "firstname" character varying, "lastname" character varying, "username" character varying NOT NULL, "email" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT 'candidate', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9eccb789f0a033a2cfa5baf4d99" UNIQUE ("keycloakId"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_228b150b2333ecd5dbf4f7fc1fa" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_0f72681370346063768901281b6" FOREIGN KEY ("applicantId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_d0452612ad9cb0e20f6f320ebc0" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_d0452612ad9cb0e20f6f320ebc0"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_0f72681370346063768901281b6"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_228b150b2333ecd5dbf4f7fc1fa"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "job_application"`);
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
