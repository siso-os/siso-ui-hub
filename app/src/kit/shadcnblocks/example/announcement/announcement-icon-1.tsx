import { Sparkles } from "lucide-react";

import {
  Announcement,
  AnnouncementTitle,
} from "@/components/kibo-ui/announcement";

export const title = "With icon";

const Example = () => (
  <div className="w-full max-w-md">
    <Announcement>
      <AnnouncementTitle>
        <Sparkles className="size-3.5 shrink-0" />
        AI-powered search is live
      </AnnouncementTitle>
    </Announcement>
  </div>
);

export default Example;
