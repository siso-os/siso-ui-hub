import { AppSidebar } from "./app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../../../../../shadcn/ui/breadcrumb";
import { Card } from "../../../../../../shadcn/ui/card";
import Search from "./search";

const Page = () => {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <div className="border-b border-border">
        <AppSidebar />
      </div>
      <main className="flex-1 bg-[linear-gradient(180deg,var(--primary)_0%,var(--primary)_40%,var(--secondary)_40%,var(--secondary)_100%)]">
        <div className="px-4 max-w-[1440px] mx-auto overflow-hidden">
          <div className="py-5 flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList className="text-primary-foreground text-sm">
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="hover:text-primary-foreground/80">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground/60">Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Search/>
          </div>
          <Card className="flex flex-1 flex-col gap-4 p-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="skeleton bg-muted/50 aspect-video h-12 w-full rounded-lg"
              />
            ))}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Page;

