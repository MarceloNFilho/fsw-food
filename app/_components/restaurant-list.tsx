"use client";

import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

interface RestaurantListProps {
  restaurants: Prisma.RestaurantGetPayload<{}>[];
  userFavoriteRestaurants: Prisma.userFavoritesRestaurantsGetPayload<{}>[];
}

const RestaurantList = ({
  restaurants,
  userFavoriteRestaurants,
}: RestaurantListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 748px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
      "(min-width: 1280px)": {
        slides: { perView: 4, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
    },
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider relative flex overflow-x-scroll [&::-webkit-scrollbar]:hidden max-lg:px-5 max-lg:max-w-full max-w-[1440px] mx-auto"
    >
      <button
        className="hidden disabled:hidden lg:block"
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
        disabled={currentSlide === 0}
      >
        <ArrowLeftCircle
          className="absolute bottom-1/2 left-2 z-10 -translate-y-1/2 bg-yellow-500 text-white rounded-full hover:brightness-125"
          size={24}
        />
      </button>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="keen-slider__slide">
          <RestaurantItem
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        </div>
      ))}
      <button
        className="hidden disabled:hidden lg:block"
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
        disabled={
          currentSlide ===
          instanceRef?.current?.track.details.slides.length! - 1
        }
      >
        <ArrowRightCircle
          className="absolute bottom-1/2 right-2 -translate-y-1/2 bg-yellow-500 text-white rounded-full hover:brightness-125"
          size={24}
        />
      </button>
    </div>
  );
};

export default RestaurantList;
