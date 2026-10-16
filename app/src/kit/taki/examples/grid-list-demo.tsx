import { GridList, GridListItem } from "../ui/grid-list"

export default function GridListDemo() {
  return (
    <GridList aria-label="Favorite pokemon" className="w-64">
      <GridListItem>Charizard</GridListItem>
      <GridListItem>Blastoise</GridListItem>
      <GridListItem>Venusaur</GridListItem>
      <GridListItem>Pikachu</GridListItem>
    </GridList>
  )
}
