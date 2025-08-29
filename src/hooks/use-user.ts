import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { getProfile, Profile } from "@/lib/api/profile";


export function useUser() {
  const { data: user, isLoading, error } = useQuery<Profile>({
    queryKey: ["user"],
    queryFn:getProfile,
  });

  return {
    user,
    isLoading,
    error,
  };
}
