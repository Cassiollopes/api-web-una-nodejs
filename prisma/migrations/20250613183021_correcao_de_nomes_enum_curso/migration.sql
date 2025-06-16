/*
  Warnings:

  - The values [CIENCIA_COMPUTACAO,ENGENHARIA_SOFTWARE] on the enum `Curso` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Curso_new" AS ENUM ('CIENCIA_DA_COMPUTACAO', 'ENGENHARIA_DE_SOFTWARE', 'ADMINISTRACAO', 'DIREITO', 'PSICOLOGIA', 'ENGENHARIA_CIVIL', 'ODONTOLOGIA');
ALTER TABLE "usuarios" ALTER COLUMN "curso" TYPE "Curso_new" USING ("curso"::text::"Curso_new");
ALTER TYPE "Curso" RENAME TO "Curso_old";
ALTER TYPE "Curso_new" RENAME TO "Curso";
DROP TYPE "Curso_old";
COMMIT;
