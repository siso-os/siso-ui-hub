"use client";

import { useState } from "react";

import {
  Snippet,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/kibo-ui/snippet";
import { Button } from "../../../shadcn/ui/button";

export const title = "Controlled tabs";

const Example = () => {
  const [tab, setTab] = useState("pnpm");

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={tab === "pnpm" ? "default" : "outline"}
          onClick={() => setTab("pnpm")}
        >
          pnpm
        </Button>
        <Button
          size="sm"
          variant={tab === "npm" ? "default" : "outline"}
          onClick={() => setTab("npm")}
        >
          npm
        </Button>
        <Button
          size="sm"
          variant={tab === "yarn" ? "default" : "outline"}
          onClick={() => setTab("yarn")}
        >
          yarn
        </Button>
      </div>
      <Snippet value={tab} onValueChange={setTab}>
        <SnippetHeader>
          <SnippetTabsList>
            <SnippetTabsTrigger value="pnpm">pnpm</SnippetTabsTrigger>
            <SnippetTabsTrigger value="npm">npm</SnippetTabsTrigger>
            <SnippetTabsTrigger value="yarn">yarn</SnippetTabsTrigger>
          </SnippetTabsList>
        </SnippetHeader>
        <SnippetTabsContent value="pnpm">pnpm add @acme/ui</SnippetTabsContent>
        <SnippetTabsContent value="npm">
          npm install @acme/ui
        </SnippetTabsContent>
        <SnippetTabsContent value="yarn">yarn add @acme/ui</SnippetTabsContent>
      </Snippet>
    </div>
  );
};

export default Example;
