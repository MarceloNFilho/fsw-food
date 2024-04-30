import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import Banner from "./_components/banner";
import ProductList from "./_components/product-list";
import SectionTitle from "./_components/section-title";

export default function Home() {
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
        <ProductList />
      </div>
    </>
  );
}
