"use client";

import { CounterButton } from "../../components/shadcnblocks/counter-button";

export const title = "Counter with initial value";

const Example = () => <CounterButton initialCount={5} min={1} max={10} />;

export default Example;
