"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shadcn/ui/dropdown-menu"
import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../shadcn/ui/input-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  const [country, setCountry] = useState("+1")

  return (
    <Field className="w-full max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="ghost" />}>
              <span className="tabular-nums">{country}</span>
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-24">
              <DropdownMenuItem onClick={() => setCountry("+1")}>
                +1 (US)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("+44")}>
                +44 (UK)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("+61")}>
                +61 (AU)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
        <InputGroupInput type="tel" placeholder="123 456 7890" />
      </InputGroup>
    </Field>
  )
}