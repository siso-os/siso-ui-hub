import { SidebarProvider, SidebarTrigger } from "../../../../../../shadcn/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../../shadcn/ui/avatar";
import LanguageDropdown from "./dropdown-language";
import { Globe } from "lucide-react";
import Search from "./search";
import ProfileDropdown from "./dropdown-profile";

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* ---------------- Main ---------------- */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b px-4 bg-background">
          <SidebarTrigger className="cursor-pointer" />
          <div className="flex items-center gap-6">
            <Search />
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </header>
        <main className="flex-1 p-4" />
      </div>
    </SidebarProvider>
  );
};

export default Page;

