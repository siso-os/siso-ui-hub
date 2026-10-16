"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/arc-shims/kit-utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../../../../shadcn/ui/sidebar";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: string;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const [activeItem, setActiveItem] = React.useState<string | null>(
    items.find((i) => !i.isSection)?.title || null
  );

  return (
    <>
      {items.map((item, index) => (
        <NavMainItem
          key={item.title || item.label || index}
          item={item}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      ))}
    </>
  );
}

function NavMainItem({
  item,
  activeItem,
  setActiveItem,
}: {
  item: NavItem;
  activeItem: string | null;
  setActiveItem: (val: string) => void;
}) {
  const isActive = activeItem === item.title;

  // Section label
  if (item.isSection && item.label) {
    return (
      <SidebarGroup className="p-0 pt-5 first:pt-0">
        <SidebarGroupLabel className="p-0 text-xs font-medium uppercase text-sidebar-foreground">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (item.title) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              id={`nav-main-button-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              tooltip={item.title}
              isActive={isActive}
              onClick={() => setActiveItem(item.title!)}
              className={cn(
                "text-sm font-medium px-3 py-2 h-9 transition-colors cursor-pointer hover:bg-primary/5",
                isActive ? "bg-primary! text-primary-foreground!" : ""
              )}
              render={<a href={item.href} />}
            >
              {item.icon && <item.icon />}
              <span className="truncate group-data-[collapsible=icon]:hidden">
                {item.title}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return null;
}
