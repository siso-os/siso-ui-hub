import { useId } from "react";
import { Button } from "../../../../shadcn/ui/button";
import { Checkbox } from "../../../../shadcn/ui/checkbox";
import { Label } from "../../../../shadcn/ui/label";

const CheckboxFormDemo = () => {
  const id = useId();

  return (
    <div className="flex items-start gap-2">
      <Checkbox id={id} defaultChecked className='cursor-pointer' />
      <div className="grid gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor={id} className="gap-1 leading-4">
            Subscribe to our newsletter
          </Label>
          <p className="text-muted-foreground text-xs">
            Get weekly updates, product tips, and exclusive offers.
          </p>
        </div>
        <Button size="sm" className="w-fit cursor-pointer">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default CheckboxFormDemo;
