import {
  ButtonGroup,
  ButtonGroupLabel,
} from "../ui/button-group"
import { Input } from "../ui/input"

export default function ButtonGroupLabelDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupLabel htmlFor="top-button">Label</ButtonGroupLabel>
      <Input id="top-button" placeholder="Type something here..." />
    </ButtonGroup>
  )
}
