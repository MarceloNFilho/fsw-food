import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ButtonQuantityProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

const ButtonQuantity = ({
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: ButtonQuantityProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="border border-muted-foreground w-8 h-8"
        onClick={onDecreaseQuantity}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <span className="w-4 text-center text-sm">{quantity}</span>
      <Button size={"icon"} onClick={onIncreaseQuantity} className="w-8 h-8">
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ButtonQuantity;
