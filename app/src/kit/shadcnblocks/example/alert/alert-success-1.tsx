import { Alert, AlertTitle } from "../../../shadcn/ui/alert";

export const title = "Success with Title";

const Example = () => (
  <Alert className="w-full max-w-lg border-green-600/80 bg-green-600/5 text-green-600">
    <AlertTitle>Success</AlertTitle>
  </Alert>
);

export default Example;
