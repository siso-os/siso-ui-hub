// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { SearchField } from "../search-field/search-field";

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
