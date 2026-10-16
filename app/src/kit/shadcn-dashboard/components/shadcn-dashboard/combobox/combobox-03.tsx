"use client";

import { useState } from "react";

import { PlusIcon } from "lucide-react";

import { Button } from "../../../../shadcn/ui/button";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
} from "../../../../shadcn/ui/combobox";

const organizations = [
  {
    value: "vercel",
    label: "Vercel",
  },
  {
    value: "github",
    label: "GitHub",
  },
  {
    value: "openai",
    label: "OpenAI",
  },
  {
    value: "stripe",
    label: "Stripe",
  },
];

const ComboboxWithAddButtonDemo = () => {
  const defaultOrg = organizations.find((org) => org.value === "vercel") || null;
  const [selectedOrg, setSelectedOrg] = useState<typeof organizations[number] | null>(defaultOrg);
  const [inputValue, setInputValue] = useState(defaultOrg?.label ?? "");

  return (
    <div className="w-full max-w-xs">
      <Combobox
        items={organizations}
        value={selectedOrg}
        onValueChange={setSelectedOrg}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        itemToStringLabel={(org) => org?.label ?? ""}
      >
        <ComboboxInput placeholder="Find organization..." showTrigger showClear />
        <ComboboxContent className="bg-popover before:hidden">
          <ComboboxList>
            <ComboboxEmpty>No organization found.</ComboboxEmpty>
            <ComboboxCollection>
              {(org: typeof organizations[number]) => (
                <ComboboxItem key={org.value} value={org}>
                  <span className="truncate">{org.label}</span>
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxList>
          <ComboboxSeparator />
          <div className="p-1">
            <Button
              variant="ghost"
              className="w-full justify-start font-normal h-8 rounded-sm px-2 text-sm"
            >
              <PlusIcon className="-ms-1 size-4 opacity-60" aria-hidden="true" />
              New organization
            </Button>
          </div>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default ComboboxWithAddButtonDemo;
