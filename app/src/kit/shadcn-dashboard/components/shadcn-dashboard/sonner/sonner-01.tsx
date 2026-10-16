"use client";

import { toast } from "@/components/ui/toast";
import { Button } from "../../../../shadcn/ui/button";

export default function ToastComponent() {
  const handleFileUpload = () => {
    const toastId = toast.add({
      title: "Uploading file...",
      description: "Please wait while your file is being uploaded.",
      type: "loading",
      timeout: 0,
    });

    setTimeout(() => {
      toast.update(toastId, {
        title: "Upload complete",
        description: "resume.pdf has been uploaded successfully.",
        type: "success",
        actionProps: {
          children: "View File",
          onClick: () => toast.add({ title: "Opening file preview...", type: "info" }),
        },
      });
    }, 2000);
  };

  return (
    <Button variant="outline" onClick={handleFileUpload} className="cursor-pointer">
      Upload File
    </Button>
  );
}
