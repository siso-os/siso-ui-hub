// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { MoneyInput } from "../money-input/money-input";

export function TipAmount() {
  const [cents, setCents] = useState<number | null>(1500);
  return (
    <MoneyInput
      label="Amount"
      name="amount"
      value={cents}
      onValueChange={setCents}
      currencies={["USD"]}
      min={100}
      max={100_000}
      quickAdd={[5, 10, 20]}
    />
  );
}
