import { ChevronDownIcon, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../../../../shadcn/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "../../../../../shadcn/ui/input-group";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent
} from "../../../../../shadcn/ui/select";

export default function Component() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <Select defaultValue=".com">
            <SelectTrigger className="absolute end-0 border-0! focus:ring-0!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value=".com">.com</SelectItem>
              <SelectItem value=".net">.net</SelectItem>
              <SelectItem value=".org">.org</SelectItem>
            </SelectContent>
          </Select>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
