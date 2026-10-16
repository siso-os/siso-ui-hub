"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from "../../../../../../shadcn/ui/sidebar";
import { ScrollArea } from "../../../../../../shadcn/ui/scroll-area";
import { NavItem, NavMain } from "./nav-main";
import { SidebarFooterComp } from "@/components/shadcn-dashboard/blocks/sidebar/sidebar-06/sidebar-footer";
import { AlignStartVertical, PieChart, CircleUserRound, ClipboardList, Notebook, NotepadText, Table, Languages, Ticket } from "lucide-react";

export const navData: NavItem[] = [
  // Dashboards Section
  { label: "Dashboards", isSection: true },
  { title: "Analytics", icon: PieChart, href: "#" },
  { title: "CRM Dashboard", icon: ClipboardList, href: "#" },

  // Pages Section
  { label: "Pages", isSection: true },
  { title: "Tables", icon: Table, href: "#" },
  { title: "Forms", icon: ClipboardList, href: "#" },
  { title: "User Profile", icon: CircleUserRound, href: "#" },

  // Apps Section
  { label: "Apps", isSection: true },
  { title: "Notes", icon: Notebook, href: "#" },
  { title: "Tickets", icon: Ticket, href: "#" },
  {
    title: "Blogs",
    icon: Languages,
    children: [
      { title: "Blog Post", href: "#" },
      { title: "Blog Detail", href: "#" },
      { title: "Blog Edit", href: "#" },
      { title: "Blog Create", href: "#" },
      { title: "Manage Blogs", href: "#" },
    ],
  },

  // Form Elements Section
  { label: "Form Elements", isSection: true },
  {
    title: "Shadcn Forms",
    icon: NotepadText,
    children: [
      { title: "Button", href: "#" },
      { title: "Input", href: "#" },
      { title: "Select", href: "#" },
      { title: "Checkbox", href: "#" },
      { title: "Radio", href: "#" },
    ],
  },
  {
    title: "Form layouts",
    icon: AlignStartVertical,
    children: [
      { title: "Forms Horizontal", href: "#" },
      { title: "Forms Vertical", href: "#" },
      { title: "Forms Validation", href: "#" },
      { title: "Forms Examples", href: "#" },
      { title: "Forms Wizard", href: "#" },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" className="p-4 pr-0 h-full **:data-[slot=sidebar-inner]:shadow-none **:data-[slot=sidebar-inner]:border-none **:data-[slot=sidebar-inner]:h-full **:data-[slot=sidebar-inner]:bg-background">
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* ---------------- Header ---------------- */}
        <SidebarHeader className="p-4 pb-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <a href="#" className="w-full h-full">
                <img
                  src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/fulldark-logo.svg"
                  alt="fulldark-logo"
                  width={100}
                  height={32}
                  className="block dark:hidden"
                />
                <img
                  src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/fullwhite-logo.svg"
                  alt="fulldark-logo"
                  width={100}
                  height={32}
                  className="hidden dark:block"
                />
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* ---------------- Content ---------------- */}
        <SidebarContent className="overflow-hidden flex-1">
          <ScrollArea className="h-full">
            <div className="px-4">
              <NavMain items={navData} />
            </div>
          </ScrollArea>
        </SidebarContent>

        {/* ---------------- Footer ---------------- */}
        <SidebarFooter className="px-0">
          <SidebarFooterComp />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
