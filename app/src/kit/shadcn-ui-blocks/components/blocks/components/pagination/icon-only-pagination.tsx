import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../../../ui/pagination';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export default function IconOnlyPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" size="icon" aria-label="Go to first page">
              <ChevronsLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
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
            <span className="flex h-9 items-center text-sm font-medium">
              Page 2 of 8
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="icon" aria-label="Go to next page">
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="icon" aria-label="Go to last page">
              <ChevronsRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
