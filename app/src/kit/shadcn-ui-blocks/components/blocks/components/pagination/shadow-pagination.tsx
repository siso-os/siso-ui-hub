import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/pagination';

export default function ShadowPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="border-none shadow-md transition-shadow hover:shadow-lg"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="border-none shadow-md transition-shadow hover:shadow-lg"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="bg-primary text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/90 border-none shadow-lg"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="border-none shadow-md transition-shadow hover:shadow-lg"
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
              className="border-none shadow-md transition-shadow hover:shadow-lg"
            >
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className="border-none shadow-md transition-shadow hover:shadow-lg"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
