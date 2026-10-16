import { SearchIcon } from "lucide-react";

import { Button } from "../../../../../shadcn/ui/button";
import { ButtonGroup } from "../../../../../shadcn/ui/button-group";
import { Input } from "../../../../../shadcn/ui/input";

export default function Component() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
