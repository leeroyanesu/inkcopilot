import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardsProps {
  stats: {
    activeJobs: number
    totalJobs: number
    newsGenerated: number
    postsGenerated: number
    articlesGenerated: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          <div className="h-4 w-4 rounded-full bg-orange-500/20">
            <div className="h-full w-full animate-pulse rounded-full bg-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeJobs}</div>
          <p className="text-xs text-muted-foreground">Currently running</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalJobs}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">News Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newsGenerated}</div>
          <p className="text-xs text-muted-foreground">Published articles</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Posts Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.postsGenerated}</div>
          <p className="text-xs text-muted-foreground">Blog posts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Articles Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.articlesGenerated}</div>
          <p className="text-xs text-muted-foreground">Long-form content</p>
        </CardContent>
      </Card>
    </div>
  )
}
