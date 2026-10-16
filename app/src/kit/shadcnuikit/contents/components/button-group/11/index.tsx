import { Button } from "../../../../../shadcn/ui/button";
import { ButtonGroup } from "../../../../../shadcn/ui/button-group";
import { InputGroup, InputGroupInput } from "../../../../../shadcn/ui/input-group";

export default function ButtonGroupComponent() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Email address" />
        </InputGroup>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Add</Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
