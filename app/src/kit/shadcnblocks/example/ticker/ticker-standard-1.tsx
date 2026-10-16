"use client";

import { Ticker, TickerPrice, TickerSymbol } from "@/components/kibo-ui/ticker";

export const title = "Symbol and price";

const Example = () => (
  <Ticker aria-label="AAPL stock quote">
    <TickerSymbol symbol="AAPL" />
    <TickerPrice price={198.42} />
  </Ticker>
);

export default Example;
