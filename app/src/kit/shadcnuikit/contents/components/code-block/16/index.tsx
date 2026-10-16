import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";
import { ansiToLines } from "../../../../components/ui/code-block-highlight";

const output = [
  "\x1b[1m> acme-dashboard@1.4.0 build\x1b[0m",
  "\x1b[90m> next build\x1b[0m",
  "",
  "\x1b[32m✓\x1b[0m Compiled successfully in 4.2s",
  "\x1b[32m✓\x1b[0m Linting and checking validity of types",
  "\x1b[33m⚠\x1b[0m Image on /pricing is missing a width",
  "\x1b[32m✓\x1b[0m Generating static pages (24/24)",
  "",
  "\x1b[36mRoute (app)\x1b[0m                 Size     First Load JS",
  "┌ ○ /                        5.2 kB          112 kB",
  "├ ○ /pricing                  3.8 kB          109 kB",
  "└ ƒ /api/checkout             0 B               0 B",
].join("\n");

const lines = ansiToLines(output);

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock lines={lines} label="Build output">
        <CodeBlockHeader>
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span className="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span className="bg-muted-foreground/30 size-2.5 rounded-full" />
          </span>
          <CodeBlockTitle className="ml-1">Terminal</CodeBlockTitle>
          <CodeBlockCopyButton className="ml-auto" />
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  );
}
