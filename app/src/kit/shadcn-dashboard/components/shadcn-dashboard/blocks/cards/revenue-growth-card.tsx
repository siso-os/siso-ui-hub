"use client";
import { Button } from "../../../../../shadcn/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../shadcn/ui/card";

import { ChartSpline } from "lucide-react";
export default function RevenueGrowthCode() {
  return (
    <div className="max-w-lg w-full">
      <Card className="flex h-full justify-between gap-10">
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium text-primary">
              Revenue Growth
            </CardTitle>
          </div>
          <Button className="rounded-full h-9 w-9">
            <ChartSpline size={16} />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <h5 className="text-3xl font-semibold ">+24%</h5>
          <p className="text-sm font-normal text-muted-foreground">
            Compared to Last Month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
