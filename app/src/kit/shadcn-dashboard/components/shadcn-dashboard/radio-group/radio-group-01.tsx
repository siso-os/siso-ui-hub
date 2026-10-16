import React from "react";
import { Label } from "../../../../shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../shadcn/ui/radio-group";

const DefaultRadioCode = () => {
  return (
    <>
      <div className="mt-4">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-top space-x-2">
            <RadioGroupItem
              value="default"
              id="r1"
              className={"cursor-pointer"}
            />
            <Label htmlFor="r1" className="font-normal">
              Default
            </Label>
          </div>
          <div className="flex items-top space-x-2">
            <RadioGroupItem
              value="comfortable"
              id="r2"
              className={"cursor-pointer"}
            />
            <Label htmlFor="r2" className="font-normal">
              {" "}
              Comfortable
            </Label>
          </div>
          <div className="flex items-top space-x-2">
            <RadioGroupItem
              value="compact"
              id="r3"
              className={"cursor-pointer"}
            />
            <Label htmlFor="r3" className="font-normal">
              Compact
            </Label>
          </div>
          <div className="flex items-top space-x-2">
            <RadioGroupItem
              value="digital"
              id="r4"
              className={"cursor-pointer"}
            />
            <Label htmlFor="r4" className="font-normal">
              Digital
            </Label>
          </div>
          <div className="flex items-top space-x-2">
            <RadioGroupItem
              value="Enlarge"
              id="r5"
              className={"cursor-pointer"}
            />
            <Label htmlFor="r5" className="font-normal">
              Enlarge
            </Label>
          </div>
          <div className="flex items-top space-x-2">
            <RadioGroupItem
              value="Maximize"
              id="r6"
              className={"cursor-pointer"}
            />
            <Label htmlFor="r6" className="font-normal">
              Maximize
            </Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default DefaultRadioCode;