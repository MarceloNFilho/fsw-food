import { HeartIcon, HomeIcon, ScrollTextIcon } from "lucide-react";

export const pages = [
  {
    name: "Inicio",
    icon: <HomeIcon size={16} />,
    link: "/",
  },
  {
    name: "Meus Pedidos",
    icon: <ScrollTextIcon size={16} />,
    link: "/my-orders",
  },
  {
    name: "Restaurantes Favoritos",
    icon: <HeartIcon size={16} />,
    link: "/my-favorites-restaurants",
  },
];
