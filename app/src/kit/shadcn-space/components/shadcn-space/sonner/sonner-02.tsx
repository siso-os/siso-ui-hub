"use client";

import { toast } from "../../ui/toast";
import { Button } from "../../../../shadcn/ui/button";

export default function ToastComponent() {
  const handleDelete = () => {
    toast.warning("Delete project?", {
      description: "This action will permanently remove the project and all its data.",
      action: {
        label: "Delete",
        dismiss: true,
        onClick: () =>
          toast.error("Project deleted", {
            description: "The project has been permanently removed."
          })
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Deletion cancelled.")
      },
      position: "top-center"
    });
  };

  return (
    <Button variant="outline" onClick={handleDelete} className="cursor-pointer">
      Delete Project
    </Button>
  );
}