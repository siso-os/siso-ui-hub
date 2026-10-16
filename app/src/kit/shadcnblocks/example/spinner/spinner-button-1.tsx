import { Button } from "../../../shadcn/ui/button";
import { Spinner } from "../../../shadcn/ui/spinner";

export const title = "Loading Button";

const Example = () => (
  <Button disabled>
    <Spinner />
    Loading...
  </Button>
);

export default Example;
