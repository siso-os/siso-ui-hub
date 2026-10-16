import { InfoIcon } from "lucide-react"

import { Button } from "../ui/button"
import { GridList, GridListItem } from "../ui/grid-list"

export default function GridListActions() {
  return (
    <GridList aria-label="Favorite pokemon" className="w-64">
      <GridListItem textValue="Charizard">
        Charizard
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Info"
          className="ml-auto"
        >
          <InfoIcon />
        </Button>
      </GridListItem>
      <GridListItem textValue="Blastoise">
        Blastoise
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Info"
          className="ml-auto"
        >
          <InfoIcon />
        </Button>
      </GridListItem>
      <GridListItem textValue="Venusaur">
        Venusaur
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Info"
          className="ml-auto"
        >
          <InfoIcon />
        </Button>
      </GridListItem>
      <GridListItem textValue="Pikachu">
        Pikachu
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Info"
          className="ml-auto"
        >
          <InfoIcon />
        </Button>
      </GridListItem>
    </GridList>
  )
}
