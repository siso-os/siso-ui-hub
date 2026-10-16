import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLanguage,
} from "../../../../components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../shadcn/ui/tabs";

const files = [
  {
    name: "slugify.ts",
    language: "typescript",
    code: `export function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}`,
  },
  {
    name: "slugify.py",
    language: "python",
    code: `import re

def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower().strip())`,
  },
  {
    name: "slugify.go",
    language: "go",
    code: `func Slugify(text string) string {
	re := regexp.MustCompile("[^a-z0-9]+")
	return re.ReplaceAllString(strings.ToLower(text), "-")
}`,
  },
];

export default function CodeBlockDemo() {
  return (
    <Tabs defaultValue={files[0].name} className="w-full max-w-xl">
      {files.map((file) => (
        <TabsContent key={file.name} value={file.name}>
          <CodeBlock code={file.code} language={file.language} showLineNumbers>
            <CodeBlockHeader>
              <TabsList className="h-7 bg-transparent p-0">
                {files.map((item) => (
                  <TabsTrigger
                    key={item.name}
                    value={item.name}
                    className="h-6 px-2 text-xs"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="ml-auto flex items-center gap-1">
                <CodeBlockLanguage className="max-sm:hidden" />
                <CodeBlockCopyButton />
              </div>
            </CodeBlockHeader>
          </CodeBlock>
        </TabsContent>
      ))}
    </Tabs>
  );
}
