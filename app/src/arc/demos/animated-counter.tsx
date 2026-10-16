// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { AnimatedCounter } from "../animated-counter/animated-counter";

export function Raised({ amount }: { amount: number }) {
  return <AnimatedCounter label="Raised" value={amount} prefix="$" animateOnView />;
}

export default function AnimatedCounterDemo() {
  return <Raised amount={128450} />;
}
