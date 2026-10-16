
import { Card, CardContent } from "../../../../../shadcn/ui/card";
import { Button } from "../../../../../shadcn/ui/button";
import { ArrowRight } from "lucide-react";

const UpdateBannerCode = () => {
  return (
    <div className="w-full max-w-4xl">
      <Card className="">
       <CardContent className="flex items-center flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-chart-1 animate-ping absolute inline-flex" />
            <span className="h-2 w-2 rounded-full bg-chart-1 absolute inline-flex" />
            <p className="text-sm font-medium  ps-4">Update</p>
            <span className="w-1 h-1 rounded-full bg-border" />
            <p className="text-sm font-normal text-muted-foreground">Nov 25th, 2024</p>
          </div>
          <p className="text-sm font-normal">
            Sales revenue increased <span className="text-emerald-600">40%</span> in 1 week
          </p>
        </div>
        <a href={'#'}>
          <Button variant={'outline'} className="flex gap-1.5 cursor-pointer">
            See Statistics
            <span>
              <ArrowRight width={18} height={18} />
            </span>
          </Button>
        </a>
      </CardContent>
    </Card>
    </div>
  );
};

export default UpdateBannerCode;
