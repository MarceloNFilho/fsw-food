"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | `imageUrl`>;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleClickBack = () => router.back();

  return (
    <div className="relative w-full max-lg:h-[356px] h-[456px]">
      <Image
        src={product?.imageUrl}
        alt={product?.name}
        fill
        className="object-cover min-[1440px]:rounded-sm"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white min-[1440px]:hidden "
        size={"icon"}
        onClick={handleClickBack}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
