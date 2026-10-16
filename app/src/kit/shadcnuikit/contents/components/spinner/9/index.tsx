import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../../shadcn/ui/input-group";
import { Spinner } from "../../../../../shadcn/ui/spinner";

export default function Component() {
  return (
    <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
