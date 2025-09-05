import { useSite } from "@/hooks/use-sites";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Loader2, Globe2 } from "lucide-react";

export function SiteDetail({ id }: { id: string }) {
  const { data: site, isLoading } = useSite(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!site) {
    return <div>Site not found</div>;
  }

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>{site.name}</SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <Label>URL</Label>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center mt-1.5"
          >
            <Globe2 className="w-4 h-4 mr-1" />
            {site.url}
          </a>
        </div>

        <div>
          <Label>Username</Label>
          <p className="mt-1.5">{site.username}</p>
        </div>

        <div>
          <Label>Password</Label>
          <p className="mt-1.5">Unchanged</p>
          <p className="text-xs text-muted-foreground mt-1">
            For WordPress sites, use an application-specific password.{" "}
            <a 
              href="https://wordpress.com/support/security/two-step-authentication/application-specific-passwords/#site-specific-application-passwords" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Learn more
            </a>
          </p>
        </div>

        <div>
          <Label>Added</Label>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {new Date(site.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
