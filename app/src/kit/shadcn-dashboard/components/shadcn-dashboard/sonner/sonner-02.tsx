"use client";

import { toast } from "@/components/ui/toast";
import { Button } from "../../../../shadcn/ui/button";

export default function ToastComponent() {
  const handleDelete = () => {
    const id = toast.add({ type: "warning", title: "" });

    toast.update(id, {
      title: (
        <div className="flex flex-col gap-2.5">
          <div>
            <p className="text-sm font-medium">Delete project?</p>
            <p className="text-sm text-muted-foreground">
              This action will permanently remove the project and all its data.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                toast.close(id);
                toast.add({
                  title: "Project deleted",
                  description: "The project has been permanently removed.",
                  type: "error",
                });
              }}
            >
              Delete
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.close(id);
                toast.add({ title: "Deletion cancelled.", type: "info" });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    });
  };

  return (
    <Button variant="outline" onClick={handleDelete} className="cursor-pointer">
      Delete Project
    </Button>
  );
}
