import { Mail } from "lucide-react";

import { Button } from "../../../shadcn/ui/button";

export const title = "Default with left icon";

const Example = () => (
  <Button className="gap-2">
    <Mail className="size-4" />
    Button
  </Button>
);

export default Example;
