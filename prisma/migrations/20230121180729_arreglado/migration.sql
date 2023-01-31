/*
  Warnings:

  - You are about to drop the column `creacion` on the `Publicaciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Publicaciones" DROP COLUMN "creacion",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "imagen" SET DATA TYPE TEXT[];
