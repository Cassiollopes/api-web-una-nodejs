-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'PROFESSOR', 'COORDENADOR');

-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('PRESENCIAL', 'REMOTO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "Curso" AS ENUM ('CIENCIA_COMPUTACAO', 'ENGENHARIA_SOFTWARE', 'ADMINISTRACAO', 'DIREITO', 'PSICOLOGIA', 'ENGENHARIA_CIVIL', 'ODONTOLOGIA');

-- CreateEnum
CREATE TYPE "Campus" AS ENUM ('DIVINOPOLIS', 'BELO_HORIZONTE', 'BETIM', 'CONTAGEM', 'BOM_DESPACHO', 'ITABIRA', 'ITAJUBA', 'JUIZ_DE_FORA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "curso" "Curso" NOT NULL,
    "campus" "Campus" NOT NULL,
    "matricula" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ALUNO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "autor_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "image_url" TEXT,
    "link" TEXT,
    "modalidade" "Modalidade" NOT NULL,
    "data" TIMESTAMP(3),
    "local" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_matricula_key" ON "usuarios"("matricula");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
