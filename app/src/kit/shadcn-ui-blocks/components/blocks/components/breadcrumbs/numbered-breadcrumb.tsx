import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export default function NumberedBreadcrumb() {
  return (
    <Breadcrumb className="p-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-2">
            <span className="bg-muted flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
              1
            </span>
            <span>Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-2">
            <span className="bg-muted flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
              2
            </span>
            <span>Products</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="flex items-center gap-2"
          >
            <span className="bg-muted flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
              3
            </span>
            <span>Categories</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2 font-medium">
            <span className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
              4
            </span>
            <span>Electronics</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
