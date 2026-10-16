"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../../shadcn/ui/card";
import { Icon } from "@iconify/react";

const TotalSalesCode = () => {
  return (
    <div className="w-full max-w-xl">
      <Card className="relative pb-0">
        <CardHeader className="flex flex-col gap-0.5">
          <CardDescription className="text-sm font-normal text-muted-foreground">
            Total Sales
          </CardDescription>
          <CardTitle className="text-base font-medium">Shadcn Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col justify-between gap-2 h-full pb-4">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-2 self-end shrink-0">
              <h5 className="text-2xl leading-tight font-semibold">
                $98,452.76
              </h5>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-chart-2/15 text-chart-2 flex items-center justify-center">
                  <Icon
                    icon="solar:arrow-up-line-duotone"
                    width={14}
                    height={14}
                  />
                </span>
                <p className="text-sm font-medium text-chart-2!">+32.8%</p>
              </div>
            </div>
            <img
              src="https://images.shadcnspace.com/assets/shadcn-dashboard/background/ecom-dash.webp"
              alt="chasing_grades_bg"
              className="absolute bottom-0 right-0 w-48 h-auto object-contain pointer-events-none lg:block hidden"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalSalesCode;
