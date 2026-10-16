import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/pagination';

export default function FloatingPagination() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-md border">
      {/* This container simulates a scrollable area */}
      <div className="h-full overflow-y-auto p-4">
        {/* Sample content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Sample Content</h2>
          <p className="text-muted-foreground">
            Scroll down to see the floating pagination.
          </p>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-md border p-4">
              <h3 className="font-medium">Item {i + 1}</h3>
              <p className="text-muted-foreground text-sm">
                This is a sample item description.
              </p>
            </div>
          ))}
        </div>

        {/* Floating pagination */}
        <div className="sticky right-0 bottom-4 left-0 mt-4 flex justify-center">
          <Pagination>
            <PaginationContent className="bg-card text-card-foreground rounded-full border p-1 shadow-md">
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
      </div>
    </div>
  );
}
