import { Button } from "@/components/ui/button"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Home, BarChart2, FileText, Users, Briefcase, Globe2 } from "lucide-react"
import { useLocation } from "react-router-dom"
export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="w-[240px]">
      <SidebarHeader className="px-4 py-4">
        <Button variant="ghost" size="sm" className="w-full justify-start p-1">
          <img
            src="/logo.svg"
            alt="InkCopilot"
            className="h-12 w-auto"
          />
        </Button>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/dashboard'}
              className="w-full px-3 py-2 text-base data-[active=true]:bg-primary/20 data-[active=true]:text-primary hover:bg-primary/10 rounded-md"
            >
              <a href="/dashboard" className="flex items-center w-full">
                <Home className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/dashboard/sites'}
              className="w-full px-3 py-2 text-base data-[active=true]:bg-primary/20 data-[active=true]:text-primary hover:bg-primary/10 rounded-md"
            >
              <a href="/dashboard/sites" className="flex items-center w-full">
                <Globe2 className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">Sites</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/dashboard/jobs'}
              className="w-full px-3 py-2 text-base data-[active=true]:bg-primary/20 data-[active=true]:text-primary hover:bg-primary/10 rounded-md"
            >
              <a href="/dashboard/jobs" className="flex items-center w-full">
                <Briefcase className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">Jobs</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/dashboard/posts'}
              className="w-full px-3 py-2 text-base data-[active=true]:bg-primary/20 data-[active=true]:text-primary hover:bg-primary/10 rounded-md"
            >
              <a href="/dashboard/posts" className="flex items-center w-full">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">Posts</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
