import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";

export default function WithSocialProof() {
  return (
    <div className="bg-muted">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm">
              <span className="font-semibold">20+ people</span> joined in the
              last 24 hours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm">Join them</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
