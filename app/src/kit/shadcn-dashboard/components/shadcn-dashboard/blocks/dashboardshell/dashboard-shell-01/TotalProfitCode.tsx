"use client";
import { CardContent ,Card} from "../../../../../../shadcn/ui/card";

import { Badge } from "../../../../../../shadcn/ui/badge";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "../../../../../../shadcn/ui/button";

export default function TotalProfit() {

  return (
    <Card className="py-6 h-full gap-0">
      <CardContent className="flex justify-between flex-row px-6">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-foreground">
                New users
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">1.35m</h3>
                <Badge className="bg-destructive/10! text-destructive!">20%</Badge>
              </div>
            </div>
            <Button variant={"outline"} className="p-2.5 w-fit h-fit">
              <Users size={16} />
            </Button>
          </div>
          <Button variant={'outline'} className="flex gap-1.5 px-4 py-2 h-auto cursor-pointer">
            See Statistics
            <span>
              <ArrowRight width={18} height={18} />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
