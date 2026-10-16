"use client";

import {
  TreeExpander,
  TreeIcon,
  TreeLabel,
  TreeNode,
  TreeNodeContent,
  TreeNodeTrigger,
  TreeProvider,
  TreeView,
} from "@/components/kibo-ui/tree";

export const title = "Standard tree";

type TreeItem = {
  id: string;
  name: string;
  children?: TreeItem[];
};

const treeData: TreeItem[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "components",
        name: "components",
        children: [
          { id: "button.tsx", name: "button.tsx" },
          { id: "input.tsx", name: "input.tsx" },
        ],
      },
      {
        id: "lib",
        name: "lib",
        children: [{ id: "utils.ts", name: "utils.ts" }],
      },
    ],
  },
];

const renderNodes = (nodes: TreeItem[], level = 0) =>
  nodes.map((node, index) => {
    const hasChildren = Boolean(node.children?.length);
    const isLast = index === nodes.length - 1;

    return (
      <TreeNode key={node.id} isLast={isLast} level={level} nodeId={node.id}>
        <TreeNodeTrigger>
          <TreeExpander hasChildren={hasChildren} />
          <TreeIcon hasChildren={hasChildren} />
          <TreeLabel>{node.name}</TreeLabel>
        </TreeNodeTrigger>
        {hasChildren && node.children && (
          <TreeNodeContent hasChildren>
            {renderNodes(node.children, level + 1)}
          </TreeNodeContent>
        )}
      </TreeNode>
    );
  });

const Example = () => (
  <div className="w-full max-w-md rounded-md border">
    <TreeProvider>
      <TreeView>{renderNodes(treeData)}</TreeView>
    </TreeProvider>
  </div>
);

export default Example;
