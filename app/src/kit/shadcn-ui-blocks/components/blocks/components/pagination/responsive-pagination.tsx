import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ResponsivePagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent>
          {/* Mobile view (icon only) */}
          <div className="flex items-center gap-2 sm:hidden">
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm">Page 2 of 8</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon" aria-label="Go to next page">
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </div>

          {/* Tablet view (limited pages) */}
          <div className="hidden sm:flex md:hidden">
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </div>

          {/* Desktop view (full pagination) */}
          <div className="hidden md:flex">
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
