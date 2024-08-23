import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    distinct: "name",
    orderBy: {
      categoryId: "desc",
    },
  });
  return (
    <>
      <Header />

      <div className="max-xl:px-5 py-6 max-w-[1224px] mx-auto">
        <h2 className="font-semibold text-lg mb-6">Pedidos recomendados</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductItem
              className="min-w-full max-w-full"
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
