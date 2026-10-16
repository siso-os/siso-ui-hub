"use client";
import { Card, CardContent, CardHeader } from "../../../../../shadcn/ui/card";
import { ScrollArea } from "../../../../../shadcn/ui/scroll-area";
import { Box } from "lucide-react";


export default function LatestProducts() {
  interface product {
    id: string;
    img: string;
    productName: string;
    value: string;
  }

  const latestProducts: product[] = [
    {
      id: "1",
      img: "https://images.shadcnspace.com/assets/shadcn-dashboard/dashboard-shell/wirelessPad.webp",
      productName: "Wireless Charging Pad",
      value: "$75.00",
    },
    {
      id: "2",
      img: "https://images.shadcnspace.com/assets/shadcn-dashboard/dashboard-shell/ergonomic.webp",
      productName: "Ergonomic Office Chair",
      value: "$350.00",
    },
    {
      id: "3",
      img: "https://images.shadcnspace.com/assets/shadcn-dashboard/dashboard-shell/smartHome.webp",
      productName: "Smart Home Camera",
      value: "$180.00",
    },
    {
      id: "4",
      img: "https://images.shadcnspace.com/assets/shadcn-dashboard/dashboard-shell/bluetooth.webp",
      productName: "Bluetooth Soundbar",
      value: "$200.00",
    },
    {
      id: "5",
      img: "https://images.shadcnspace.com/assets/shadcn-dashboard/dashboard-shell/ergonomic.webp",
      productName: "Ergonomic Office Chair",
      value: "$350.00",
    },
    {
      id: "6",
      img: "https://images.shadcnspace.com/assets/shadcn-dashboard/dashboard-shell/smartHome.webp",
      productName: "Smart Home Camera",
      value: "$180.00",
    },
  ];

  return (
    <div className="w-full max-w-lg">
    <Card className="gap-0!">
      <CardHeader className="border-b border-border  flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Box size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Latest Products
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col px-0!">
        <ScrollArea className="h-84.75">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 flex items-center justify-between border-b border-border  last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.img}
                  alt="product_image"
                  className="w-10 h-10 rounded-sm"
                />
                <div className="flex flex-col">
                  <h6 className="text-base font-medium">{product.productName}</h6>
                  <p className="text-sm font-normal text-muted-foreground">8.49k users</p>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">
                {product.value}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
    </div>
  );
}
