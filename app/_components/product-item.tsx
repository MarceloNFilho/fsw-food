import { Prisma, Product } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { calculateProductTotalPrice, priceFormatter } from "../_helpers/price";

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
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="min-w-[150px] max-w-[150px] space-y-2">
      <div className=" relative w-full h-[150px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover rounded-sm"
        />

        <div className="absolute top-2 left-2 flex items-center gap-[2px] bg-primary rounded-sm text-white px-2 py-[2px]">
          <ArrowDown size={12} />
          <span className="font-semibold text-xs">
            {product.discountPercentage}%
          </span>
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
    </div>
  );
};

export default ProductItem;
