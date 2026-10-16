"use client";

import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

import { Badge } from "../../../../../shadcn/ui/badge";
import { Button } from "../../../../../shadcn/ui/button";
import { Card } from "../../../../../shadcn/ui/card";
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockLineActions,
  CodeBlockTitle,
  useCodeBlockSelection,
} from "../../../../components/ui/code-block";

const FILE = "use-copy.ts";

const code = `export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };

  return { copied, copy };
}`;

function AddToChat({
  line,
  onAdd,
}: {
  line: number;
  onAdd: (lines: number[]) => void;
}) {
  const { selectedLines, clearSelection } = useCodeBlockSelection();
  const batch = selectedLines.length > 0 ? selectedLines : [line];

  return (
    <Button
      type="button"
      size="icon-xs"
      aria-label={
        batch.length > 1
          ? `Reference ${batch.length} selected lines`
          : `Reference line ${line}`
      }
      onClick={() => {
        onAdd(batch);
        clearSelection();
      }}
      className="size-5"
    >
      <PlusIcon />
    </Button>
  );
}

export default function CodeBlockDemo() {
  const [refs, setRefs] = useState<number[]>([]);

  const addLines = (lines: number[]) =>
    setRefs((current) =>
      [...new Set([...current, ...lines])].sort((a, b) => a - b),
    );

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <CodeBlock code={code} language="typescript" showLineNumbers selectable>
        <CodeBlockHeader>
          <CodeBlockTitle>{FILE}</CodeBlockTitle>
          <span className="text-muted-foreground ml-auto text-xs max-sm:hidden">
            Press + on a line to reference it
          </span>
        </CodeBlockHeader>
        <CodeBlockLineActions side="gutter">
          {({ line }) => <AddToChat line={line} onAdd={addLines} />}
        </CodeBlockLineActions>
      </CodeBlock>

      <Card size="sm" className="gap-3 px-4">
        <div className="flex min-h-6 flex-wrap items-center gap-1.5">
          {refs.length === 0 ? (
            <span className="text-muted-foreground text-sm">
              Ask about {FILE}...
            </span>
          ) : (
            refs.map((line) => (
              <Badge key={line} variant="outline" className="gap-1 font-mono">
                {FILE}:{line}
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove line ${line}`}
                  onClick={() =>
                    setRefs((current) =>
                      current.filter((value) => value !== line),
                    )
                  }
                  className="size-4 hover:bg-transparent"
                >
                  <XIcon />
                </Button>
              </Badge>
            ))
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">
            {refs.length
              ? `${refs.length} ${refs.length === 1 ? "line" : "lines"} in context`
              : "No context yet"}
          </span>
          <Button size="xs" className="ml-auto" disabled={!refs.length}>
            Ask AI
          </Button>
        </div>
      </Card>
    </div>
  );
}
