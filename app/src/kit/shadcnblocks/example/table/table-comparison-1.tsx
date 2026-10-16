import { CheckIcon, MinusIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shadcn/ui/table";

export const title = "Plan comparison";

const rows = [
  { feature: "Projects", free: "3", pro: "Unlimited", team: "Unlimited" },
  { feature: "Members", free: "1", pro: "5", team: "25" },
  { feature: "SSO", free: false, pro: false, team: true },
  { feature: "Audit log", free: false, pro: true, team: true },
  { feature: "Priority support", free: false, pro: true, team: true },
];

const Cell = ({ value }: { value: string | boolean }) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="mx-auto size-4 text-green-600" />
    ) : (
      <MinusIcon className="mx-auto size-4 text-muted-foreground" />
    );
  }
  return <span>{value}</span>;
};

const Example = () => (
  <div className="w-full max-w-2xl rounded-md border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          <TableHead className="text-center">Free</TableHead>
          <TableHead className="text-center">Pro</TableHead>
          <TableHead className="text-center">Team</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.feature}>
            <TableCell className="font-medium">{row.feature}</TableCell>
            <TableCell className="text-center">
              <Cell value={row.free} />
            </TableCell>
            <TableCell className="text-center">
              <Cell value={row.pro} />
            </TableCell>
            <TableCell className="text-center">
              <Cell value={row.team} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default Example;
