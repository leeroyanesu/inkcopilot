import { useQuery } from '@tanstack/react-query';
import { getSubscriptionWithUsage } from '@/lib/api/billing';

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscriptionWithUsage
  });
}
