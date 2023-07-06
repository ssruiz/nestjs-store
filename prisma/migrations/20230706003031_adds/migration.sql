/*
  Warnings:

  - A unique constraint covering the columns `[title,slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_title_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_slug_key" ON "Product"("title", "slug");
