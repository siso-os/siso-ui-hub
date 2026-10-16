import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export default function BackgroundBreadcrumb() {
  return (
    <Breadcrumb className="p-6">
      <BreadcrumbList className="bg-muted rounded-lg p-2">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="hover:bg-background rounded px-2 py-1 transition-colors"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="hover:bg-background rounded px-2 py-1 transition-colors"
          >
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="hover:bg-background rounded px-2 py-1 transition-colors"
          >
            Categories
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="bg-background rounded px-2 py-1 font-medium">
            Electronics
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
