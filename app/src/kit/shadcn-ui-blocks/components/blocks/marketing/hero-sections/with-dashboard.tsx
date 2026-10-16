import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';

export default function HeroSectionWithDashboard() {
  return (
    <>
      {/* Hero */}
      <div className="">
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520,#e6198520)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 dark:ring-slate-800" />
          </div>

          <div className="container mx-auto grid items-center gap-12 px-4 py-24 md:px-6 lg:grid-cols-2 lg:py-32 2xl:max-w-[1400px]">
            <div>
              <Badge variant="outline" className="mb-4">
                Analytics Dashboard
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Monitor your business metrics
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Get real-time insights into your business performance with our
                beautiful and intuitive dashboard components.
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Try Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-muted-foreground text-sm">
                        Performance Score
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2.4M</p>
                      <p className="text-muted-foreground text-sm">
                        Active Users
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <Card className="overflow-hidden border-2">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 h-8 w-8 rounded-full" />
                    <div>
                      <p className="font-medium">Analytics Overview</p>
                      <p className="text-muted-foreground text-sm">
                        Last 30 days
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                  {/* Chart Preview */}
                  <div className="bg-muted/40 mb-6 flex h-[300px] items-center justify-center rounded-lg">
                    <img
                      src="https://placehold.co/800x300.jpeg"
                      alt="Analytics Chart"
                      width={800}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted/40 rounded-lg p-4">
                      <p className="text-muted-foreground text-sm">Revenue</p>
                      <p className="text-2xl font-bold">$48.2K</p>
                      <p className="text-sm text-green-500">+12.4%</p>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-4">
                      <p className="text-muted-foreground text-sm">Orders</p>
                      <p className="text-2xl font-bold">2,567</p>
                      <p className="text-sm text-green-500">+8.2%</p>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-4">
                      <p className="text-muted-foreground text-sm">Customers</p>
                      <p className="text-2xl font-bold">1.2M</p>
                      <p className="text-sm text-green-500">+4.7%</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating Notification */}
              <Card className="absolute -right-8 -bottom-8 z-10 w-72 animate-bounce">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">New Milestone!</p>
                      <p className="text-muted-foreground text-sm">
                        Revenue target achieved
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
