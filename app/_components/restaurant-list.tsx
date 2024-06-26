import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userfavoriteRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 max-lg:px-5 max-lg:max-w-full max-w-[1552px] mx-auto">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userfavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
