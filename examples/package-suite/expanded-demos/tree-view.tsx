// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { TreeView, type TreeNode } from "@siso/ui/blocks/source";

const files: TreeNode[] = [
  { id: "app", label: "app", children: [
    { id: "page", label: "page.tsx" },
    { id: "layout", label: "layout.tsx" },
  ] },
  { id: "readme", label: "README.md" },
];

export function Files() {
  return <TreeView nodes={files} defaultExpandedIds={["app"]} onSelect={node => open(node.id)} />;
}
