/*
  Warnings:

  - You are about to drop the column `isborrowable` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `nbrpages` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `runtimeminutes` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "isborrowable",
DROP COLUMN "nbrpages",
DROP COLUMN "runtimeminutes",
ADD COLUMN     "isBorrowable" BOOLEAN,
ADD COLUMN     "nbrPages" INTEGER,
ADD COLUMN     "runTimeMinutes" INTEGER;
