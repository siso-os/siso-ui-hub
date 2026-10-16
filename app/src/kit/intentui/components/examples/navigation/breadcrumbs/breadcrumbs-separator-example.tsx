"use client"

import { Breadcrumbs, BreadcrumbsItem } from "../../../ui/breadcrumbs"

export default function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs separator="slash">
      <BreadcrumbsItem href="#">Home</BreadcrumbsItem>
      <BreadcrumbsItem href="#">Design System</BreadcrumbsItem>
      <BreadcrumbsItem>Collections</BreadcrumbsItem>
    </Breadcrumbs>
  )
}
