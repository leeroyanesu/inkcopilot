import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export type Site = {
  _id: string;
  name: string;
  url: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export function useSites() {
  return useQuery({
    queryKey: ["sites"],
    queryFn: () => api.get("/api/sites").then((res) => res.data as Site[]),
  });
}

export function useSite(id: string) {
  return useQuery({
    queryKey: ["sites", id],
    queryFn: () => api.get(`/api/sites/${id}`).then((res) => res.data as Site),
    enabled: !!id,
  });
}

export function useCreateSite() {
  return useMutation({
    mutationFn: (data: Omit<Site, "_id" | "createdAt" | "updatedAt">) =>
      api.post("/api/sites", data).then((res) => res.data),
    onError: (error: any) => {
      console.error("Error creating site:", error);
      throw error;
    },
    onSuccess: () => {
      // Force refetch of sites query
      window.location.reload();
    },
  });
}

export function useUpdateSite() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Site> }) =>
      api.put(`/api/sites/${id}`, data).then((res) => res.data),
  });
}

export function useDeleteSite() {
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/sites/${id}`).then((res) => res.data),
  });
}
