"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const favoriteRestaurante = async (userId: string, restaurantId: string) => {
  await db.userFavoritesRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};

export const unfavoriteRestaurant = async (
  userId: string,
  restaurantId: string
) => {
  await db.userFavoritesRestaurants.delete({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  });

  revalidatePath("/");
};
