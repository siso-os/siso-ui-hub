import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/pagination';

export default function BorderedPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="border-border hover:border-primary border-2 transition-colors"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="border-border hover:border-primary border-2 transition-colors"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="border-primary text-primary hover:bg-primary/10 border-2 bg-transparent"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="border-border hover:border-primary border-2 transition-colors"
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="text-muted-foreground" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="border-border hover:border-primary border-2 transition-colors"
            >
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className="border-border hover:border-primary border-2 transition-colors"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
