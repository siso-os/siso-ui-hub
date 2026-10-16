"use client";
import { Handbag, Users, Box, Icon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "../../../../../shadcn/ui/card";
import { Badge } from "../../../../../shadcn/ui/badge";
import { Button } from "../../../../../shadcn/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/arc-shims/kit-utils";

 const ProductsData = [
    {
      id: 1,
      title: 'Weekly sales',
      amount: '714k',
      growthPercentage: '40%',
      badgeColor: "!bg-chart-2/10" ,
      badgetxtcolor: "!text-chart-2",
      icon: Handbag,

    },
    {
      id: 2,
      title: 'New users',
      amount: '1.35m',
      growthPercentage: '20%',
      badgeColor: "!bg-rose-600/10" ,
      badgetxtcolor: "!text-rose-600",
      icon: Users,

    },
    {
      id:3,
      title: 'Purchase Orders',
      amount: '1.72m',
      growthPercentage: '40%',
      badgeColor: "!bg-chart-2/10" ,
      badgetxtcolor: '!text-chart-2',
      icon: Box,

    },
  ]
const ProductCardCode = () => {
  return (
    <div className="w-full">
      <Card className="py-0!">
      <div className="grid grid-cols-12">
        {ProductsData.map((product) => (
          <div
            className="lg:col-span-4 col-span-12 lg:border-e lg:border-b-0  md:border-b md:border-r-0 max-md:border-b  border-border last:border-0 flex flex-wrap flex-col justify-between gap-4 py-4"
            key={product.id}
          >
              <CardHeader>
                <CardTitle>
                  <h4 className="text-sm font-normal">{product.title}</h4>
                </CardTitle>
                <CardAction>
                  <div className={`p-3 rounded-md outline`}>
                    <product.icon size={16} />
                  </div>
                </CardAction>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold">{product.amount}</h3>
                
               <Badge  className={cn(product.badgeColor ,product.badgetxtcolor, "font-normal")}>{product.growthPercentage}</Badge> 

                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant={"outline"}
                  className={
                    "flex items-center gap-1.5 w-fit cursor-pointer"
                  }
                >
                  <span>See Statistics</span>
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
          </div>
        ))}
      </div>
        </Card>
    </div>

  
  );
};
export default ProductCardCode;
