"use client"

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Button } from "../../../ui/button"
import { ButtonGroup, ButtonGroupText } from "../../../ui/button-group"

export default function ButtonGroupWithTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Deploy</ButtonGroupText>
      <Button intent="outline">
        Options
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  )
}
