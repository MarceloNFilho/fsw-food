import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between pt-6 px-5">
      <Link href={"/"} className="relative h-[30px] w-[100px]">
        <Image src="/Logo.png" alt="Fsw Food" fill />
      </Link>

      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
