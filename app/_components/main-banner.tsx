import Image from "next/image";
import Search from "./search";

const MainBanner = () => {
  return (
    <div className="bg-primary w-full h-[500px]">
      <div className="flex h-full items-end justify-between max-w-[1224px] mx-auto">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-[48px] font-bold text-white">Está com fome?</h1>
          <span className="text-white text-lg">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </span>

          <div className="bg-white rounded-sm p-6 mt-8">
            <Search isSecondary />
          </div>
        </div>
        <Image src="/yakisoba.png" alt="yakisoba" width={450} height={377} />
      </div>
    </div>
  );
};

export default MainBanner;
