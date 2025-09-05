import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateSite, Site } from "@/hooks/use-sites";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Must be a valid URL"),
  username: z.string().min(1, "Username is required"),
  password: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SiteEditForm({ site, onSuccess }: { site: Site; onSuccess: () => void }) {
  const { toast } = useToast();
  const updateSite = useUpdateSite();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: site.name,
      url: site.url,
      username: site.username,
      password: "",
    },
  });

  useEffect(() => {
    if (site) {
      form.reset({
        name: site.name,
        url: site.url,
        username: site.username,
        password: "",
      });
    }
  }, [site, form]);

  const onSubmit = async (data: FormData) => {
    try {
      // Remove password from the data if it's empty
      const updateData: Partial<Site> = { ...data };
      if (!updateData.password) {
        delete updateData.password;
      }

      await updateSite.mutateAsync({ id: site._id, data: updateData });
      toast({
        title: "Success",
        description: "Site updated successfully",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update site",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input placeholder="My Website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="admin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Leave blank to keep unchanged" {...field} />
              </FormControl>
              <FormMessage />
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
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={updateSite.isPending}>
          {updateSite.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating Site...
            </>
          ) : (
            "Update Site"
          )}
        </Button>
      </form>
    </Form>
  );
}
