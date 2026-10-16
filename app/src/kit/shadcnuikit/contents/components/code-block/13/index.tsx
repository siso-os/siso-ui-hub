import { Badge } from "../../../../../shadcn/ui/badge";
import {
  CodeBlock,
  CodeBlockDownloadButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../../../components/ui/code-block";
import { parseUnifiedDiff } from "../../../../components/ui/code-block-highlight";

const patch = `diff --git a/lib/cart.ts b/lib/cart.ts
--- a/lib/cart.ts
+++ b/lib/cart.ts
@@ -8,6 +8,7 @@ export function getCartTotal(items: CartItem[]) {
   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
-  const shipping = 500
+  const shipping = subtotal > 5000 ? 0 : 500
+  const discount = getDiscount(subtotal)
   return subtotal + shipping
 }
diff --git a/app/checkout/page.tsx b/app/checkout/page.tsx
--- a/app/checkout/page.tsx
+++ b/app/checkout/page.tsx
@@ -14,5 +14,5 @@ export default function CheckoutPage() {
   const total = getCartTotal(items)
-  return <Summary total={total} />
+  return <Summary total={total} freeShipping={total > 5000} />
 }`;

const files = parseUnifiedDiff(patch);

export default function CodeBlockDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {files.map((file) => (
        <CodeBlock
          key={file.file}
          lines={file.lines}
          showLineNumbers
          label={`Patch for ${file.file}`}
        >
          <CodeBlockHeader>
            <CodeBlockTitle>{file.file}</CodeBlockTitle>
            <div className="ml-auto flex items-center gap-1.5">
              <Badge className="bg-success/10 text-success">
                +{file.added}
              </Badge>
              <Badge variant="destructive">-{file.removed}</Badge>
              <CodeBlockDownloadButton
                filename={`${file.file.split("/").pop()}.patch`}
              />
            </div>
          </CodeBlockHeader>
        </CodeBlock>
      ))}
    </div>
  );
}
