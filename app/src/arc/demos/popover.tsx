// From Arc's docs page (Usage), imports pointed at the copied source
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Button } from "../button/button";

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
