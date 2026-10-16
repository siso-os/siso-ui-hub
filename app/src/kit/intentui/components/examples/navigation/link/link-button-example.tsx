"use client"

import { buttonStyles } from "../../../ui/button"
import { Link } from "../../../ui/link"

export default function LinkButtonDemo() {
  return (
    <div className="flex gap-2">
      <Link className={buttonStyles()} href="#use-as-button">
        Link
      </Link>
      <Link className={buttonStyles({ intent: "outline" })} href="#use-as-button">
        Link
      </Link>
      <Link className={buttonStyles({ intent: "plain", isCircle: true })} href="#use-as-button">
        Link
      </Link>
    </div>
  )
}
