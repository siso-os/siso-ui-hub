// From Arc's docs page (Usage), imports pointed at the copied source
import { InViewTitle } from "../in-view-title/in-view-title";

export function FeaturesHeader() {
  return (
    <InViewTitle
      variant="line"
      text="Everything your team needs to ship"
      lines={["Everything your team", "needs to ship"]}
    />
  );
}
