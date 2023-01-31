/*
  Warnings:

  - The `imagen` column on the `Publicaciones` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `telefono` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Publicaciones" ALTER COLUMN "descripcion" DROP NOT NULL,
DROP COLUMN "imagen",
ADD COLUMN     "imagen" BYTEA[],
ALTER COLUMN "municipio" DROP NOT NULL,
ALTER COLUMN "likes" DROP NOT NULL,
ALTER COLUMN "categoria" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
