import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { JobsTable } from "@/components/jobs-table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CreateJobForm } from "./create-job-form"
import { StatsCards } from "@/components/stats-cards"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { useJobs } from "@/hooks/use-jobs"
import { Skeleton } from "@/components/ui/skeleton"
import { useSubscription } from "@/hooks/use-subscription"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { getSubscription } from "@/lib/api/profile"
import { useMutation } from "@tanstack/react-query"

export default function JobsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const { data, isLoading, error } = useJobs();
  const [subscriptionData, setSubscriptionData] = React.useState(null);

   const { mutate: fetchSubscription } = useMutation({
    mutationFn: getSubscription,
    onSuccess: (data) => {
      setSubscriptionData(data);
    },
  })
  React.useEffect(() => {
    fetchSubscription();
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Jobs</h1>
              <p className="text-sm text-muted-foreground">
                Manage your content generation jobs
              </p>
            </div>
            {(!subscriptionData?.subscription || subscriptionData.subscription.name === 'free') ? (
              <Button
                onClick={() => {
                  toast({
                    title: "Subscription Required",
                    description: "Please upgrade your plan to create content generation jobs.",
                    variant: "destructive",
                  });
                  navigate('/dashboard/billing');
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </Button>
            ) : (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Job
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[600px] overflow-y-auto">
                  <SheetHeader className="pb-6">
                    <SheetTitle>Create New Job</SheetTitle>
                    <SheetDescription>
                      Set up your content generation job. All fields marked with * are required.
                    </SheetDescription>
                  </SheetHeader>
                  <CreateJobForm onSuccess={() => setIsOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Stats Cards */}
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-5">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load job statistics
            </div>
          ) : (
            <StatsCards stats={data?.stats} />
          )}

          {/* Jobs Table */}
          <div className="rounded-xl border bg-card">
            <div className="p-6 pb-4">
              <h2 className="text-lg font-semibold">Recent Jobs</h2>
              <p className="text-sm text-muted-foreground">
                View and manage your content generation jobs
              </p>
            </div>
            <div className="px-6 pb-6">
              {isLoading ? (
                <Skeleton className="h-[400px] w-full" />
              ) : error ? (
                <div className="text-center text-red-500">
                  Failed to load jobs
                </div>
              ) : (
                <JobsTable 
                  data={data?.jobs || []}
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
