import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/pagination';

export default function RoundedPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" className="rounded-full" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive className="rounded-full">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="rounded-full" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
