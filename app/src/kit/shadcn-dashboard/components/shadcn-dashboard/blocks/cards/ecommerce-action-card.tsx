"use client";

import { Card, CardContent } from "../../../../../shadcn/ui/card";

import {
  Box,
  ChartNoAxesColumn,
  Star,
  Truck,
} from "lucide-react";

const EcommerceActions = [
  {
    id:1,
    title: "Total Orders",
    subtitle: "1920",
    cardIcon: Box,
    badgeColor: "bg-chart-2/10 ",
    badgetxtColor: "text-chart-2",
    statusValue: "+32.8%",
  },
  {
    id:2,
    title: "Orders Shipped",
    subtitle: "1785",
    cardIcon: Truck,
    badgeColor: "bg-rose-600/10 ",
    badgetxtColor: "text-rose-600",
    statusValue: "2.5%",
  },
  {
    id:3,
    title: "Revenue Generated",
    subtitle: "$88,900",
    cardIcon: ChartNoAxesColumn,
    badgeColor: "bg-chart-2/10 text-chart-2",
    badgetxtColor: "text-chart-2",
    statusValue: "+32.8%",
  },
  {
    id:4,
    title: "Customer Satisfaction",
    subtitle: "4.9 / 5.0",
    cardIcon: Star,
    badgeColor: "bg-chart-2/10 ",
    badgetxtColor: "text-chart-2",
    statusValue: "+32.8%",
  },
];

const EcommerceActionCode = () => {
  return (
    <div  className="w-full">
      <Card className="gap-0 py-0!">
        <CardContent className="flex items-center w-full xl:flex-nowrap flex-wrap px-0!">
          {EcommerceActions.map((item) => {
            return (
              <div
                className="xl:w-3/12 lg:w-6/12 w-full lg:border-e lg:max-xl:even:border-e-0 lg:border-b-0 lg:max-xl:nth-[-n+2]:border-b md:border-b md:border-r-0 max-md:border-b border-border last:border-0"
                key={item.id}
              >
                <div className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-normal">{item.title}</h5>
                      <button className={`p-2.5 rounded-md outline`}>
                        <item.cardIcon size={16} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h5 className="text-2xl font-semibold">
                        {item.subtitle}
                      </h5>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-medium ${item.badgetxtColor}`}
                        >
                          {item.statusValue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          vs last month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceActionCode;
