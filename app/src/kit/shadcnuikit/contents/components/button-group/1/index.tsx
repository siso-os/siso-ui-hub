"use client";

import * as React from "react";
import { Button } from "../../../../../shadcn/ui/button";
import { ButtonGroup } from "../../../../../shadcn/ui/button-group";

export default function ButtonGroupComponent() {
  const [label, setLabel] = React.useState("personal");

  return (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  );
}
