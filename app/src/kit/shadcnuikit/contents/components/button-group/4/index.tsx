import { Button } from "../../../../../shadcn/ui/button";
import { ButtonGroup } from "../../../../../shadcn/ui/button-group";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ButtonGroupComponent() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <ChevronLeftIcon />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  );
}
