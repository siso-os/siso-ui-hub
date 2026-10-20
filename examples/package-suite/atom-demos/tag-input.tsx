// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { TagInput } from "@siso/atoms/source";

export function TopicsField() {
  const [topics, setTopics] = useState(["design", "motion"]);
  return (
    <TagInput
      label="Topics"
      value={topics}
      onValueChange={setTopics}
      description="Press Enter or comma to add."
    />
  );
}

// uihub: siso:package-workbench
