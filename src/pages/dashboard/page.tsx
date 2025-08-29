import { AppSidebar } from "@/components/app-sidebar"
import { JobsTable, type Job } from "@/components/jobs-table"
import { Overview } from "@/components/overview-chart"
import { StatsCard } from "@/components/stats-card"
import { SubscriptionPrompt } from "@/components/subscription-prompt"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarChart, FileText, Globe, Plus, Timer, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "@/lib/api/dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { subHours, subMinutes } from "date-fns"
import { useState, useEffect } from "react"


export default function DashboardPage() {
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats
  });

  useEffect(() => {
    // Check if the user is on the free plan when stats load
    if (stats && stats.subscription?.plan === "Free") {
      setShowSubscriptionPrompt(true);
    }
  }, [stats]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Top Stats Row */}
          <div className="grid gap-4 md:grid-cols-4">
            {isLoading ? (
              <>
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </>
            ) : error ? (
              <div className="col-span-4 text-center text-red-500">
                Failed to load dashboard stats
              </div>
            ) : (
              <>
                <StatsCard
                  title="Total Posts"
                  value={stats.totalPosts.toLocaleString()}
                  description="Created this month"
                  icon={<FileText className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                  title="Active Jobs"
                  value={stats.activeJobs.toString()}
                  description="Currently running"
                  icon={<Zap className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                  title="Average Time"
                  value={stats.averageTime}
                  description="Per content piece"
                  icon={<Timer className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                  title="SEO Score"
                  value={stats.averageSeoScore.toString()}
                  description="Average across all posts"
                  icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
                />
              </>
            )}
          </div>
          
          {/* SEO Metrics and Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            {isLoading ? (
              <>
                <Skeleton className="h-64" />
                <Skeleton className="h-64 md:col-span-2" />
              </>
            ) : error ? (
              <div className="col-span-3 text-center text-red-500">
                Failed to load SEO metrics
              </div>
            ) : (
              <>
                <div className="rounded-xl border p-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold">SEO Performance</h4>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Keyword Optimization</span>
                        <span className="font-medium">{stats.seoPerformance.keywordOptimization}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div 
                          className="h-2 rounded-full bg-primary" 
                          style={{ width: `${stats.seoPerformance.keywordOptimization}%` }} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Content Quality</span>
                        <span className="font-medium">{stats.seoPerformance.contentQuality}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div 
                          className="h-2 rounded-full bg-primary" 
                          style={{ width: `${stats.seoPerformance.contentQuality}%` }} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Readability</span>
                        <span className="font-medium">{stats.seoPerformance.readability}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div 
                          className="h-2 rounded-full bg-primary" 
                          style={{ width: `${stats.seoPerformance.readability}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Overview data={stats?.postsOverview} />
                </div>
              </>
            )}
          </div>

          {/* Jobs Table */}
          <div className="rounded-xl border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Recent Jobs</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your content generation jobs
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              {isLoading ? (
                <Skeleton className="h-[400px] w-full" />
              ) : error ? (
                <div className="text-center text-red-500 py-8">
                  Failed to load jobs
                </div>
              ) : (
                <JobsTable data={stats.recentJobs} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Subscription Prompt for Free Plan Users */}
      <SubscriptionPrompt 
        isOpen={showSubscriptionPrompt}
        onClose={() => setShowSubscriptionPrompt(false)}
      />
    </SidebarProvider>
  );
}
