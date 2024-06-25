"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { priceFormatter } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "Confirmado";
    case "PREPARING":
      return "Em preparo";
    case "CANCELLED":
      return "Cancelado";
    case "DELIVERING":
      return "Em transporte";
    case "COMPLETED":
      return "Finalizado";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }

    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={clsx("rounded-sm w-fit px-2 py-1", {
            "bg-green-500 text-white": order.status === "COMPLETED",
            "bg-red-500 text-white": order.status === "CANCELLED",
            "bg-muted text-muted-foreground":
              order.status !== "COMPLETED" && order.status !== "CANCELLED",
          })}
        >
          <span className="block text-sm font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="font-semibold text-sm">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant={"link"}
            size={"icon"}
            className="w-5 h-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRight />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator className="bg-black/10" />
        </div>

        <div className="space-y-1">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator className="bg-black/10" />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">
            {priceFormatter(Number(order.totalPrice))}
          </p>

          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-primary"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
