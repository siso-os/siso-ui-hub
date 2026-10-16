"use client";

import { toast } from "@/components/ui/toast";
import { Button } from "../../../../shadcn/ui/button";

export default function ToastComponent() {
  const handleInvite = () => {
    toast.add({
      title: "Invitation sent",
      description: "alex@example.com has been invited to collaborate.",
      type: "success",
      timeout: 5000,
      actionProps: {
        children: "Resend",
        onClick: () =>
          toast.add({
            title: "Invitation resent",
            description: "A new invite link has been delivered.",
            type: "success",
          }),
      },
    });
  };

  return (
    <Button variant="outline" onClick={handleInvite} className="cursor-pointer">
      Invite Member
    </Button>
  );
}
