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
                  {(usageStats?.usedPosts || 0).toLocaleString()} / {(usageStats?.totalPosts || 0).toLocaleString()} posts
                </span>
                <span className="font-medium">{(usageStats?.usagePercentage || 0).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Created</CardTitle>
            <CardDescription>{(usageStats?.subscription?.plan === 'Free' || usageStats?.subscription?.name === 'Free') ? 'Free trial limit' : 'Monthly post creation limit'}</CardDescription>
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
                    {(usageStats?.subscription?.plan === 'Free' || usageStats?.subscription?.name === 'Free') && (
                      <p className="text-sm text-amber-600 mt-1">
                        Free plan limited to 2 posts. Upgrade for more content.
                      </p>
                    )}
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
          <CardDescription>
            {(usageStats?.subscription?.plan === 'Free' || usageStats?.subscription?.name === 'Free')
              ? 'Upgrade from Free trial (2 posts) to the Starter plan for more content' 
              : 'Upgrade your plan for more resources'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(usageStats?.subscription?.plan === 'Free' || usageStats?.subscription?.name === 'Free') && (
              <div className="p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                <p className="font-medium">Free Trial Limit</p>
                <p className="text-sm mt-1">You've used {usageStats?.usedPosts || 0} of 2 allowed posts in the Free plan. Upgrade to continue creating content.</p>
              </div>
            )}
            <Button onClick={()=>window.location.replace('/dashboard/billing')}>
              <Sparkles className="mr-2 h-4 w-4" />
              {(usageStats?.subscription?.plan === 'Free' || usageStats?.subscription?.name === 'Free') ? 'Upgrade to Starter Plan' : 'Buy More Credits'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
