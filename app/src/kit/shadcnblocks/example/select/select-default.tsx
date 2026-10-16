import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shadcn/ui/select";

export const title = "Default";

const Example = () => (
  <div className="w-full max-w-md">
    <Select defaultValue="medium">
      <SelectTrigger className="bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" position="popper">
        <SelectItem value="low">Low</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="high">High</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default Example;
