import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../../../shadcn/ui/avatar";
import { Button } from "../../../shadcn/ui/button";
import { Input } from "../../../shadcn/ui/input";
import { cn } from "@/arc-shims/kit-utils";

type IssueStatus = "Backlog" | "Planned" | "In Progress" | "Review" | "Done";

type IssuePriority = "low" | "medium" | "high" | null;

type ProjectIssue = {
  id: string;
  code: string;
  title: string;
  description?: string;
  status: IssueStatus;
  startDate?: string;
  targetDate?: string;
};

const INITIAL_PROJECT_ISSUES: ProjectIssue[] = [
  {
    id: "issue-001",
    code: "RFC-101",
    title: "Finalize issue timeline architecture",
    status: "In Progress",
    startDate: "2026-04-02",
    targetDate: "2026-04-10",
  },
  {
    id: "issue-002",
    code: "RFC-102",
    title: "Review gantt interaction states",
    status: "Planned",
    startDate: "2026-04-04",
    targetDate: "2026-04-06",
  },
  {
    id: "issue-003",
    code: "RFC-103",
    title: "Sync issue filters with project views",
    status: "Review",
    startDate: "2026-04-08",
    targetDate: "2026-04-16",
  },
  {
    id: "issue-004",
    code: "RFC-104",
    title: "Document drag and resize behavior",
    status: "Backlog",
  },
  {
    id: "issue-005",
    code: "RFC-105",
    title: "Create empty and loading timeline states",
    status: "Planned",
    startDate: "2026-04-14",
    targetDate: "2026-04-21",
  },
  {
    id: "issue-006",
    code: "RFC-106",
    title: "Add mock dependencies and handoff notes",
    status: "Done",
    startDate: "2026-04-03",
    targetDate: "2026-04-07",
  },
  {
    id: "issue-007",
    code: "RFC-107",
    title: "Polish the quarter view density",
    status: "Review",
    startDate: "2026-04-06",
    targetDate: "2026-04-08",
  },
  {
    id: "issue-008",
    code: "RFC-108",
    title: "Prepare issue calendar follow-up screen",
    status: "Backlog",
  },
];

function getDisplayStatusLabel(status: IssueStatus) {
  return status === "Planned" ? "Todo" : status;
}

const backlogMeta: Record<
  string,
  { priority: IssuePriority; assignee: string; avatar: string }
> = {
  "issue-001": {
    priority: "high",
    assignee: "Owen Lee",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar5.jpg",
  },
  "issue-002": {
    priority: "medium",
    assignee: "Ben Lewis",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar2.jpg",
  },
  "issue-003": {
    priority: "high",
    assignee: "Kabir Sethi",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar8.jpg",
  },
  "issue-004": {
    priority: null,
    assignee: "Maya Rao",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar4.jpg",
  },
  "issue-005": {
    priority: "medium",
    assignee: "Chloe Park",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar6.jpg",
  },
  "issue-006": {
    priority: "low",
    assignee: "Ava Reed",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar3.jpg",
  },
  "issue-007": {
    priority: "medium",
    assignee: "Riya Sharma",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar1.jpg",
  },
  "issue-008": {
    priority: null,
    assignee: "Victor Hale",
    avatar:
      "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar7.jpg",
  },
};

const statusOrder: IssueStatus[] = [
  "Backlog",
  "Planned",
  "In Progress",
  "Review",
  "Done",
];

function IssueList1Screen() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<IssueStatus | "all">("all");
  const issues = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return [...INITIAL_PROJECT_ISSUES]
      .filter((issue) => status === "all" || issue.status === status)
      .filter((issue) => {
        if (!normalized) return true;
        return [issue.code, issue.title, issue.status]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      })
      .sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
      );
  }, [query, status]);

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <header className="flex h-14 items-center gap-3 border-b px-4">
        <h1 className="truncate text-sm font-medium">
          Renewal Forecast Console
        </h1>
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          {issues.length}
        </span>
        <div className="relative ml-auto w-40 sm:w-56">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search backlog"
            className="h-8 pl-8"
          />
        </div>
      </header>
      <div className="flex gap-2 overflow-x-auto border-b px-4 py-2">
        {(["all", ...statusOrder] as const).map((option) => (
          <Button
            key={option}
            size="sm"
            variant={status === option ? "default" : "outline"}
            className="h-7"
            onClick={() => setStatus(option)}
          >
            {option === "all" ? "All" : getDisplayStatusLabel(option)}
          </Button>
        ))}
      </div>
      <ul className="min-h-0 flex-1 divide-y overflow-auto">
        {issues.map((issue) => {
          const meta = backlogMeta[issue.id];
          return (
            <li
              key={issue.id}
              className="grid grid-cols-[7rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 hover:bg-muted/40"
            >
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {issue.code}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {issue.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {getDisplayStatusLabel(issue.status)}
                  {meta?.priority ? ` · ${meta.priority}` : ""}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={meta.avatar} alt={meta.assignee} />
                  <AvatarFallback className="text-[10px]">
                    {meta.assignee
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {meta.assignee}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export function IssueList1({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-svh min-w-0 flex-col overflow-hidden bg-background",
        className,
      )}
    >
      <IssueList1Screen />
    </div>
  );
}
