import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import Banner from "./_components/banner";
import ProductList from "./_components/product-list";
import SectionTitle from "./_components/section-title";
import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const fetch = async () => {
  const getProducts = db.product.findMany({
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

  const getBurgersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burgersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurgersCategory,
    getPizzasCategory,
  ]);

  return { products, burgersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burgersCategory, pizzasCategory } = await fetch();

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
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <Banner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5">
          <SectionTitle title="Pedidos recomendados" route="products" />
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${burgersCategory?.id}/products`}>
          <Banner
            src="/promo-banner-02.png"
            alt="A partir de 17,90 em lanches"
          />
        </Link>
      </div>

      <div className="py-6 space-y-4">
        <div className="px-5">
          <SectionTitle title="Restaurantes recomendados" route="restaurants" />
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
