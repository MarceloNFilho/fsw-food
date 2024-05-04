"use client";

import { notFound, useSearchParams } from "next/navigation";
import Header from "../_components/header";
import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const search = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!search) return;
      const result = await searchForRestaurants(search);
      setRestaurants(result);
    };
    fetchRestaurants();
  }, [search]);

  if (!search) {
    return notFound();
  }

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="font-semibold text-lg mb-6">Restaurantes encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              className="min-w-full max-w-full"
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
