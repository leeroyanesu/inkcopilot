import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import SitesContent from "./page"

export default function SitesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="ml-4 text-2xl font-semibold">Sites</h1>
        </header>
        <SitesContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
