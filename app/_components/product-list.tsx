import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

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
  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 max-lg:px-5 max-lg:max-w-full max-w-[1552px] mx-auto">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
