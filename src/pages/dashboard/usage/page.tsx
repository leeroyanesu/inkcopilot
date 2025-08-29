import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UsageAPI } from "@/lib/api/usage"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, CreditCard } from "lucide-react"

const QUERY_KEY = {
  usage: ['usage'],
} as const

export default function UsagePage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  
  const { data: usageStats, isLoading } = useQuery({
    queryKey: QUERY_KEY.usage,
    queryFn: UsageAPI.getUsageStats,
  })

  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Usage & Limits</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your resource usage and plan limits
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tokens Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle>Token Usage</CardTitle>
            <CardDescription>Monthly token consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={usageStats?.usagePercentage ?? 0} />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {usageStats?.usedPosts.toLocaleString()} / {usageStats?.totalPosts.toLocaleString()} posts
                </span>
                <span className="font-medium">{usageStats?.usagePercentage.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Created</CardTitle>
            <CardDescription>Monthly post creation limit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Loading usage data...
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Remaining Posts</h3>
                    <p className="text-3xl font-bold">{usageStats?.remainingPosts}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Usage History (Last 30 Days)</h4>
                    <div className="flex h-[60px] items-end gap-1">
                      {usageStats?.usageHistory.map((day) => (
                        <div
                          key={day.date}
                          className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors"
                          style={{
                            height: `${(day.count / (usageStats?.totalPosts || 1)) * 100}%`,
                            minHeight: day.count > 0 ? '4px' : '0'
                          }}
                          title={`${day.date}: ${day.count} posts`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Plan & Upgrade Section */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>Upgrade your plan for more resources</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={()=>window.location.replace('/dashboard/billing')}>
                <Sparkles className="mr-2 h-4 w-4" />
                Buy More Credits
              </Button>
        </CardContent>
      </Card>
    </div>
  )
}
