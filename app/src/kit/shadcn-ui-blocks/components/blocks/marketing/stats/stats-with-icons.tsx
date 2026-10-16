import { ArrowUpRight, Users, Clock, DollarSign, Target } from "lucide-react";

export default function StatsWithIcons() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold md:text-4xl">
            Our Growth in Numbers
          </h2>
          <p className="mt-3 text-muted-foreground">
            Key metrics that showcase our impact in the market
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stat Item 1 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">
                  Active Users
                </p>
                <h3 className="mt-4 text-4xl font-bold">120K+</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>18% growth</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Stat Item 2 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">
                  Avg. Session
                </p>
                <h3 className="mt-4 text-4xl font-bold">4:30</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>+2 min</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Stat Item 3 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">Revenue</p>
                <h3 className="mt-4 text-4xl font-bold">$3.2M</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>32% increase</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Stat Item 4 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">Conversion</p>
                <h3 className="mt-4 text-4xl font-bold">9.5%</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>2.1% higher</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
