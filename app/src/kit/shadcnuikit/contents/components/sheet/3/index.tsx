"use client";

import { Button } from "../../../../../shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../../../../../shadcn/ui/sheet";

export default function SheetComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate through different sections of the application.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
