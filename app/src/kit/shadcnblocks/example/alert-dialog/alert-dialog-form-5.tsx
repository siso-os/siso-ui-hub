import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../shadcn/ui/alert-dialog";
import { Button } from "../../../shadcn/ui/button";
import { Input } from "../../../shadcn/ui/input";
import { Label } from "../../../shadcn/ui/label";

export const title = "Form with Validation State";

const Example = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline">Transfer</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Transfer Project</AlertDialogTitle>
        <AlertDialogDescription>
          Type the project name to confirm the transfer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="confirm-name">
            Project Name: <span className="font-mono">my-project</span>
          </Label>
          <Input
            className="border-destructive focus-visible:ring-destructive"
            id="confirm-name"
            placeholder="Type project name"
          />
          <p className="text-xs text-destructive">
            Project name does not match
          </p>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="opacity-50" disabled>
          Transfer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default Example;
