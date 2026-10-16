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

const countries = [
  {
    value: "1",
    label: "United States",
    flag: "https://images.shadcnspace.com/assets/flags/flag-us.svg",
  },
  {
    value: "2",
    label: "India",
    flag: "https://images.shadcnspace.com/assets/flags/flag-india.svg",
  },
  {
    value: "3",
    label: "France",
    flag: "https://images.shadcnspace.com/assets/flags/flag-france.svg",
  },
  {
    value: "4",
    label: "China",
    flag: "https://images.shadcnspace.com/assets/flags/flag-china.svg",
  },
  {
    value: "5",
    label: "Australia",
    flag: "https://images.shadcnspace.com/assets/flags/flag-australia.svg",
  },
  {
    value: "6",
    label: "Brazil",
    flag: "https://images.shadcnspace.com/assets/flags/flag-brazil.svg",
  },
];

const ComboboxCountryFlagDemo = () => {
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[number] | null>(null);
  const [inputValue, setInputValue] = useState("");

  const showFlag = selectedCountry && inputValue === selectedCountry.label;

  return (
    <div className="w-full max-w-xs">
      <Combobox
        items={countries}
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        itemToStringLabel={(country) => country?.label ?? ""}
      >
        <ComboboxInput placeholder="Select country..." showTrigger showClear>
          {showFlag && (
            <InputGroupAddon align="inline-start" className="ps-2.5 pe-0">
              <img
                src={selectedCountry.flag}
                alt={`${selectedCountry.label} flag`}
                className="h-4 w-4 rounded-full"
              />
            </InputGroupAddon>
          )}
        </ComboboxInput>
        <ComboboxContent className="bg-popover before:hidden">
          <ComboboxList>
            <ComboboxEmpty>No country found.</ComboboxEmpty>
            <ComboboxCollection>
              {(country: typeof countries[number]) => (
                <ComboboxItem key={country.value} value={country}>
                  <img
                    src={country.flag}
                    alt={`${country.label} flag`}
                    className="h-4 w-4 rounded-full"
                  />
                  {country.label}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default ComboboxCountryFlagDemo;
