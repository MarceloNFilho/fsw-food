-- CreateTable
CREATE TABLE "userFavoritesRestaurants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userFavoritesRestaurants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userFavoritesRestaurants" ADD CONSTRAINT "userFavoritesRestaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavoritesRestaurants" ADD CONSTRAINT "userFavoritesRestaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
