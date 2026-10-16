import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shadcn/ui/table";

export const title = "Empty state";

const Example = () => (
  <div className="w-full max-w-2xl rounded-md border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell
            className="h-24 text-center text-muted-foreground"
            colSpan={3}
          >
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export default Example;
