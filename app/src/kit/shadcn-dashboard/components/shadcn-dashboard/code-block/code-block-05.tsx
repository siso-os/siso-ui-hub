import { MultiFileCodeBlock } from "../../ui/code-block";
import type { FileEntry } from "../../ui/code-block";

const files: FileEntry[] = [
  {
    filename: "avatar.tsx",
    language: "tsx",
    code: `import { Avatar, AvatarFallback, AvatarImage } from "../../../../shadcn/ui/avatar"

export default function AvatarComponent() {
  return (
    <Avatar>
      <AvatarImage src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-1.webp" />
      <AvatarFallback className="text-xs">B</AvatarFallback>
    </Avatar>
  )
}`,
  },
  {
    filename: "button.tsx",
    language: "tsx",
    code: `import { Button } from "../../../../shadcn/ui/button"

export default function ButtonComponent() {
  return (
    <Button variant="outline" size="sm">
      Shadcn Dashboard
    </Button>
  )
}`,
  },
];

export default function CodeBlockMultiFile() {
  return (
    <div className="w-full max-w-lg">
      <MultiFileCodeBlock
        files={files}
        showLineNumbers
        scrollable
        maxHeight={260}
      />
    </div>
  );
}
