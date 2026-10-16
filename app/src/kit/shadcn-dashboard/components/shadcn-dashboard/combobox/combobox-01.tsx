"use client";

import { useState } from "react";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../../shadcn/ui/combobox";
import { InputGroupAddon } from "../../../../shadcn/ui/input-group";
import {
  DollarSignIcon,
  FactoryIcon,
  MonitorIcon,
  PaletteIcon,
  ZapIcon,
} from "lucide-react";

const techStack = [
  {
    value: "nextjs",
    label: "Next.js (Frontend Framework)",
    icon: MonitorIcon,
  },
  {
    value: "postgresql",
    label: "PostgreSQL (Database)",
    icon: FactoryIcon,
  },
  {
    value: "supabase",
    label: "Supabase (Backend as a Service)",
    icon: ZapIcon,
  },
  {
    value: "stripe",
    label: "Stripe (Payment Infrastructure)",
    icon: DollarSignIcon,
  },
  {
    value: "tailwind",
    label: "Tailwind CSS (Styling)",
    icon: PaletteIcon,
  },
  {
    value: "vercel",
    label: "Vercel (Deployment & Hosting)",
    icon: ZapIcon,
  },
  {
    value: "redis",
    label: "Redis (Caching & Rate Limiting)",
    icon: ZapIcon,
  },
  {
    value: "github",
    label: "GitHub (Version Control)",
    icon: MonitorIcon,
  },
  {
    value: "openai",
    label: "OpenAI (AI & LLM API)",
    icon: ZapIcon,
  },
  {
    value: "posthog",
    label: "PostHog (Product Analytics)",
    icon: MonitorIcon,
  },
];

const ComboboxWithIconDemo = () => {
  const [selectedItem, setSelectedItem] = useState<typeof techStack[number] | null>(null);
  const [inputValue, setInputValue] = useState("");

  const showIcon = selectedItem && inputValue === selectedItem.label;
  const SelectedIcon = selectedItem?.icon;

  return (
    <div className="w-full max-w-xs">
      <Combobox
        items={techStack}
        value={selectedItem}
        onValueChange={setSelectedItem}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        itemToStringLabel={(item) => item?.label ?? ""}
      >
        <ComboboxInput placeholder="Search tech stack..." showTrigger showClear>
          {showIcon && SelectedIcon && (
            <InputGroupAddon align="inline-start" className="ps-2.5 pe-0">
              <SelectedIcon className="text-muted-foreground size-4" />
            </InputGroupAddon>
          )}
        </ComboboxInput>
        <ComboboxContent className="bg-popover before:hidden">
          <ComboboxList>
            <ComboboxEmpty>No tool found.</ComboboxEmpty>
            <ComboboxCollection>
              {(item: typeof techStack[number]) => {
                const Icon = item.icon;
                return (
                  <ComboboxItem key={item.value} value={item}>
                    <Icon className="text-muted-foreground size-4" />
                    <span className="truncate">{item.label}</span>
                  </ComboboxItem>
                );
              }}
            </ComboboxCollection>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default ComboboxWithIconDemo;
