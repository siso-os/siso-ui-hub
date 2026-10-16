"use client";

import { Button } from "../../../shadcn/ui/button";
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTitle,
  DialogStackTrigger,
} from "@/components/kibo-ui/dialog-stack";

export const title = "Two-step dialog stack";

const Example = () => (
  <DialogStack>
    <DialogStackTrigger asChild>
      <Button>Open stack</Button>
    </DialogStackTrigger>
    <DialogStackOverlay />
    <DialogStackBody>
      <DialogStackContent>
        <DialogStackHeader>
          <DialogStackTitle>Create project</DialogStackTitle>
          <DialogStackDescription>
            Start with a name and workspace.
          </DialogStackDescription>
        </DialogStackHeader>
        <DialogStackFooter>
          <DialogStackNext asChild>
            <Button>Continue</Button>
          </DialogStackNext>
        </DialogStackFooter>
      </DialogStackContent>
      <DialogStackContent>
        <DialogStackHeader>
          <DialogStackTitle>Invite teammates</DialogStackTitle>
          <DialogStackDescription>
            Optional — you can do this later.
          </DialogStackDescription>
        </DialogStackHeader>
        <DialogStackFooter className="gap-2">
          <DialogStackPrevious asChild>
            <Button variant="outline">Back</Button>
          </DialogStackPrevious>
          <Button>Finish</Button>
        </DialogStackFooter>
      </DialogStackContent>
    </DialogStackBody>
  </DialogStack>
);

export default Example;
