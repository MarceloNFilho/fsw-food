/*
  Warnings:

  - The primary key for the `userFavoritesRestaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userFavoritesRestaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userFavoritesRestaurants" DROP CONSTRAINT "userFavoritesRestaurants_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "userFavoritesRestaurants_pkey" PRIMARY KEY ("userId", "restaurantId");
