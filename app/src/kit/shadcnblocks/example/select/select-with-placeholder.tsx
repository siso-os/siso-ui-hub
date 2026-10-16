import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shadcn/ui/select";

export const title = "With Placeholder";

const Example = () => (
  <div className="w-full max-w-md">
    <Select>
      <SelectTrigger className="bg-background">
        <SelectValue placeholder="Choose language" />
      </SelectTrigger>
      <SelectContent align="start" position="popper">
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="fr">French</SelectItem>
        <SelectItem value="pt">Portuguese</SelectItem>
        <SelectItem value="ko">Korean</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default Example;
