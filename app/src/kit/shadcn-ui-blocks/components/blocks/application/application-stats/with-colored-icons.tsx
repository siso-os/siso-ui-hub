import { Card, CardContent } from "../../../ui/card";
import { Users, Timer, MousePointer, Eye } from "lucide-react";

export default function WithColoredIcons() {
  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Card */}
        <Card className="pt-0">
          <CardContent className="flex justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Total users
              </p>
              <div className="mt-1">
                <h3 className="text-xl font-medium sm:text-2xl">72,540</h3>
              </div>
            </div>
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-800">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="flex justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Avg. Time
              </p>
              <div className="mt-1">
                <h3 className="text-xl font-medium sm:text-2xl">2.4m</h3>
              </div>
            </div>
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-green-100 dark:bg-green-800">
              <Timer className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="flex justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Click Rate
              </p>
              <div className="mt-1">
                <h3 className="text-xl font-medium sm:text-2xl">56.8%</h3>
              </div>
            </div>
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-800">
              <MousePointer className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="flex justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Pageviews
              </p>
              <div className="mt-1">
                <h3 className="text-xl font-medium sm:text-2xl">92,913</h3>
              </div>
            </div>
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-800">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
