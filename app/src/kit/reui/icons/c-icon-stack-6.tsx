import { IconStack } from "./icon-stack"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../shadcn/ui/item"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center p-4">
      <Item variant="outline" className="max-w-sm">
        <ItemMedia>
          <IconStack aria-hidden="true" className="text-primary h-12 w-11">
            <IconPlaceholder
              lucide="PackageIcon"
              tabler="IconPackage"
              hugeicons="Package01Icon"
              phosphor="PackageIcon"
              remixicon="RiBox3Line"
              className="text-primary size-3"
            />
          </IconStack>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Registry package ready</ItemTitle>
          <ItemDescription>
            Use IconStack as rich media inside compact shadcn items.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}