"use client";

import { Prisma, Product } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { calculateProductTotalPrice, priceFormatter } from "../_helpers/price";
import Link from "next/link";
import DiscountTag from "./discount-tag";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("min-w-[150px] max-w-[150px] space-y-2", className)}
      href={`/products/${product.id}`}
    >
      <div className=" relative w-full aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover rounded-sm"
        />

        <div className="absolute top-2 left-2">
          <DiscountTag product={product} />
        </div>
      </div>

      <div>
        <h2 className="text-sm truncate">{product.name}</h2>
        <div className="flex items-baseline gap-1">
          <span className="font-semibold">
            {priceFormatter(calculateProductTotalPrice(product))}
          </span>

          {product.discountPercentage > 0 && (
            <span className="line-through text-muted-foreground text-xs">
              {priceFormatter(Number(product.price))}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground block">
          {product.restaurant.name}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
