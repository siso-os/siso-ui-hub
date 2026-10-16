"use client";

import { Card, CardContent } from "../../../../../shadcn/ui/card";
import { Sidebar, SidebarProvider, SidebarTrigger } from "../../../../../shadcn/ui/sidebar";

const DashboardFooter2 = () => {
  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar className="**:data-[slot=sidebar-inner]:bg-background">
          <div className="flex h-full flex-col gap-6 p-4">
            <a href="#" className="block w-fit">
              <img
                src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/fulldark-logo.svg"
                alt="logo"
                width={100}
                height={32}
                className="block dark:hidden"
              />
              <img
                src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/fullwhite-logo.svg"
                alt="logo"
                width={100}
                height={32}
                className="hidden dark:block"
              />
            </a>
            <div className="h-full" />
          </div>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="bg-card sticky top-0 z-50 flex h-13.75 items-center justify-between gap-6 border-b px-4 py-2 sm:px-6">
            <SidebarTrigger className="[&_svg]:size-5! hover:bg-background" />
          </header>
          <main className="size-full flex-1 px-4 py-6 sm:px-6">
            <Card className="h-full bg-muted">
              <CardContent className="h-full">
            
              </CardContent>
            </Card>
          </main>
          <footer className="border-t border-border py-4">
            <div className="flex items-center justify-between px-4 sm:px-6">
              <a href="#" className="block w-fit">
                <img
                  src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/white-logo.svg"
                  alt="logo"
                  width={32}
                  height={32}
               
                />
              </a>
              <p className="text-sm text-muted-foreground">
                {`© ${new Date().getFullYear()} shadcndashboard. All rights reserved.`}
              </p>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardFooter2;
