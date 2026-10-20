// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Popover, PopoverContent, PopoverTrigger } from "@siso/blocks/source";
import { Button } from "@siso/blocks/source";

export function ShareMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="secondary">Share</Button></PopoverTrigger>
      <PopoverContent>
        <p>Anyone with the link can view.</p>
      </PopoverContent>
    </Popover>
  );
}
