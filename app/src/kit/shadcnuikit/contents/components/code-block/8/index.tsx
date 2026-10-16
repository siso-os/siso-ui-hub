import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrapToggle,
} from "../../../../components/ui/code-block";

const code = `<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
  <LoginForm className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm" />
</div>`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock code={code} language="tsx" showLineNumbers defaultWrap>
        <CodeBlockHeader>
          <CodeBlockTitle>login-page.tsx</CodeBlockTitle>
          <div className="ml-auto flex items-center gap-1">
            <CodeBlockWrapToggle />
            <CodeBlockCopyButton />
          </div>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  );
}
