import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import SectionTitle from "@/app/_components/section-title";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoritesRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="max-lg:hidden block mb-6">
        <Header withSearch />
      </div>
      <div className="pb-6 max-lg:max-w-full max-w-[1440px] mx-auto">
        <div className="flex max-lg:flex-col gap-8">
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
          <div className="flex-1">
            <div className="relative rounded-t-lg bg-white z-10 -mt-[1.5rem] flex justify-between items-center max-lg:px-5 pt-5">
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>

              <div className="flex items-center gap-1 bg-foreground text-white rounded-lg px-[10px] py-[7px]">
                <StarIcon
                  size={12}
                  className="fill-yellow-500 text-yellow-400"
                />
                <span className="font-semibold text-xs">5.0</span>
              </div>
            </div>
            <div className="max-lg:px-5">
              <DeliveryInfo restaurant={restaurant} />
            </div>
            <div className="flex gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden max-lg:px-5 mt-3">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[164px] bg-[#f4f4f4] rounded-sm text-center"
                >
                  <span className="text-muted-foreground text-xs truncate">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="max-lg:hidden flex flex-col gap-3">
              <h2 className="font-semibold mt-6">Sobre</h2>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                voluptatum accusantium repellendus similique alias praesentium
                sed? Nemo labore suscipit deleniti laudantium debitis, neque
                ipsa itaque excepturi sit culpa fugiat perferendis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="font-semibold max-lg:px-5">Mais pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div key={category.id} className="mt-6 space-y-4">
            <h2 className="font-semibold max-lg:px-5">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
