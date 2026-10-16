import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '../../../ui/breadcrumb';

export default function TimelineBreadcrumb() {
  return (
    <Breadcrumb className="p-6">
      <BreadcrumbList className="before:bg-muted-foreground/20 relative flex-col items-start gap-6 before:absolute before:top-0 before:left-[15px] before:h-full before:w-0.5 before:content-['']">
        <BreadcrumbItem className="flex w-full items-center gap-4">
          <div className="border-muted-foreground/20 bg-background relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2">
            <div className="bg-primary h-[18px] w-[18px] rounded-full"></div>
          </div>
          <BreadcrumbLink
            href="#"
            className="hover:text-primary text-base transition-colors"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem className="flex w-full items-center gap-4">
          <div className="border-muted-foreground/20 bg-background relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2">
            <div className="bg-primary h-[18px] w-[18px] rounded-full"></div>
          </div>
          <BreadcrumbLink
            href="#"
            className="hover:text-primary text-base transition-colors"
          >
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem className="flex w-full items-center gap-4">
          <div className="border-muted-foreground/20 bg-background relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2">
            <div className="bg-primary h-[18px] w-[18px] rounded-full"></div>
          </div>
          <BreadcrumbLink
            href="#"
            className="hover:text-primary text-base transition-colors"
          >
            Categories
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem className="flex w-full items-center gap-4">
          <div className="border-primary bg-background relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2">
            <div className="bg-primary h-[18px] w-[18px] rounded-full"></div>
          </div>
          <BreadcrumbPage className="text-base font-medium">
            Electronics
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
