import { userFavoritesRestaurants } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: userFavoritesRestaurants[]
) => userFavoriteRestaurants?.some((fav) => fav.restaurantId === restaurantId);
