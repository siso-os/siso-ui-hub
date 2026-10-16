"use client";

import { useState } from "react";
import { SparklesIcon } from "lucide-react";

import { Badge } from "../../../../../shadcn/ui/badge";
import { Button } from "../../../../../shadcn/ui/button";
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockLineActions,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";

const broken = `export function averageRating(reviews: Review[]) {
  const scores = reviews.map((review) => review.rating);
  const total = scores.reduce((sum, score) => sum + score);
  return total / scores.length;
}`;

const patched = `export function averageRating(reviews: Review[]) {
  const scores = reviews.map((review) => review.rating);
  const total = scores.reduce((sum, score) => sum + score, 0);
  return scores.length ? total / scores.length : 0;
}`;

export default function CodeBlockDemo() {
  const [fixed, setFixed] = useState(false);

  return (
    <div className="w-full max-w-xl">
      <CodeBlock
        code={fixed ? patched : broken}
        language="typescript"
        showLineNumbers
        lineLevels={fixed ? undefined : { error: [3] }}
      >
        <CodeBlockHeader>
          <CodeBlockTitle>average-rating.ts</CodeBlockTitle>
          <div className="ml-auto flex items-center gap-1.5">
            {fixed ? (
              <>
                <Badge className="bg-success/10 text-success">
                  Patch applied
                </Badge>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setFixed(false)}
                >
                  Undo
                </Button>
              </>
            ) : (
              <Badge variant="destructive">Empty list crashes reduce</Badge>
            )}
          </div>
        </CodeBlockHeader>
        <CodeBlockLineActions>
          {({ state }) =>
            state?.level === "error" ? (
              <Button size="xs" onClick={() => setFixed(true)}>
                <SparklesIcon />
                Fix with AI
              </Button>
            ) : null
          }
        </CodeBlockLineActions>
      </CodeBlock>
    </div>
  );
}
