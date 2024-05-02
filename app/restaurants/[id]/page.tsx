import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import { timeStamp } from "console";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
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
    <div className="pb-6">
      <RestaurantImage restaurant={restaurant} />
      <div className="relative rounded-t-lg bg-white z-10 -mt-[1.5rem] flex justify-between items-center px-5 pt-5">
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
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
      <div className="flex gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden px-5 mt-3">
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

      <div className="mt-6 space-y-4">
        <h2 className="font-semibold px-5">Mais pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4">
          <h2 className="font-semibold px-5">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
