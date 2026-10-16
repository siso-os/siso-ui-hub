"use client";

import {
  Comparison,
  ComparisonHandle,
  ComparisonItem,
} from "@/components/kibo-ui/comparison";

export const title = "Drag before and after";

const Example = () => (
  <Comparison className="aspect-video w-[28rem] max-w-full overflow-hidden rounded-lg border">
    <ComparisonItem position="left">
      <img
        alt="Before"
        className="size-full object-cover"
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
      />
    </ComparisonItem>
    <ComparisonItem position="right">
      <img
        alt="After"
        className="size-full object-cover"
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
      />
    </ComparisonItem>
    <ComparisonHandle />
  </Comparison>
);

export default Example;
