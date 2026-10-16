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
import {
  NavItem,
  NavMain,
} from "./nav-main";
import {
  AlignStartVertical,
  PieChart,
  CircleUserRound,
  ClipboardList,
  Notebook,
  NotepadText,
  Table,
  Languages,
  Ticket,
  Rocket,
  LifeBuoy,
  BookOpen,
} from "lucide-react";

export const navData: NavItem[] = [
  // Dashboards Section
  { label: "لوحات التحكم", isSection: true },
  { title: "التحليلات", icon: PieChart, href: "#" },
  { title: "لوحة تحكم CRM", icon: ClipboardList, href: "#" },

  // Pages Section
  { label: "الصفحات", isSection: true },
  { title: "الجداول", icon: Table, href: "#" },
  { title: "النماذج", icon: ClipboardList, href: "#" },
  { title: "الملف الشخصي", icon: CircleUserRound, href: "#" },

  // Apps Section
  { label: "التطبيقات", isSection: true },
  { title: "الملاحظات", icon: Notebook, href: "#" },
  { title: "التذاكر", icon: Ticket, href: "#" },
  {
    title: "المدونات",
    icon: Languages,
    children: [
      { title: "منشور المدونة", href: "#" },
      { title: "تفاصيل المدونة", href: "#" },
      { title: "تعديل المدونة", href: "#" },
      { title: "إنشاء مدونة", href: "#" },
      { title: "إدارة المدونات", href: "#" },
    ],
  },

  // Form Elements Section
  { label: "عناصر النماذج", isSection: true },
  {
    title: "نماذج Shadcn",
    icon: NotepadText,
    children: [
      { title: "زر", href: "#" },
      { title: "حقل الإدخال", href: "#" },
      { title: "القائمة المنسدلة", href: "#" },
      { title: "خانة الاختيار", href: "#" },
      { title: "زر الاختيار", href: "#" },
    ],
  },
  {
    title: "تخطيطات النماذج",
    icon: AlignStartVertical,
    children: [
      { title: "نماذج أفقية", href: "#" },
      { title: "نماذج عمودية", href: "#" },
      { title: "التحقق من النماذج", href: "#" },
      { title: "أمثلة النماذج", href: "#" },
      { title: "معالج النماذج", href: "#" },
    ],
  },
];

const navItems = [
  {
    title: "مركز المساعدة",
    url: "/theme-pages/faq",
    icon: LifeBuoy,
  },
  {
    title: "التوثيق",
    url: "#",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar
      side="right"
      dir="rtl"
      className="px-0 h-full **:data-[slot=sidebar-inner]:h-full **:data-[slot=sidebar-inner]:bg-background"
    >
      <div className="flex flex-col gap-2">
        {/* ---------------- Header ---------------- */}
        <SidebarHeader className="px-4 py-4">
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
                          <span className="font-medium text-base leading-6 text-foreground">الخطة الأساسية</span>
                        </div>
                        <span className="font-medium text-base leading-6 text-foreground">70%</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                        <div className="h-full w-[70%] bg-foreground rounded-full" />
                      </div>
                    </div>
                    {/* Usage text */}
                    <p className="text-sm font-normal leading-5 text-muted-foreground text-center">
                      68/100 من الحد الشهري المستخدم
                    </p>
                  </div>
                  {/* Upgrade button */}
                  <Button className="w-full cursor-pointer h-9 bg-foreground text-background hover:bg-foreground/90 rounded-lg text-sm font-medium">
                    الترقية
                  </Button>
                </div>
              </div>
              <SidebarGroup className="mt-auto pt-4">
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
