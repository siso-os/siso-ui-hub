// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { MentionInput, serializeMentions, type MentionValue } from "@siso/ui/blocks/source";

const people = [
  { id: "u1", name: "Maya Chen", role: "Design lead" },
  { id: "u2", name: "Theo Park", role: "Engineer" },
];
const channels = [{ id: "c1", name: "launch", description: "Release planning", members: 14 }];

export function CommentBox({ onPost }: { onPost: (body: string) => void }) {
  const [value, setValue] = useState<MentionValue>({ text: "", mentions: [] });
  return (
    <MentionInput
      aria-label="Comment"
      placeholder="Write a comment, @ to mention"
      people={people}
      channels={channels}
      value={value}
      onChange={setValue}
      submitOnEnter
      onSubmit={next => {
        onPost(serializeMentions(next));
        setValue({ text: "", mentions: [] });
      }}
    />
  );
}

export default function MentionInputDemo() {
  const [posted, setPosted] = useState<string[]>([]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <CommentBox
        onPost={body => {
          console.info(`mention-input: posted ${body}`);
          setPosted(previous => [...previous, body]);
        }}
      />
      {posted.map((body, index) => (
        <p key={index} style={{ margin: 0 }}>{body}</p>
      ))}
    </div>
  );
}
