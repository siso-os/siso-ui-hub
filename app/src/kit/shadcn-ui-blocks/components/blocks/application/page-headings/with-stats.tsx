import { Card, CardContent } from "../../../ui/card";
import {
  ArrowDown,
  ArrowUp,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

export default function PageHeadingWithStats() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 2xl:max-w-[1400px]">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Your business performance at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-0">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Total Customers
              </p>
              <h2 className="mt-2 text-3xl font-bold">2,543</h2>
              <p className="mt-1 flex items-center text-sm text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                12.5% from last month
              </p>
            </div>
            <Users className="text-muted-foreground h-8 w-8" />
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Revenue
              </p>
              <h2 className="mt-2 text-3xl font-bold">$45,231</h2>
              <p className="mt-1 flex items-center text-sm text-red-600">
                <ArrowDown className="mr-1 h-4 w-4" />
                4.3% from last month
              </p>
            </div>
            <DollarSign className="text-muted-foreground h-8 w-8" />
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Orders
              </p>
              <h2 className="mt-2 text-3xl font-bold">1,345</h2>
              <p className="mt-1 flex items-center text-sm text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                8.2% from last month
              </p>
            </div>
            <ShoppingCart className="text-muted-foreground h-8 w-8" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
