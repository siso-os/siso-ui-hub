import { Card, CardContent } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import {
  ArrowDown,
  ArrowUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react";

export default function WithBadges() {
  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-primary">
                  <Users className="mr-1 h-3 w-3" />
                  Users
                </Badge>
                <span className="flex items-center gap-0.5 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">12%</span>
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">2,340</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Active users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-primary">
                  <DollarSign className="mr-1 h-3 w-3" />
                  Revenue
                </Badge>
                <span className="flex items-center gap-0.5 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">8.5%</span>
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">$12,430</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Monthly revenue
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-primary">
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Sales
                </Badge>
                <span className="flex items-center gap-0.5 text-red-700 dark:text-red-400">
                  <ArrowDown className="h-3 w-3" />
                  <span className="text-xs">4.2%</span>
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">1,240</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Weekly sales
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-primary">
                  <Activity className="mr-1 h-3 w-3" />
                  Conversion
                </Badge>
                <span className="flex items-center gap-0.5 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">2.4%</span>
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">24.5%</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Conversion rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
