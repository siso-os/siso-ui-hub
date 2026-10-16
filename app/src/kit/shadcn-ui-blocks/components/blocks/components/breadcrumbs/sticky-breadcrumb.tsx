import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export default function StickyBreadcrumb() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-md border">
      {/* This container simulates a scrollable area */}
      <div className="h-full overflow-y-auto">
        {/* Sticky breadcrumb */}
        <Breadcrumb className="bg-background/80 sticky top-0 z-10 border-b p-3 shadow-sm backdrop-blur-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Categories
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                Electronics
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Sample content to demonstrate scrolling */}
        <div className="space-y-4 p-6">
          <h2 className="text-2xl font-bold">Electronics</h2>
          <p className="text-muted-foreground">
            Browse our selection of electronic products.
          </p>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-md border p-4">
                <h3 className="font-medium">Product Category {i + 1}</h3>
                <p className="text-muted-foreground text-sm">
                  This is a sample product category description.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
