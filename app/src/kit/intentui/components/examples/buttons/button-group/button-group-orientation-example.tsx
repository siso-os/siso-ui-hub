"use client"

import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline"
import { Button } from "../../../ui/button"
import { ButtonGroup } from "../../../ui/button-group"

export default function ButtonGroupOrientationDemo() {
  return (
    <ButtonGroup orientation="vertical">
      <Button intent="secondary">
        <SpeakerWaveIcon />
      </Button>
      <Button intent="secondary">
        <SpeakerXMarkIcon />
      </Button>
    </ButtonGroup>
  )
}
