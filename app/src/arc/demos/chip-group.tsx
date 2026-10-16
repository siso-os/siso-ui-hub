// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { ChipGroup } from "../chip-group/chip-group";

export function TopicFilter() {
  const [topics, setTopics] = useState<string[]>([]);
  return (
    <ChipGroup
      label="Topics"
      value={topics}
      onValueChange={setTopics}
      maxVisible={4}
      options={["Design", "Motion", "Code", "Research", "Writing"].map((t) => ({ value: t.toLowerCase(), label: t }))}
    />
  );
}
