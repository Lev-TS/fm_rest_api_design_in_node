/*
  Warnings:

  - Added the required column `body` to the `Update` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `Update` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_productId_fkey";

-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "body" TEXT NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
