import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";

const code = `export async function getUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
  if (!response.ok) {
    throw new Error("Failed to load user");
  }
  return (await response.json()) as User;
}`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock
        code={code}
        language="typescript"
        showLineNumbers
        diff={{ removed: [3], added: [4, 5, 6, 7] }}
      >
        <CodeBlockHeader>
          <CodeBlockTitle>lib/users.ts</CodeBlockTitle>
          <CodeBlockCopyButton className="ml-auto" />
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  );
}
