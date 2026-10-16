"use client"

import { ShowMore } from "../../../ui/show-more"

export default function ShowMoreAsTextDemo() {
  return (
    <div className="py-6">
      <ShowMore as="text" text="Or continue with" />
    </div>
  )
}
