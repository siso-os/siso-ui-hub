import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";
import { cn } from "@/arc-shims/kit-utils";

const code = `export function Avatar({ user }: { user: User }) {
  const initials = user.name.split(" ").map((part) => part[0]);

  return (
    <div className="avatar">
      <img src={user.image} />
      <span>{initials}</span>
    </div>
  );
}`;

const legend = [
  { label: "Error", className: "bg-destructive" },
  { label: "Warning", className: "bg-warning" },
  { label: "Info", className: "bg-info" },
];

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock
        code={code}
        language="tsx"
        showLineNumbers
        lineLevels={{ error: [6], warning: [2], info: [7] }}
      >
        <CodeBlockHeader>
          <CodeBlockTitle>avatar.tsx</CodeBlockTitle>
          <div className="ml-auto flex items-center gap-3">
            {legend.map((item) => (
              <span
                key={item.label}
                className="text-muted-foreground flex items-center gap-1.5 text-xs"
              >
                <span className={cn("size-1.5 rounded-full", item.className)} />
                {item.label}
              </span>
            ))}
          </div>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  );
}
