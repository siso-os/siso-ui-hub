"use client";

import * as React from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/arc-shims/kit-utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../../../../shadcn/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../../../shadcn/ui/navigation-menu";

export type NavChild = {
  title: string;
  href: string;
};

export type NavItem = {
  title: string;
  icon?: LucideIcon;
  href?: string;
  children?: NavChild[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export function NavMain({
  sections,
  className,
}: {
  sections: NavSection[];
  className?: string;
}) {
  return (
    <NavigationMenu
      className={cn("max-w-none flex-none items-center justify-start", className)}
    >
      <NavigationMenuList className="gap-1">
        {sections.map((section) => (
          <NavigationMenuItem key={section.label}>
            <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground [&>svg]:ms-1 [&>svg]:size-4">
              {section.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-60 gap-0.5 p-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    {item.children?.length ? (
                      <div className="pt-3 first:pt-0">
                        <p className="px-2 pb-1 text-xs font-medium uppercase text-muted-foreground">
                          {item.title}
                        </p>
                        <ul className="grid gap-0.5">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink
                                render={<a href={child.href} />}
                                className="flex items-center px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                              >
                                {child.title}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <NavigationMenuLink
                        render={<a href={item.href ?? "#"} />}
                        className="flex items-center gap-2 px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.icon && <item.icon className="size-4" />}
                        {item.title}
                      </NavigationMenuLink>
                    )}
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function MobileNav({
  sections,
  onNavigate,
}: {
  sections: NavSection[];
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-0.5">
          <p className="px-1 pt-4 pb-1 text-xs font-medium uppercase text-muted-foreground first:pt-0">
            {section.label}
          </p>
          {section.items.map((item) => (
            <MobileNavItem key={item.title} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ))}
    </div>
  );
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const hasChildren = !!item.children?.length;
  const [isOpen, setIsOpen] = React.useState(false);

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          {item.icon && <item.icon className="size-4" />}
          <span className="flex-1 text-start">{item.title}</span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-0.5 py-1 ps-9">
          {item.children!.map((child) => (
            <a
              key={child.title}
              href={child.href}
              onClick={onNavigate}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.title}
            </a>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href ?? "#"}
      onClick={onNavigate}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {item.icon && <item.icon className="size-4" />}
      {item.title}
    </a>
  );
}
