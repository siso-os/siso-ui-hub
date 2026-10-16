import { Card, CardContent } from "../../../ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function WithDescription() {
  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Revenue
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium sm:text-2xl">$45,231.89</h3>
                <span className="flex items-center gap-0.5 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm">20.1%</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                +20.1% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Subscriptions
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium sm:text-2xl">+2350</h3>
                <span className="flex items-center gap-0.5 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm">10.3%</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                +180.1% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Churn Rate
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium sm:text-2xl">-0.5%</h3>
                <span className="flex items-center gap-0.5 text-red-700 dark:text-red-400">
                  <ArrowDown className="h-4 w-4" />
                  <span className="text-sm">4.5%</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                +4.5% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Active Users
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium sm:text-2xl">+573</h3>
                <span className="flex items-center gap-0.5 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm">12.5%</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                +12.5% from last week
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
