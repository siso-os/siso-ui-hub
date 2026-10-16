"use client";

import { Price, PriceValue } from "../../components/shadcnblocks/price";

const PriceExample = () => {
  return (
    <Price>
      <PriceValue price={100} currency="USD" />
    </Price>
  );
};

export default PriceExample;
