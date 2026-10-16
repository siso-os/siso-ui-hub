"use client"

import { buttonStyles } from "../../../ui/button"
import { Link } from "../../../ui/link"

export default function ButtonLinkDemo() {
  return (
    <Link
      className={buttonStyles({ intent: "primary" })}
      href={"/docs/components/collections/choicebox"}
    >
      Choicebox
    </Link>
  )
}
