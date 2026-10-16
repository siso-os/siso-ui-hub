"use client"

import { useState } from "react"
import { Badge } from "./badge"

import { cn } from "@/arc-shims/kit-utils"
import { Button } from "../../shadcn/ui/button"
import { ButtonGroup } from "../../shadcn/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

const models = [
  {
    id: "gpt4o",
    label: "GPT-4o",
    badge: "Fast",
    badgeVariant: "success-light" as const,
    tooltip: "128k context, fastest response",
    icon: (
      <IconPlaceholder
        lucide="ZapIcon"
        tabler="IconBolt"
        hugeicons="LightningIcon"
        phosphor="LightningIcon"
        remixicon="RiFlashlightLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "claude",
    label: "Claude",
    badge: "Pro",
    badgeVariant: "info-light" as const,
    tooltip: "200k context, best for analysis",
    icon: (
      <IconPlaceholder
        lucide="BrainIcon"
        tabler="IconBrain"
        hugeicons="AiBrain01Icon"
        phosphor="BrainIcon"
        remixicon="RiBrainLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "gemini",
    label: "Gemini",
    badge: "Preview",
    badgeVariant: "warning-light" as const,
    tooltip: "1M context, experimental",
    icon: (
      <IconPlaceholder
        lucide="FlaskConicalIcon"
        tabler="IconFlask"
        hugeicons="ExperimentIcon"
        phosphor="FlaskIcon"
        remixicon="RiFlaskLine"
        aria-hidden="true"
      />
    ),
  },
]

export function Pattern() {
  const [active, setActive] = useState("claude")

  return (
    <ButtonGroup>
      {models.map((model) => (
        <Tooltip key={model.id}>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                className={cn(active === model.id ? "bg-muted" : "")}
                onClick={() => setActive(model.id)}
              >
                {model.icon}
                {model.label}
                <Badge variant={model.badgeVariant} size="xs">
                  {model.badge}
                </Badge>
              </Button>
            }
          />
          <TooltipContent>{model.tooltip}</TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
  )
}