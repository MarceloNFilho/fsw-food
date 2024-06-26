import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const MyFavoritesRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoritesRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />

      <div className="max-lg:px-5 py-6 max-w-[1440px] mx-auto">
        <h2 className="font-semibold text-lg mb-6">Restaurantes favoritos</h2>
        <div className="max-lg:flex w-full max-lg:flex-col grid grid-cols-3 gap-6">
          {userFavoritesRestaurants.length > 0 ? (
            userFavoritesRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                className="min-w-full max-w-full"
                key={restaurant.id}
                restaurant={restaurant}
                userFavoriteRestaurants={userFavoritesRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium text-muted-foreground text-center">
              Você ainda não adicionou nenhum restaurante aos favoritos.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoritesRestaurants;
