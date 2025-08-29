import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobs, createJob, type JobsParams } from '@/lib/api/jobs';
import { useToast } from '@/components/ui/use-toast';

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobs(),
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Success',
        description: 'Job created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create job',
        variant: 'destructive',
      });
    },
  });
}
