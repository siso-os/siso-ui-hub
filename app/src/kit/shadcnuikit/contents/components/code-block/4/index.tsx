import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";

const code = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock
        code={code}
        language="typescript"
        showLineNumbers
        focusedLines={[5, 6, 7]}
      >
        <CodeBlockHeader>
          <CodeBlockTitle>next.config.ts</CodeBlockTitle>
          <span className="text-muted-foreground ml-auto text-xs">
            Hover to see the full file
          </span>
          <CodeBlockCopyButton />
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  );
}
