"use client";

import { Restaurant, userFavoritesRestaurants } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { priceFormatter } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: userFavoritesRestaurants[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();
  const isFavorite = userFavoriteRestaurants?.some(
    (fav) => fav.restaurantId === restaurant.id
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      await toggleFavoriteRestaurant(data?.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado."
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px] space-y-3", className)}>
      <div className="w-full h-[136px] relative">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover rounded-sm"
          />
        </Link>

        <div className="absolute top-2 left-2 flex items-center gap-[2px] bg-white rounded-sm px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="font-semibold text-xs">5.0</span>
        </div>

        {data?.user.id && (
          <Button
            size={"icon"}
            className={`absolute top-2 right-2 rounded-full w-7 h-7 border-none bg-white/25 ${
              isFavorite && "bg-primary hover:bg-white/25"
            }`}
            onClick={handleFavoriteClick}
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>

        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <BikeIcon className="text-primary" size={12} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : priceFormatter(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex gap-1 items-center">
            <TimerIcon className="text-primary" size={12} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
