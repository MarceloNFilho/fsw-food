import { Product } from "@prisma/client";
import { ArrowDown } from "lucide-react";

interface DiscountTagProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountTag = ({ product }: DiscountTagProps) => {
  return (
    <div className="flex items-center gap-[2px] bg-primary rounded-sm text-white px-2 py-[2px]">
      <ArrowDown size={12} />
      <span className="font-semibold text-xs">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountTag;
