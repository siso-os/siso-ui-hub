import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/kibo-ui/status";

export const title = "Degraded status";

const Example = () => (
  <Status status="degraded">
    <StatusIndicator />
    <StatusLabel />
  </Status>
);

export default Example;
