"use client";

import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

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
    <>
      <div
        ref={sliderRef}
        className="keen-slider relative flex overflow-x-scroll [&::-webkit-scrollbar]:hidden max-xl:px-5 max-lg:max-w-full max-w-[1224px] mx-auto"
      >
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="keen-slider__slide">
            <RestaurantItem
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 max-w-[1224px] mx-auto justify-end max-xl:px-5">
        <Button
          size="icon"
          className="z-10 hidden rounded-lg disabled:bg-primary/90 lg:block"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="text-white hover:brightness-125 w-full" />
        </Button>
        <Button
          size="icon"
          className="z-10 hidden rounded-lg disabled:bg-primary/90 lg:block"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          disabled={
            currentSlide ===
            instanceRef?.current?.track.details.slides.length! - 1
          }
        >
          <ChevronRight className="text-white hover:brightness-125 w-full" />
        </Button>
      </div>
    </>
  );
};

export default RestaurantList;
