/*
  Warnings:

  - The `imagen` column on the `Publicaciones` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Publicaciones" DROP COLUMN "imagen",
ADD COLUMN     "imagen" BYTEA[];
