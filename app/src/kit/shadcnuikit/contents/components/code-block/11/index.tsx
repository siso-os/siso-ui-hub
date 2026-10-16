"use client";

import { useEffect, useState } from "react";

import { Badge } from "../../../../../shadcn/ui/badge";
import { Button } from "../../../../../shadcn/ui/button";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";
import { ScrollArea, ScrollBar } from "../../../../../shadcn/ui/scroll-area";

const target = `export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: "claude-sonnet",
    system: "You write short product descriptions.",
    prompt,
    maxOutputTokens: 512,
  });

  return result.toTextStreamResponse();
}`;

export default function CodeBlockDemo() {
  const [length, setLength] = useState(0);
  const done = length >= target.length;

  useEffect(() => {
    if (done) return;
    const id = window.setTimeout(() => setLength((value) => value + 3), 24);
    return () => window.clearTimeout(id);
  }, [length, done]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <CodeBlock
        code={target.slice(0, length)}
        language="typescript"
        showLineNumbers
        streaming={!done}
      >
        <CodeBlockHeader>
          <CodeBlockTitle>app/api/describe/route.ts</CodeBlockTitle>
          <div className="ml-auto flex items-center gap-1.5">
            <Badge variant={done ? "secondary" : "outline"}>
              {done ? "Complete" : "Generating"}
            </Badge>
            <CodeBlockCopyButton />
          </div>
        </CodeBlockHeader>
        <ScrollArea className="rounded-[inherit] **:data-[slot=scroll-area-viewport]:max-h-60">
          <CodeBlockContent />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CodeBlock>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => setLength(0)}
      >
        Replay stream
      </Button>
    </div>
  );
}
