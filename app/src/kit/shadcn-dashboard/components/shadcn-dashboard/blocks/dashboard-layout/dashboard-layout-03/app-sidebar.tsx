"use client";

import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Button } from "../../../../../../shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../../../../shadcn/ui/sheet";
import {
  NavMain,
  MobileNav,
  NavSection,
} from "./nav-main";
import {
  AlignStartVertical,
  PieChart,
  CircleUserRound,
  ClipboardList,
  Menu,
  Notebook,
  NotepadText,
  Table,
  Languages,
  Ticket,
  ShoppingCart,
  House,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Settings,
  HelpCircle,
  Tag,
  ShieldCheck,
  Plug,
  Key,
  Calendar,
  MessageCircle,
  Mail,
  NotebookText,
  Contact,
  TextCursorInput,
  MousePointer2,
  ListChecks,
  Disc,
  Calendar1,
  LaptopMinimalCheck,
  MapPinCheckInside,
  Globe,
} from "lucide-react";
import ProfileDropdown from "./dropdown-profile";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../../shadcn/ui/avatar";
import LanguageDropdown from "./dropdown-language";

export const navData: NavSection[] = [
  {
    label: "Dashboards",
    items: [
      { title: "Analytics", icon: PieChart, href: "#" },
      { title: "CRM Dashboard", icon: ClipboardList, href: "#" },
      { title: "eCommerce", icon: ShoppingCart, href: "#" },
      { title: "Modern", icon: House, href: "#" },
      { title: "SaaS + AI Dashboard", icon: Sparkles, href: "#" },
      { title: "School Management", icon: GraduationCap, href: "#" },
      { title: "Health Management", icon: HeartPulse, href: "#" },
    ],
  },
  {
    label: "Pages",
    items: [
      { title: "Account Setting", icon: Settings, href: "#" },
      { title: "FAQ", icon: HelpCircle, href: "#" },
      { title: "Pricing", icon: Tag, href: "#" },
      { title: "Roll Base Access", icon: ShieldCheck, href: "#" },
      { title: "Integrations", icon: Plug, href: "#" },
      { title: "API Keys", icon: Key, href: "#" },
    ],
  },
  {
    label: "Apps",
    items: [
      { title: "Notes", icon: Notebook, href: "#" },
      { title: "Tickets", icon: Ticket, href: "#" },
      { title: "Blogs", icon: Languages, href: "#" },
      { title: "Calendar", icon: Calendar, href: "#" },
      { title: "Chats", icon: MessageCircle, href: "#" },
      { title: "Email", icon: Mail, href: "#" },
      { title: "Notes", icon: NotebookText, href: "#" },
      { title: "Contacts", icon: Contact, href: "#" },
    ],
  },
  {
    label: "Form Elements",
    items: [
      { title: "Input", icon: TextCursorInput, href: "#" },
      { title: "Select", icon: MousePointer2, href: "#" },
      { title: "Checkbox", icon: ListChecks, href: "#" },
      { title: "Radio", icon: Disc, href: "#" },
      { title: "Datepicker", icon: Calendar1, href: "#" },
      { title: "Autocomplete", icon: LaptopMinimalCheck, href: "#" },
      { title: "Dropzone", icon: MapPinCheckInside, href: "#" },
    ],
  },
];

export function AppSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-10 px-4 max-w-[1440px] mx-auto">
      {/* ---------------- Logo ---------------- */}
      <a href="#" className="flex shrink-0 items-center">
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

      {/* ---------------- Desktop horizontal nav (left aligned) ---------------- */}
      <NavMain sections={navData} className="hidden md:flex" />

      <div className="ms-auto flex shrink-0 items-center gap-2">
        <LanguageDropdown
          trigger={
            <div
              id="language-dropdown-trigger"
              className="rounded-md hover:bg-accent/80 cursor-pointer p-2"
            >
              <Globe size={16} />
            </div>
          }
        />

        <ProfileDropdown
          trigger={
            <div
              id="profile-dropdown-trigger"
              className="rounded-full cursor-pointer"
            >
              <Avatar className="size-7 rounded-full">
                <AvatarImage src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp" />
                <AvatarFallback>NJ</AvatarFallback>
              </Avatar>
            </div>
          }
        />

        {/* ---------------- Mobile trigger ---------------- */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-4" />
        </Button>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="flex w-72 flex-col p-0">
            <SheetHeader className="border-b px-4 py-3">
              <SheetTitle className="text-start text-sm">Menu</SheetTitle>
            </SheetHeader>
            <SimpleBar className="flex-1 min-h-0 p-3">
              <MobileNav sections={navData} onNavigate={() => setMobileOpen(false)} />
            </SimpleBar>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
