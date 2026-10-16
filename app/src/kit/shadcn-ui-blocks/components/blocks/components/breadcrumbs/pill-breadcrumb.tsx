import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export default function PillBreadcrumb() {
  return (
    <Breadcrumb className="p-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            className="bg-muted hover:bg-muted/80 rounded-full px-3 py-1 transition-colors"
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
            className="bg-muted hover:bg-muted/80 rounded-full px-3 py-1 transition-colors"
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
            className="bg-muted hover:bg-muted/80 rounded-full px-3 py-1 transition-colors"
          >
            Categories
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="bg-primary text-primary-foreground rounded-full px-3 py-1 font-medium">
            Electronics
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
