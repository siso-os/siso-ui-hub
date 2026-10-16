"use client"

import { TagGroup } from "../ui/tag-group"

export default function TagGroupEmptyDemo() {
  return (
    <TagGroup
      label="Tags"
      description="Select your tags"
      renderEmptyState={() => <div>No tags available</div>}
    ></TagGroup>
  )
}
