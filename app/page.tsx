import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import Banner from "./_components/banner";
import ProductList from "./_components/product-list";
import SectionTitle from "./_components/section-title";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Banner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5">
          <SectionTitle title="Pedidos recomendados" />
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Banner src="/promo-banner-02.png" alt="A partir de 17,90 em lanches" />
      </div>
    </>
  );
};

export default Home;
