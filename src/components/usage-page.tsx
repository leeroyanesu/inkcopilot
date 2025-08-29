import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

// Sample data - replace with actual data from your API
const usageData = {
  tokens: {
    used: 750000,
    total: 1000000,
    percentage: 75
  },
  posts: {
    created: 45,
    limit: 100,
    percentage: 45
  },
  plan: "Pro"
}

export function UsagePage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <>
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
              <Progress value={usageData.tokens.percentage} />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {usageData.tokens.used.toLocaleString()} / {usageData.tokens.total.toLocaleString()} tokens
                </span>
                <span className="font-medium">{usageData.tokens.percentage}%</span>
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
              <Progress value={usageData.posts.percentage} />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {usageData.posts.created} / {usageData.posts.limit} posts
                </span>
                <span className="font-medium">{usageData.posts.percentage}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Plan & Upgrade Section */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan: {usageData.plan}</CardTitle>
          <CardDescription>Upgrade your plan for more resources</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                Buy More Credits
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upgrade Your Plan</DialogTitle>
                <DialogDescription>
                  Enter your payment details to upgrade your plan
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Payment form would go here */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="font-medium">Payment Details</p>
                      <p className="text-sm text-muted-foreground">
                        Enter your card information to complete the purchase
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  Complete Purchase
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
