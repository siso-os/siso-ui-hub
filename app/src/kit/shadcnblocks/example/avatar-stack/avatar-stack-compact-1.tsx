import { Avatar, AvatarFallback, AvatarImage } from "../../../shadcn/ui/avatar";
import { AvatarStack } from "@/components/kibo-ui/avatar-stack";

export const title = "Compact stack";

const avatars = [
  { src: "https://github.com/shadcn.png", fallback: "SC" },
  { src: "https://github.com/haydenbleasel.png", fallback: "HB" },
  { src: "https://github.com/leerob.png", fallback: "LR" },
  { src: "https://github.com/vercel.png", fallback: "VC" },
  { src: "https://github.com/rauchg.png", fallback: "RG" },
];

const Example = () => (
  <div className="w-full max-w-md">
    <AvatarStack size={24}>
      {avatars.map((avatar) => (
        <Avatar key={avatar.fallback}>
          <AvatarImage alt={avatar.fallback} src={avatar.src} />
          <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarStack>
  </div>
);

export default Example;
