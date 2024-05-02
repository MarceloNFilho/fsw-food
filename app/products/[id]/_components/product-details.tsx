"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountTag from "@/app/_components/discount-tag";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import {
  calculateProductTotalPrice,
  priceFormatter,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => setQuantity((state) => state + 1);

  const handleDecreaseQuantity = () => {
    setQuantity((state) => {
      if (state === 1) return 1;

      return state - 1;
    });
  };

  return (
    <div className="relative py-5 rounded-t-3xl z-10 mt-[-1.5rem] bg-white">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-4 w-4">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="font-semibold text-xl mt-1 mb-2 px-5">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-1">
            <h2 className="font-semibold text-xl">
              {priceFormatter(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage && <DiscountTag product={product} />}
          </div>

          <p className="text-sm text-muted-foreground">
            De: {priceFormatter(Number(product.price))}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="border border-muted-foreground"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-2">{quantity}</span>
          <Button size={"icon"} onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="px-5 mt-6">
        <Button className="w-full h-[45px] font-semibold">
          Adicionar à sacola
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
