import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import BillingContent from "./page"

export default function BillingPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="ml-4 text-2xl font-semibold">Billing</h1>
        </header>
        <BillingContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
