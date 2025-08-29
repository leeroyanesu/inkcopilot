import { Job } from './jobs-table'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Badge } from './ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface JobDetailsPanelProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onJobCancelled: () => void
}

export function JobDetailsPanel({ job, isOpen, onClose, onJobCancelled }: JobDetailsPanelProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelJob = async () => {
    if (!job) return
    try {
      setIsLoading(true)
      const response = await api.delete(`/api/jobs/${job._id}`)
      if (response.status === 200) {
        onJobCancelled() // This will trigger the refresh
        onClose()
        window.location.reload() // Force a full page refresh
      }
    } catch (error) {
      console.error('Failed to cancel job:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statusIcons = {
    running: <Loader2 className="h-4 w-4 animate-spin" />,
    completed: <CheckCircle2 className="h-4 w-4" />,
    failed: <XCircle className="h-4 w-4" />,
    queued: <Clock className="h-4 w-4" />,
  }

  if (!job) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Job Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-medium">Title</h3>
            <p className="mt-1.5">{job.title}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Status</h3>
            <Badge
              variant={
                job.status === "running"
                  ? "default"
                  : job.status === "completed"
                  ? "success"
                  : job.status === "failed"
                  ? "destructive"
                  : "secondary"
              }
              className="mt-1.5 flex w-24 items-center justify-center gap-1"
            >
              {statusIcons[job.status]}
              <span>{job.status}</span>
            </Badge>
          </div>

          <div>
            <h3 className="font-medium">Type</h3>
            <Badge variant="secondary" className="mt-1.5">
              {job.type.toUpperCase()}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium">Created</h3>
            <p className="mt-1.5">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
          </div>

          <div>
            <h3 className="font-medium">Configuration</h3>
            <div className="mt-1.5 space-y-2">
              <p><span className="text-muted-foreground">AI Model:</span> {job.config.aiModel}</p>
              <p><span className="text-muted-foreground">Word Count:</span> {job.config.maxWordCount} words</p>
              <p><span className="text-muted-foreground">Category:</span> {job.config.category}</p>
              <p><span className="text-muted-foreground">Schedule:</span> {job.config.schedule}</p>
              <p><span className="text-muted-foreground">Target Website:</span> {job.config.targetWebsite}</p>
              {job.config.sources && job.config.sources.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Sources:</span>
                  <ul className="mt-1 list-disc pl-4">
                    {job.config.sources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {job.status !== 'completed' && job.status !== 'failed' && (
            <Button 
              variant="default" 
              className="w-full bg-destructive/50 hover:bg-destructive text-destructive-foreground transition-colors"
              onClick={handleCancelJob}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cancel Job
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
