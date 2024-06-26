"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string
) => {
  const isFavorite = await db.userFavoritesRestaurants.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (isFavorite) {
    await db.userFavoritesRestaurants.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });

    revalidatePath("/");
    return;
  }

  await db.userFavoritesRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};
