import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockExpandButton,
  CodeBlockHeader,
  CodeBlockLanguage,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";

const code = `{
  "name": "acme-dashboard",
  "version": "1.4.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "next": "16.0.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "lucide-react": "0.540.0",
    "tailwind-merge": "3.3.1"
  },
  "devDependencies": {
    "typescript": "5.9.2",
    "tailwindcss": "4.1.13"
  }
}`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock code={code} language="json" showLineNumbers maxLines={8}>
        <CodeBlockHeader>
          <CodeBlockTitle>package.json</CodeBlockTitle>
          <CodeBlockLanguage />
          <CodeBlockCopyButton className="ml-auto" />
        </CodeBlockHeader>
        <CodeBlockExpandButton />
      </CodeBlock>
    </div>
  );
}
