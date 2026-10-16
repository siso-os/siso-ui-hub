import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function HorizontalWithDividers() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            Performance Metrics
          </h2>
          <p className="mt-3 text-muted-foreground">
            Measuring our success over the past year
          </p>
        </div>

        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
          {/* Stat 1 */}
          <div className="flex-1 p-6 md:p-8">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                New Customers
              </p>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-5xl font-bold">14,532</span>
                <span className="ml-2 inline-flex items-center text-sm font-medium text-emerald-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  23%
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                vs previous quarter
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex-1 p-6 md:p-8">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                Avg. Order Value
              </p>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-5xl font-bold">$89.43</span>
                <span className="ml-2 inline-flex items-center text-sm font-medium text-emerald-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  12%
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                vs previous quarter
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex-1 p-6 md:p-8">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                Customer Returns
              </p>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-5xl font-bold">3.2%</span>
                <span className="ml-2 inline-flex items-center text-sm font-medium text-emerald-500">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  8%
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                vs previous quarter
              </p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex-1 p-6 md:p-8">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                Retention Rate
              </p>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-5xl font-bold">76%</span>
                <span className="ml-2 inline-flex items-center text-sm font-medium text-emerald-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  5%
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                vs previous quarter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
