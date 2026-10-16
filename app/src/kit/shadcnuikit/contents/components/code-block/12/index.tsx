"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "../../../../../shadcn/ui/avatar";
import { Card, CardContent } from "../../../../../shadcn/ui/card";
import {
  CodeBlock,
  CodeBlockCopyButton,
  markdownFences,
} from "../../../../components/ui/code-block";

const reply = `Add a ref to the input, then focus it after the dialog opens:

\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  if (open) inputRef.current?.focus()
}, [open])
\`\`\`

Pass the ref to your Input and you are done.`;

export default function CodeBlockDemo() {
  const [length, setLength] = useState(0);
  const streaming = length < reply.length;

  useEffect(() => {
    if (!streaming) return;
    const id = window.setTimeout(() => setLength((value) => value + 4), 30);
    return () => window.clearTimeout(id);
  }, [length, streaming]);

  return (
    <Card className="w-full max-w-xl" size="sm">
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          <p className="pt-1 text-sm">
            How do I focus an input when a dialog opens?
          </p>
        </div>
        <div className="flex gap-3">
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              AI
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
            {markdownFences(reply.slice(0, length)).map((part, index) =>
              part.type === "text" ? (
                <p key={index} className="text-sm whitespace-pre-wrap">
                  {part.content.trim()}
                </p>
              ) : (
                <CodeBlock
                  key={index}
                  code={part.content}
                  language={part.language}
                  streaming={streaming && part.open}
                >
                  <CodeBlockCopyButton />
                </CodeBlock>
              ),
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
