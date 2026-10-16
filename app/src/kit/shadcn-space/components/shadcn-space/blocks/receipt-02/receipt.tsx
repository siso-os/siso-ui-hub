"use client";

import Logo from "../../../../assets/logo/logo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../../shadcn/ui/breadcrumb";
import { Button } from "../../../../../shadcn/ui/button";
import { Separator } from "../../../../../shadcn/ui/separator";
import { cn } from "@/arc-shims/kit-utils";
import { CheckCircle2, Circle } from "lucide-react";

export type ParcelItem = {
  id: string;
  image: string;
  title: string;
  weight: string;
  qty: number;
  color: string;
  price: number;
};

type Recipt02Props = {
  orderNumber?: string;
  title?: string;
  subtitle?: string;
  items: ParcelItem[];
  shippingAddress?: string;
  cardLast4?: string;
  shippingLabel?: string;
  deliveryEstimate?: string;
};

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const Recipt02 = ({
  orderNumber = "#SK-2026-9041",
  title = "Your Headphones Are Secured.",
  subtitle,
  items,
  shippingAddress = "1482 Pine Street, Suite 4B, San Francisco, CA 94109",
  cardLast4 = "9821",
  shippingLabel = "Complementary",
  deliveryEstimate = "Estimated Delivery: March 24 - 26, 2026",
}: Recipt02Props) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;
  const resolvedSubtitle =
    subtitle ??
    `We've received order ${orderNumber} and are assembling your delivery.`;

  return (
    <section className="lg:bg-linear-to-r bg-linear-to-b from-background from-57% to-43% to-blue-500 min-h-screen content-center">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 my-auto xl:px-0 px-4">
        {/* content section */}
        <div className="flex w-full flex-col justify-between md:gap-16 gap-6 lg:col-span-6 col-span-12 sm:py-10 py-6">
          <div className="flex flex-col gap-6 lg:gap-12">
            <div className="flex items-center justify-between">
              <Logo />
              <Breadcrumb>
                <BreadcrumbList className="flex-nowrap">
                  <BreadcrumbItem>Shop</BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">
                      Confirmation
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-medium text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">
                {resolvedSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:gap-6 gap-4">
              <p className="text-lg font-medium text-foreground">
                Parcel Contents
              </p>
              <div className="flex flex-col">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-4 py-5",
                      index !== items.length - 1 && "border-b border-border",
                    )}
                  >
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg lg:size-16">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>Weight : {item.weight}</span>
                        <span>Qty: {item.qty}</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-foreground lg:text-base">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-base font-medium text-foreground">
                Shipping Destination
              </p>
              <p className="text-sm text-muted-foreground">{shippingAddress}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-foreground">
                Billing Method
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-10 items-center justify-center rounded border border-border">
                  <img
                    src="https://images.shadcnspace.com/assets/svgs/icon-visa-color.svg"
                    alt="visa icon"
                    width={32}
                    height={16}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Visa ending in {cardLast4}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-2 col-span-0 lg:block hidden"/>
        {/* summary panel */}
        <div className="flex w-full flex-col justify-center lg:col-span-4 col-span-12 lg:pb-0 pb-6">
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold text-white">
                Receipt Overview
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-base text-white/70">Subtotal</span>
                  <span className="text-sm text-white">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-white/70">
                    Shipping Priority
                  </span>
                  <span className="text-sm text-white">{shippingLabel}</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between text-lg font-medium text-white">
                  <span>Total Value</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-xl bg-black/10 p-6">
              <p className="text-lg font-medium text-white">Shipping Journal</p>
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="size-5 text-white" />
                    <span className="h-8 w-px rounded-full bg-white" />
                  </div>
                  <p className="text-sm font-medium text-white">
                    Order Placed &amp; Secured
                  </p>
                </div>
                <div className="flex gap-3">
                  <Circle className="size-5 shrink-0 text-white/60" />
                  <p className="text-sm text-white/60">{deliveryEstimate}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button className="h-10 w-full rounded-lg bg-white text-neutral-900 shadow-xs hover:bg-white/90">
                Launch Tracking
              </Button>
              <button
                type="button"
                className="text-sm font-medium text-white underline underline-offset-4"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipt02;
