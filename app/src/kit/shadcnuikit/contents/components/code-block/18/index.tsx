import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";
import { cn } from "@/arc-shims/kit-utils";

const code = `export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggle = () => setTheme((value) => (value === "light" ? "dark" : "light"));
  return { theme, toggle };
}`;

const palette = [
  "[--code-token-keyword:var(--primary)]",
  "[--code-token-function:var(--info)]",
  "[--code-token-string:var(--success)]",
  "[--code-token-string-expression:var(--success)]",
  "[--code-token-constant:var(--warning)]",
  "[--code-token-parameter:var(--warning)]",
  "[--code-token-comment:var(--muted-foreground)]",
  "[--code-token-punctuation:var(--muted-foreground)]",
  "[--code-foreground:var(--foreground)]",
];

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      code={code}
      language="typescript"
      showLineNumbers
      themes={{ light: "css-variables", dark: "css-variables" }}
      className={cn("w-full max-w-xl", palette)}
    >
      <CodeBlockHeader>
        <CodeBlockTitle>use-theme.ts</CodeBlockTitle>
        <span className="text-muted-foreground ml-auto text-xs max-sm:hidden">
          Colors from theme tokens
        </span>
        <CodeBlockCopyButton />
      </CodeBlockHeader>
    </CodeBlock>
  );
}
