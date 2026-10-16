import { Progress } from "../../../../../shadcn/ui/progress";

export default function ProgressComponent() {
  return <Progress value={75} className="bg-yellow-500/20 [&>div]:bg-yellow-500 w-full max-w-sm" />;
}
