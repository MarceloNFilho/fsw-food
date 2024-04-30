import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-semibold">{title}</h2>

      <Button
        variant={"ghost"}
        className="h-fit text-primary p-0 hover:bg-transparent"
      >
        Ver todos
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default SectionTitle;
