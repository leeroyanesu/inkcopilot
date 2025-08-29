import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import api from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProfile, updateProfile, Profile, getSubscription } from "@/lib/api/profile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Crown, Trash2 } from "lucide-react"

export default function AccountPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState("")
  const [profileForm, setProfileForm] = React.useState({
    fullNames: "",
    phone: "",
    company: "",
    role: ""
  })

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/api/profile')
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      })
      // Redirect to home or login page
      window.location.href = '/'
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete account",
        variant: "destructive"
      })
    }
  }

  // Fetch profile data
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile
  })

  // Fetch subscription data
  const { data: subscriptionData } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription
  })

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      })
    }
  })

  // Initialize form data when profile loads
  React.useEffect(() => {
    if (profile) {
      const [firstName, ...lastNames] = profile.fullNames.split(' ')
      setProfileForm({
        fullNames: profile.fullNames,
        phone: profile.phone || "",
        company: profile.company || "",
        role: profile.role || ""
      })
    }
  }, [profile])

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfileMutation.mutate(profileForm)
  }

  if (profileLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleProfileSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullNames">Full name</Label>
                <Input
                  id="fullNames"
                  value={profileForm.fullNames}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, fullNames: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile?.email}
                  disabled
                  className="bg-muted"
                />
                <span className="text-xs text-muted-foreground">Email cannot be changed</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileForm.company}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Enter your role"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    You are currently on the {subscriptionData?.subscription?.plan || 'Free'} plan
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="h-6 items-center gap-1">
                  <Crown className="h-3 w-3" />
                  {subscriptionData?.subscription?.plan || 'Free'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Price</span>
                  <span>
                    {subscriptionData?.subscription?.price 
                      ? `$${subscriptionData.subscription.price}/month`
                      : 'Free'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status</span>
                  <Badge variant={subscriptionData?.subscription?.status === 'active' ? 'default' : 'destructive'}>
                    {subscriptionData?.subscription?.status || 'inactive'}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-4">
                  <span className="text-sm font-medium">Usage this month:</span>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Posts Used</p>
                      <p className="text-2xl font-bold">
                        {subscriptionData?.usage.postsUsed || 0} 
                        {subscriptionData?.subscription?.postsLimit && 
                          <span className="text-sm text-muted-foreground">
                            /{subscriptionData.subscription.postsLimit}
                          </span>
                        }
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Tokens Used</p>
                      <p className="text-2xl font-bold">
                        {subscriptionData?.usage.tokensUsed || 0}
                        {subscriptionData?.subscription?.tokenLimit && 
                          <span className="text-sm text-muted-foreground">
                            /{subscriptionData.subscription.tokenLimit}
                          </span>
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <span className="text-sm font-medium">Features included:</span>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {subscriptionData?.subscription?.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Change Plan</Button>
            </CardFooter>
          </Card>        {/* Delete Account */}
        <Card className="border-destructive">
          <CardHeader className="border-b border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <CardTitle>Danger Zone</CardTitle>
            </div>
            <CardDescription className="text-destructive/90">
              Once you delete your account, there is no going back. Please be certain.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="default" 
                  className="w-full sm:w-auto bg-destructive/90 hover:bg-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] border-destructive">
                <DialogHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <DialogTitle>Delete Account</DialogTitle>
                  </div>
                  <DialogDescription className="text-base">
                    <p className="font-medium text-destructive mb-2">Warning: This action cannot be undone.</p>
                    <p className="text-muted-foreground">This will:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                      <li>Permanently delete your account</li>
                      <li>Remove all your content and data</li>
                      <li>Cancel all active subscriptions</li>
                    </ul>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-destructive font-medium">
                      Type "DELETE" to confirm
                    </Label>
                    <Input
                      id="confirm"
                      value={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.value)}
                      placeholder="DELETE"
                      className="border-destructive/50 focus-visible:ring-destructive"
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button
                    variant="default"
                    disabled={confirmDelete !== "DELETE"}
                    className={`w-full text-white bg-destructive hover:bg-destructive/90`}
                    onClick={() => {
                      handleDeleteAccount()
                      setIsDeleteDialogOpen(false)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Permanently Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
