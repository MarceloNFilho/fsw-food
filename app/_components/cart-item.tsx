import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, priceFormatter } from "../_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { memo, useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantity = () => decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantity = () => increaseProductQuantity(cartProduct.id);

  const handleIRemoveProductFromCart = () =>
    removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-sm object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {priceFormatter(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity
              )}
            </h4>

            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs line-through text-muted-foreground">
                {priceFormatter(
                  Number(cartProduct.price) * cartProduct.quantity
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="border border-muted-foreground w-8 h-8"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <span className="w-3 text-center text-sm">
              {cartProduct.quantity}
            </span>
            <Button
              size={"icon"}
              onClick={handleIncreaseQuantity}
              className="w-8 h-8"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size={"icon"}
        variant={"ghost"}
        className="border border-muted-foreground w-8 h-8"
        onClick={handleIRemoveProductFromCart}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default memo(CartItem, (prev, next) => {
  return prev.cartProduct.quantity === next.cartProduct.quantity;
});
