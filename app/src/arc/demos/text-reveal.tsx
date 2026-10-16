// From Arc's docs page (Usage), imports pointed at the copied source
import { TextReveal } from "../text-reveal/text-reveal";

export function Hero() {
  return <TextReveal as="h1" text={"Ship interfaces\nthat feel precise"} delay={0.1} />;
}
