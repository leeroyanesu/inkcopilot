import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import NotificationContent from "./page"

export default function NotificationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="ml-4 text-2xl font-semibold">Notifications</h1>
        </header>
        <NotificationContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
