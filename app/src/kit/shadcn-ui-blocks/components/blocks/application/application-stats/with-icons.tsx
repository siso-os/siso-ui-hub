import { Users, Timer, MousePointer, Eye } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";

export default function WithIcons() {
  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Total users
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">72,540</h3>
                </div>
              </div>
              <div className="bg-primary/10 flex h-[46px] w-[46px] items-center justify-center rounded-lg">
                <Users className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Avg. Time
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">2.4m</h3>
                </div>
              </div>
              <div className="bg-primary/10 flex h-[46px] w-[46px] items-center justify-center rounded-lg">
                <Timer className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Click Rate
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">56.8%</h3>
                </div>
              </div>
              <div className="bg-primary/10 flex h-[46px] w-[46px] items-center justify-center rounded-lg">
                <MousePointer className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Pageviews
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">92,913</h3>
                </div>
              </div>
              <div className="bg-primary/10 flex h-[46px] w-[46px] items-center justify-center rounded-lg">
                <Eye className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
