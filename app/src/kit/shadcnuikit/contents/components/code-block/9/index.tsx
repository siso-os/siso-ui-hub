import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
} from "../../../../components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../shadcn/ui/tabs";

const managers = [
  { name: "pnpm", command: "pnpm dlx shadcn@latest add code-block" },
  { name: "npm", command: "npx shadcn@latest add code-block" },
  { name: "yarn", command: "yarn dlx shadcn@latest add code-block" },
  { name: "bun", command: "bunx --bun shadcn@latest add code-block" },
];

export default function CodeBlockDemo() {
  return (
    <Tabs defaultValue="pnpm" className="w-full max-w-xl">
      {managers.map((manager) => (
        <TabsContent key={manager.name} value={manager.name}>
          <CodeBlock code={manager.command} language="bash">
            <CodeBlockHeader>
              <TabsList className="h-7 bg-transparent p-0">
                {managers.map((item) => (
                  <TabsTrigger
                    key={item.name}
                    value={item.name}
                    className="h-6 px-2 text-xs"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <CodeBlockCopyButton className="ml-auto" />
            </CodeBlockHeader>
          </CodeBlock>
        </TabsContent>
      ))}
    </Tabs>
  );
}
