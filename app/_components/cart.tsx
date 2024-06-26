import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { priceFormatter } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { data } = useSession();
  const { products, subtotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const restaurant = products[0]?.restaurant;

    try {
      setIsSubmitting(true);

      await createOrder({
        subtotalPrice,
        totalPrice,
        totalDiscount,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
      toast("Pedido realizado com sucesso!", {
        description: "Você pode acompanha-lo na tela dos seus pedidos.",
        action: {
          label: "Meus Pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center h-full text-muted-foreground">
        <span>¯\_(ツ)_/¯</span>
        <span className="text-sm">Parece que sua sacola está vazia!</span>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 flex flex-col h-full">
        <div className="flex-auto space-y-4">
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>

        <div className="space-y-6">
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

          <Button
            className="w-full h-11"
            onClick={() => setIsDialogOpen(true)}
            disabled={isSubmitting}
          >
            Finalizar pedido
          </Button>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="w-[90%] rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
