// shadcn's Sidebar (base-nova, MIT) as it ships, to check it renders here.
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/registry/base-nova/ui/sidebar";
export default function Demo() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>App Factory</SidebarHeader>
        <SidebarContent>
          <SidebarGroup><SidebarGroupLabel>Build with</SidebarGroupLabel>
            <SidebarMenu>{["UI Hub", "Code", "Agents"].map((n) => <SidebarMenuItem key={n}><SidebarMenuButton>{n}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset><SidebarTrigger /></SidebarInset>
    </SidebarProvider>
  );
}
