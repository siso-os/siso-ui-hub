import { ChevronUp, ChevronDown } from "lucide-react";

export default function GradientGrid() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/25 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.7),transparent)] pointer-events-none" />

          <div className="text-center mb-10 relative">
            <h2 className="text-3xl font-bold md:text-4xl">Company Metrics</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Tracking our growth and impact with real-time analytics
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            {/* Stat 1 */}
            <div className="rounded-lg border bg-card p-6 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/15 mb-4">
                  <ChevronUp className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-4xl font-bold">97K</h3>
                <p className="mt-2 font-medium">Active Users</p>
                <p className="text-sm text-muted-foreground mt-1">
                  +24.3% this month
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="rounded-lg border bg-card p-6 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/15 mb-4">
                  <ChevronUp className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-4xl font-bold">$2.4M</h3>
                <p className="mt-2 font-medium">Revenue</p>
                <p className="text-sm text-muted-foreground mt-1">+10.8% YTD</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="rounded-lg border bg-card p-6 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/15 mb-4">
                  <ChevronDown className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-4xl font-bold">0.8%</h3>
                <p className="mt-2 font-medium">Churn Rate</p>
                <p className="text-sm text-muted-foreground mt-1">
                  -2.1% from last quarter
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="rounded-lg border bg-card p-6 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/15 mb-4">
                  <ChevronUp className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-4xl font-bold">94%</h3>
                <p className="mt-2 font-medium">Customer Satisfaction</p>
                <p className="text-sm text-muted-foreground mt-1">
                  +3% this quarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
