"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, MenuIcon, SearchIcon, ShoppingBag } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../../../../shadcn/ui/navigation-menu";
import { Button } from "../../../../../../shadcn/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../../../../../shadcn/ui/drawer";
import { Separator } from "../../../../../../shadcn/ui/separator";
import { Badge } from "../../../../../../shadcn/ui/badge";
import {
  BagIcon,
  JewelryIcon,
  SunglassesIcon,
  HatIcon,
  BeltIcon,
  OtherIcon,
} from "./icons";

type ListItemType = {
  title: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const accessoriesMenuItems: ListItemType[] = [
  {
    title: "Bags",
    href: "#",
    icon: BagIcon,
  },
  {
    title: "Jewelry",
    href: "#",
    icon: JewelryIcon,
  },
  {
    title: "Sunglasses",
    href: "#",
    icon: SunglassesIcon,
  },
  {
    title: "Hats & Beanies",
    href: "#",
    icon: HatIcon,
  },
  {
    title: "Belts",
    href: "#",
    icon: BeltIcon,
  },
  {
    title: "All Accessories",
    href: "#",
    icon: OtherIcon,
  },
];

const collectionItems = [
  {
    title: "Trends",
    href: "#",
    description: "Discover this summer's trendy products.",
  },
  {
    title: "Best Sellers",
    href: "#",
    description: "We've collected the best-selling products for you.",
  },
  {
    title: "New Arrivals",
    href: "#",
    description: "The latest pieces, just landed in store.",
  },
];

const featuredImage =
  "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=300&auto=format&fit=crop";

const cartItemCount = 4;

export default function NavigationMenuDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full">
      <header>
        <div className="flex grid-cols-3 items-center justify-between p-4">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="size-6 rounded-md"
              src="/logo.png"
              width={24}
              height={24}
              alt="Shadcn UI Kit logo"
              unoptimized
            />
            <span className="text-base font-medium whitespace-nowrap">
              Shadcn UI Kit
            </span>
          </Link>

          {/* main navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-3 md:w-[420px] lg:w-[500px] lg:grid-cols-[1fr_1.2fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="#"
                          className="flex h-full flex-col space-y-2"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Image
                            src={featuredImage}
                            alt="Folded white t-shirts with sneakers and a camera"
                            width={300}
                            height={225}
                            className="w-full flex-1 rounded object-cover"
                            unoptimized
                          />
                          <div className="space-y-1">
                            <div className="text-sm leading-none font-medium">
                              Timeless Classics
                            </div>
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                              Elevate your style with essentials
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {collectionItems.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block gap-2 space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="text-sm leading-none font-medium">
                            {item.title}
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[380px] list-none grid-cols-2 gap-1 p-3">
                    {accessoriesMenuItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-3 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.icon ? (
                              <item.icon
                                aria-hidden="true"
                                className="text-muted-foreground size-7 shrink-0"
                              />
                            ) : null}
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className={navigationMenuTriggerStyle()}
                    onClick={(e) => e.preventDefault()}
                  >
                    Women
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className={navigationMenuTriggerStyle()}
                    onClick={(e) => e.preventDefault()}
                  >
                    Men
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* right content */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search">
              <SearchIcon aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <HeartIcon aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Cart, ${cartItemCount} items`}
            >
              <ShoppingBag aria-hidden="true" />
              <Badge className="absolute -top-1 left-full size-4 -translate-x-1/2 rounded-full p-0 text-[10px]">
                {cartItemCount}
              </Badge>
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="secondary" asChild>
                <Link href="#">Sign in</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* for mobile navigation */}
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-4 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="font-medium">Collections</div>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="block space-y-2 rounded-md border p-3"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Image
                      src={featuredImage}
                      alt="Folded white t-shirts with sneakers and a camera"
                      width={300}
                      height={225}
                      className="aspect-4/3 w-full rounded object-cover"
                      unoptimized
                    />
                    <div className="space-y-1">
                      <div className="text-sm leading-none font-medium">
                        Timeless Classics
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        Elevate your style with essentials
                      </p>
                    </div>
                  </Link>
                </li>
                {collectionItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="block gap-2 space-y-1 leading-none no-underline outline-none"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="text-sm leading-none font-medium">
                        {item.title}
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="font-medium">Accessories</div>
              <ul className="grid list-none grid-cols-2 gap-2">
                {accessoriesMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="bg-muted/50 flex h-full flex-col justify-center gap-2 space-y-1 rounded-md p-3 text-center leading-none no-underline transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.icon ? (
                        <item.icon
                          aria-hidden="true"
                          className="text-muted-foreground mx-auto size-8"
                        />
                      ) : null}
                      <span className="block text-sm leading-none font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <Link
                href="#"
                className="bg-muted/50 flex flex-col justify-center gap-2 space-y-1 rounded-md p-3 text-center leading-none no-underline transition-colors"
              >
                Women
              </Link>

              <Link
                href="#"
                className="bg-muted/50 flex flex-col justify-center gap-2 space-y-1 rounded-md p-3 text-center leading-none no-underline transition-colors"
              >
                Men
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* page area placeholder that leaves room for the dropdown menus */}
      <div aria-hidden="true" className="bg-muted/50 min-h-125" />
    </div>
  );
}
