import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex gap-1 justify-center items-center bg-white border border-muted rounded-sm px-4 py-3 min-w-40">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />

      <span className="font-semibold text-sm truncate">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
