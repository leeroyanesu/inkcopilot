import { Globe2, Plus, View, Edit, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSites, useSite } from "@/hooks/use-sites";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SiteForm } from "./_components/site-form";
import { SiteDetail } from "./_components/site-detail";
import { SiteEditForm } from "./_components/site-edit-form";
import { useUser } from "@/hooks/use-user";

export default function SitesPage() {
  const { data: sites, isLoading } = useSites();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [editingSite, setEditingSite] = useState<string | null>(null);
  const [showAddSite, setShowAddSite] = useState(false);
  const { user } = useUser();
  const { data: siteToEdit } = useSite(editingSite || "");



  const plan = user?.subscription?.plan || "Starter";
  const maxSites = plan === "Pro" ? 3 : plan === "Custom" ? 3 : 1;
  const canAddMore = !sites || sites.length < maxSites;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
          <p className="text-muted-foreground">
            Manage your connected websites ({sites?.length || 0} / {maxSites})
          </p>
        </div>
        {canAddMore && (
          <Button onClick={() => setShowAddSite(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Site
          </Button>
        )}
      </div>

      <Card>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-24 text-muted-foreground">
              Loading...
            </div>
          ) : sites?.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-muted-foreground">
              No sites added yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites?.map((site) => (
                  <TableRow key={site._id}>
                    <TableCell className="font-medium">{site.name}</TableCell>
                    <TableCell>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        <Globe2 className="w-4 h-4 mr-1" />
                        {site.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSite(site._id)}
                        >
                          <View className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSite(site._id)}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Sheet open={showAddSite} onOpenChange={setShowAddSite}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Site</SheetTitle>
            <SheetDescription>
              Add a new website to your account. You can add up to {maxSites} sites on your current plan.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <SiteForm onSuccess={() => setShowAddSite(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedSite} onOpenChange={() => setSelectedSite(null)}>
        <SheetContent>
          {selectedSite && <SiteDetail id={selectedSite} />}
        </SheetContent>
      </Sheet>

      <Sheet open={!!editingSite} onOpenChange={() => setEditingSite(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Site</SheetTitle>
            <SheetDescription>
              Update your website information.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {siteToEdit && (
              <SiteEditForm 
                site={siteToEdit} 
                onSuccess={() => {
                  setEditingSite(null);
                  window.location.reload();
                }} 
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
