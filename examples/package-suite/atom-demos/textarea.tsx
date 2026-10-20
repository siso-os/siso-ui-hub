// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Textarea } from "@siso/atoms/source";

export function BioField() {
  const [bio, setBio] = useState("");
  return (
    <Textarea
      label="Bio"
      rows={4}
      value={bio}
      onChange={(event) => setBio(event.target.value)}
      description={`${280 - bio.length} characters left`}
    />
  );
}

// uihub: siso:package-workbench
