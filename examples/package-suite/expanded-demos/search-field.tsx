// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { SearchField } from "@siso/atoms/source";

export function MemberFilter() {
  const [query, setQuery] = useState("");
  return (
    <SearchField
      label="Search members"
      placeholder="Name or email"
      value={query}
      onValueChange={setQuery}
    />
  );
}

// uihub: siso:package-workbench
