import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../../../ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CompactPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent className="gap-0.5">
          <PaginationItem>
            <PaginationLink
              href="#"
              size="icon"
              className="h-7 w-7"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-3 w-3" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="h-7 w-7 text-xs">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive className="h-7 w-7 text-xs">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="h-7 w-7 text-xs">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="h-7 w-7 text-xs">
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="h-7 w-7 text-xs">
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              size="icon"
              className="h-7 w-7"
              aria-label="Go to next page"
            >
              <ChevronRight className="h-3 w-3" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
