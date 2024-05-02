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

      <Button
        variant={"ghost"}
        className="h-fit text-primary p-0 hover:bg-transparent"
        asChild
      >
        <Link href={`/${route}/recommended`}>Ver todos</Link>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default SectionTitle;
