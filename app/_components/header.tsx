"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { pages } from "../_constants/pages";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => {
    signIn();
  };

  const handleSignOutClick = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-between pt-6 px-5">
      <Link href={"/"} className="relative h-[30px] w-[100px]">
        <Image src="/Logo.png" alt="Fsw Food" fill className="object-cover" />
      </Link>

      <Sheet>
        <SheetTrigger>
          <div className="flex items-center w-6 h-6 border-none bg-transparent center">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex items-center gap-3 pt-6">
                <Avatar>
                  <AvatarImage src={data.user.image || undefined} />
                  <AvatarFallback>
                    {data.user.name?.split(" ")[0][0]}
                    {data.user.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <h3 className="font-semibold">{data.user.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data.user.email}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Faça seu login</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator className="bg-black/10" />
          </div>

          <div>
            {data?.user ? (
              pages.map((page) => (
                <Button
                  key={page.name}
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal rounded-sm"
                  asChild
                >
                  <Link href={page.link}>
                    {page.icon}
                    <span className="block">{page.name}</span>
                  </Link>
                </Button>
              ))
            ) : (
              <Button
                key={pages[0].name}
                variant="ghost"
                className="w-full justify-start space-x-3 text-sm font-normal rounded-sm"
              >
                <Link href={pages[0].link} className="flex space-x-3">
                  {pages[0].icon}
                  <span className="block">{pages[0].name}</span>
                </Link>
              </Button>
            )}
          </div>

          <div className="py-6">
            <Separator className="bg-black/10" />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 text-sm font-normal rounded-sm"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
