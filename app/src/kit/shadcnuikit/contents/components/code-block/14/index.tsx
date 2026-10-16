"use client";

import { useState } from "react";

import { Button } from "../../../../../shadcn/ui/button";
import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";
import { Separator } from "../../../../../shadcn/ui/separator";

const code = `export async function sendWeeklyDigest(teamId: string) {
  const team = await db.team.findUnique({ where: { id: teamId } });

  if (!team) {
    throw new TeamNotFoundError(teamId);
  }

  const members = await db.member.findMany({ where: { teamId } });

  for (const member of members) {
    if (member.digestEnabled) {
      await mail.send({
        to: member.email,
        template: "weekly-digest",
      });
    }
  }

  return { sent: members.length };
}`;

const REGION_STARTS = [1, 4, 10, 11, 12];

export default function CodeBlockDemo() {
  const [folded, setFolded] = useState<number[]>([11]);

  return (
    <CodeBlock
      code={code}
      language="typescript"
      showLineNumbers
      className="w-full max-w-xl"
      foldable
      folded={folded}
      onFoldedChange={setFolded}
    >
      <CodeBlockHeader>
        <CodeBlockTitle>send-weekly-digest.ts</CodeBlockTitle>
        <div className="ml-auto flex items-center gap-1">
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setFolded(REGION_STARTS)}
          >
            Fold all
          </Button>
          <Button
            size="xs"
            variant="ghost"
            disabled={!folded.length}
            onClick={() => setFolded([])}
          >
            Unfold all
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <CodeBlockCopyButton />
        </div>
      </CodeBlockHeader>
    </CodeBlock>
  );
}
