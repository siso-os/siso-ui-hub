"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { Task } from "./types";
import { cn } from "@/arc-shims/kit-utils";
import { Button } from "../../../../../shadcn/ui/button";
import { Card, CardContent } from "../../../../../shadcn/ui/card";

type Props = {
  task: Task;
  onDelete: () => void;
};

const TaskCard = ({ task, onDelete }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group bg-card flex items-start justify-between border-none ring-0 py-3 gap-2 shadow-sm w-full cursor-grab active:cursor-grabbing touch-none",
        isDragging && "opacity-40"
      )}
    >
      <CardContent className="w-full flex items-center justify-between">
        <p className="text-sm text-card-foreground wrap-break-word">{task.content}</p>
        <Button
          variant="link"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onDelete}
          size="icon-xs"
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 shrink-0 transition-opacity"
        >
          <Trash2 size={14} className="size-4!" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
