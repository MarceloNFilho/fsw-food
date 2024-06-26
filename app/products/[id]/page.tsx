import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";
import Header from "@/app/_components/header";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="max-lg:max-w-full max-w-[1440px] mx-auto max-lg:pb-6">
      <div className="max-lg:hidden block mb-6">
        <Header withSearch />
      </div>
      <div className="flex max-lg:flex-col min-[1440px]:gap-8">
        <ProductImage product={product} />
        <ProductDetails product={product} />
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductList products={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
