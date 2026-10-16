import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../../../ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DotIndicatorPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationLink
              href="#"
              size="icon"
              className="h-8 w-8"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

          <div className="mx-2 flex items-center gap-2">
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-muted hover:bg-muted-foreground/50 h-3 w-3 rounded-full p-0 transition-colors"
                aria-label="Go to page 1"
              >
                <span className="sr-only">1</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="bg-primary hover:bg-primary/80 h-3 w-3 rounded-full p-0 transition-colors"
                aria-label="Current page, page 2"
              >
                <span className="sr-only">2</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-muted hover:bg-muted-foreground/50 h-3 w-3 rounded-full p-0 transition-colors"
                aria-label="Go to page 3"
              >
                <span className="sr-only">3</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-muted hover:bg-muted-foreground/50 h-3 w-3 rounded-full p-0 transition-colors"
                aria-label="Go to page 4"
              >
                <span className="sr-only">4</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-muted hover:bg-muted-foreground/50 h-3 w-3 rounded-full p-0 transition-colors"
                aria-label="Go to page 5"
              >
                <span className="sr-only">5</span>
              </PaginationLink>
            </PaginationItem>
          </div>

          <PaginationItem>
            <PaginationLink
              href="#"
              size="icon"
              className="h-8 w-8"
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
