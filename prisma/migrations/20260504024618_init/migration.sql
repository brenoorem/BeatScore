/*
  Warnings:

  - You are about to drop the column `musica` on the `Album` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "musica",
ADD COLUMN     "nome" TEXT NOT NULL;
