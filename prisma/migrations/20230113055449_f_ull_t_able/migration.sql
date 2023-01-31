/*
  Warnings:

  - You are about to drop the `Prueba` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Prueba";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "telefono" INTEGER,
    "name" TEXT,
    "lastname" TEXT,
    "password" TEXT,
    "servicio" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publicaciones" (
    "id" SERIAL NOT NULL,
    "owner" INTEGER NOT NULL,
    "creacion" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" BYTEA NOT NULL,
    "precio" INTEGER NOT NULL,
    "moneda" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Publicaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telefono_key" ON "User"("telefono");

-- AddForeignKey
ALTER TABLE "Publicaciones" ADD CONSTRAINT "Publicaciones_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
