import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return (
    <>
      <div className="max-lg:hidden">
        <Header withSearch />
      </div>

      <div className="max-lg:block hidden">
        <Header />
      </div>

      <div className="max-lg:px-5 py-6 max-w-[1440px] mx-auto">
        <h2 className="font-semibold text-lg mb-6">{category?.name}</h2>
        <div className="grid max-lg:grid-cols-2 grid-cols-6 gap-6">
          {category?.products.map((product) => (
            <ProductItem
              className="min-w-full "
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
