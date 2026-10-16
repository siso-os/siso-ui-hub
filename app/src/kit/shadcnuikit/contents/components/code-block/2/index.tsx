"use client";

import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "../../../../components/ui/code-block";
import { ScrollArea, ScrollBar } from "../../../../../shadcn/ui/scroll-area";

const code = `export async function getProjectWithOwnerAndRecentActivity(projectId: string) {
  const project = await db.project.findUnique({ where: { id: projectId }, include: { owner: true } });
  if (!project) throw new NotFoundError(\`Project \${projectId} was not found\`);
  return project;
}

export function isProjectArchived(project: Project) {
  return project.archivedAt !== null;
}

export function getProjectUrl(project: Project) {
  return \`/projects/\${project.slug}\`;
}

export function sortProjectsByActivity(projects: Project[]) {
  return [...projects].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}`;

export default function CodeBlockDemo() {
  return (
    <CodeBlock code={code} language="typescript" className="w-full max-w-xl">
      <CodeBlockCopyButton
        variant="outline"
        size="icon-sm"
        className="bg-card hover:bg-muted"
      />
      <ScrollArea className="rounded-[inherit] **:data-[slot=scroll-area-viewport]:max-h-56">
        <CodeBlockContent />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CodeBlock>
  );
}
