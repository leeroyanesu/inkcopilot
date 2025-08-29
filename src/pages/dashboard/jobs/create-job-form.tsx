import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCreateJob } from "@/hooks/use-jobs"

const sources = [
  { label: "Reuters", value: "reuters" },
  { label: "Associated Press", value: "ap" },
  { label: "Bloomberg", value: "bloomberg" },
  { label: "BBC News", value: "bbc" },
  { label: "CNN", value: "cnn" },
  { label: "The Guardian", value: "guardian" },
] as const

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  type: z.enum(["news", "post", "article"]),
  postsPerDay: z.number().min(1).max(5),
  topic: z.string().min(2),
  additionalPrompts: z.string().optional(),
  maxWordCount: z.number().min(100).max(10000),
  category: z.string(),
  aiModel: z.enum([
    "gpt-5",
    "gpt-5-mini",
    "gpt-4-o",
    "gpt-4-turbo-preview",
    "gpt-4",
    "gpt-4-32k",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-instruct",
    "davinci-002",
    "curie-001"
  ]),
  schedule: z.enum(["everyday", "every-12-hours", "once-week", "everyday-once"]),
  targetWebsite: z.string(),
  sources: z.array(z.string()).optional(),
})

interface CreateJobFormProps {
  onSuccess?: () => void;
}

export function CreateJobForm({ onSuccess }: CreateJobFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "post",
      postsPerDay: 1,
      maxWordCount: 1000,
      schedule: "everyday-once",
      sources: [],
    },
  })

  const { mutate: createJob, isPending } = useCreateJob();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createJob(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    })
  }

  const workspaces = [
    { label: "My Blog", value: "blog1" },
    { label: "Company Website", value: "company1" },
    { label: "News Portal", value: "news1" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="news" />
                    </FormControl>
                    <FormLabel className="font-normal">News</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="post" />
                    </FormControl>
                    <FormLabel className="font-normal">Post</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="article" />
                    </FormControl>
                    <FormLabel className="font-normal">Article</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("schedule") === "everyday" && (
          <FormField
            control={form.control}
            name="postsPerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posts per Day *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    {...field}
                    onChange={e => {
                      const value = Number(e.target.value);
                      if (value > 5) {
                        field.onChange(5);
                      } else if (value < 1) {
                        field.onChange(1);
                      } else {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription className="flex items-center text-muted-foreground">
                  <span>Maximum of 5 articles per day</span>
                  {field.value > 5 && (
                    <span className="ml-2 text-destructive">
                      Value capped at 5
                    </span>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic / Keywords *</FormLabel>
              <FormControl>
                <Input placeholder="Business, Technology, AI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalPrompts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional instructions for content generation"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxWordCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Word Count *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  max={1000}
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WordPress Category *</FormLabel>
              <FormControl>
                <Input placeholder="Enter WordPress category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aiModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Model *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="gpt-5">GPT-5 (Ultimate - Latest Gen)</SelectItem>
                  <SelectItem value="gpt-5-mini">GPT-5 Mini (Premium - Efficient)</SelectItem>
                  <SelectItem value="gpt-4-o">GPT-4-O (Premium - Optimized)</SelectItem>
                  <SelectItem value="gpt-4-turbo-preview">GPT-4 Turbo (Premium - Latest)</SelectItem>
                  <SelectItem value="gpt-4">GPT-4 (Premium)</SelectItem>
                  <SelectItem value="gpt-4-32k">GPT-4 32K (Premium - Long Articles)</SelectItem>
                  <SelectItem value="gpt-3.5-turbo-16k">GPT-3.5 Turbo 16K (Balanced)</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Balanced)</SelectItem>
                  <SelectItem value="gpt-3.5-turbo-instruct">GPT-3.5 Turbo Instruct (Cost-effective)</SelectItem>
                  <SelectItem value="davinci-002">Davinci-002 (Cost-effective)</SelectItem>
                  <SelectItem value="curie-001">Curie-001 (Most Cost-effective)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="everyday">Every day (Multiple posts)</SelectItem>
                  <SelectItem value="every-12-hours">Every 12 hours</SelectItem>
                  <SelectItem value="once-week">Once a week</SelectItem>
                  <SelectItem value="everyday-once">Every day (Once)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose how often content should be generated</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Website *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select website" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace.value} value={workspace.value}>
                      {workspace.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a connected WordPress website</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />        {form.watch("type") === "news" && (
          <FormField
            control={form.control}
            name="sources"
            render={({ field }) => (
              <FormItem>
                <FormLabel>News Sources</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value?.length
                          ? `${field.value.length} sources selected`
                          : "Select sources"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search sources..." />
                      <CommandEmpty>No source found.</CommandEmpty>
                      <CommandGroup>
                        {sources.map((source) => (
                          <CommandItem
                            value={source.label}
                            key={source.value}
                            onSelect={() => {
                              const values = field.value || []
                              const newValues = values.includes(source.value)
                                ? values.filter((v) => v !== source.value)
                                : [...values, source.value]
                              form.setValue("sources", newValues)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                (field.value || []).includes(source.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {source.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select one or more news sources
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Job"}
        </Button>
      </form>
    </Form>
  )
}
