"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../../../../shadcn/ui/sidebar";
import { ScrollArea } from "../../../../../../shadcn/ui/scroll-area";
import { Button } from "../../../../../../shadcn/ui/button";
import { Progress } from "../../../../../../shadcn/ui/progress";
import {
  NavItem,
  NavMain,
} from "./nav-main";
import {
  PieChart,
  CircleUserRound,
  ClipboardList,
  Notebook,
  NotepadText,
  Table,
  Ticket,
  Settings,
  Bell,
  BookOpen,
  Rocket,
  LifeBuoy,
} from "lucide-react";

export const navData: NavItem[] = [
  // Dashboards Section
  { label: "Dashboards", isSection: true },
  { title: "Analytics", icon: PieChart, href: "#" },
  { title: "CRM Dashboard", icon: ClipboardList, href: "#" },

  // Pages Section
  { label: "Pages", isSection: true },
  { title: "Tables", icon: Table, href: "#" },
  { title: "Forms", icon: NotepadText, href: "#" },
  { title: "User Profile", icon: CircleUserRound, href: "#" },

  // Apps Section
  { label: "Apps", isSection: true },
  { title: "Notes", icon: Notebook, href: "#" },
  { title: "Tickets", icon: Ticket, href: "#" },
  { title: "Documentation", icon: BookOpen, href: "#" },

  // Settings Section
  { label: "Settings", isSection: true },
  { title: "Notifications", icon: Bell, href: "#" },
  { title: "Preferences", icon: Settings, href: "#" },
];

const navItems = [
  {
    title: "Help Center",
    url: "/theme-pages/faq",
    icon: LifeBuoy,
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="px-0 h-full **:data-[slot=sidebar-inner]:h-full **:data-[slot=sidebar-inner]:bg-background">
      <div className="flex flex-col gap-4">
        {/* ---------------- Header ---------------- */}
        <SidebarHeader className="px-4 py-3">
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
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="px-4">
              <NavMain items={navData} />
            </div>
            {/* card */}
            <div className="pt-5 px-4">
              <div className="-mx-4 border-t border-b border-border px-5 py-5">
                <div className="flex flex-col gap-5">
                  {/* Plan info */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-4">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Rocket className="size-5 shrink-0" />
                          <span className="font-medium text-base leading-6 text-foreground">Basic Plan</span>
                        </div>
                        <span className="font-medium text-base leading-6 text-foreground">70%</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 rounded-full overflow-hidden">
                        <Progress value={70} className="h-full" />
                      </div>
                    </div>
                    {/* Usage text */}
                    <p className="text-sm font-normal leading-5 text-muted-foreground text-center">
                      68/100 monthly limit used
                    </p>
                  </div>
                  {/* Upgrade button */}
                  <Button className="w-full cursor-pointer h-9 text-sm font-medium">
                    Upgrade
                  </Button>
                </div>
              </div>
              <SidebarGroup className="mt-auto pt-4 pb-0 px-0">
                <SidebarGroupContent>
                  <SidebarMenu className=" ">
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton size="lg" className="h-full cursor-pointer">
                          <a href={item.url}>
                            <div className="flex items-center gap-3 w-full">
                              <item.icon className="shadow-none size-5 shrink-0" />
                              <div className="flex flex-col flex-1 text-left text-sm leading-tight hide-menu whitespace-nowrap">
                                <span className="truncate font-medium">{item.title}</span>
                              </div>
                            </div>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
