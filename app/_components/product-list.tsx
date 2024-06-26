"use client";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 2.3, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3.5, spacing: 16 },
      },
      "(min-width: 748px)": {
        slides: { perView: 4.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
      "(min-width: 1280px)": {
        slides: { perView: 7, spacing: 16 },
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
      className="keen-slider relative flex overflow-x-scroll [&::-webkit-scrollbar]:hidden max-lg:px-5 max-lg:max-w-full max-w-[1552px] mx-auto"
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
      {products.map((product) => (
        <div key={product.id} className="keen-slider__slide">
          <ProductItem product={product} />
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

export default ProductList;
