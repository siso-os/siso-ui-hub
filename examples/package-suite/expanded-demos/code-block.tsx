// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { CodeBlock } from "@siso/ui/blocks/source";

const snippet = `export function hello() {
  return "world";
}`;

export function Example() {
  return <CodeBlock code={snippet} filename="hello.ts" language="ts" maxLines={12} />;
}
