import { SidebarProvider, SidebarTrigger } from "../../../../../../shadcn/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

const Page = () => {
  return (
    <SidebarProvider className="p-4 bg-muted" style={{ "--sidebar-width": "275px" } as React.CSSProperties}>
      <AppSidebar />
      {/* ---------------- Main ---------------- */}
      <div className="flex flex-1 flex-col gap-4">
        <header className="flex h-14 shrink-0 items-center gap-2 bg-background px-4">
          <SidebarTrigger className="cursor-pointer" />
        </header>
        <main className="flex-1 bg-background" />
      </div>
    </SidebarProvider>
  );
};

export default Page;

