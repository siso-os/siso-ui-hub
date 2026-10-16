"use client";

import { toast } from "sonner";

import { Button } from "../../../shadcn/ui/button";
import { Toaster } from "../../../shadcn/ui/sonner";

export const title = "Default Toast";

const toasterId = "default-toast";

const Example = () => (
  <>
    <Button
      onClick={() => toast("Event has been created", { toasterId })}
      variant="outline"
    >
      Show Toast
    </Button>
    <Toaster id={toasterId} />
  </>
);

export default Example;
