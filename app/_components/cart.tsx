import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { priceFormatter } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-1 items-center text-muted-foreground p-6">
        <span>¯\_(ツ)_/¯</span>
        <span className="text-sm">Parece que sua sacola está vazia!</span>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="absolute bottom-6 right-5 left-5 space-y-6">
        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{priceFormatter(subtotalPrice)}</span>
            </div>

            <Separator className="bg-muted" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega</span>

              {Number(products[0]?.restaurant.deliveryFee) === 0 ? (
                <span className="uppercase text-primary">Grátis</span>
              ) : (
                priceFormatter(Number(products[0]?.restaurant.deliveryFee))
              )}
            </div>

            <Separator className="bg-muted" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>- {priceFormatter(totalDiscount)}</span>
            </div>

            <Separator className="bg-muted" />

            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{priceFormatter(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full h-11">Finalizar compra</Button>
      </div>
    </div>
  );
};

export default Cart;
