import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
  route: string;
}

const SectionTitle = ({ title, route }: SectionTitleProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-semibold">{title}</h2>

      <Link href={`/${route}/recommended`}>
        <Button
          variant={"ghost"}
          className="h-fit text-primary p-0 hover:bg-transparent"
        >
          Ver todos
          <ChevronRight size={16} />
        </Button>
      </Link>
    </div>
  );
};

export default SectionTitle;
