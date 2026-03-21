import { ProfileType } from "@/types/profile";
import { mockProfiles } from "@/data/mockProfiles";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export async function fetchAllProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
    return mockProfiles;
  }

  const dbProfiles: ProfileType[] = (data || []).map((p) => ({
    id: `db-${p.id}`,
    name: p.name,
    age: p.age ?? undefined,
    height: p.height ?? undefined,
    bodyType: p.body_type ?? undefined,
    complexion: p.complexion ?? undefined,
    location: p.location,
    rating: Number(p.rating) || 4.5,
    profileImage: p.profile_image || "/placeholder.svg",
    images: (p.images && p.images.length > 0) ? p.images : [p.profile_image || "/placeholder.svg"],
    shortBio: p.short_bio || "",
    description: p.description || "",
    phone: p.phone ?? undefined,
    email: p.email ?? undefined,
    instagram: p.instagram ?? undefined,
    services: p.services || [],
    videos: p.videos || [],
    reviews: [],
  }));

  const combined = [...dbProfiles, ...mockProfiles];
  // Fisher-Yates shuffle for a fresh random order on every page load
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined;
}

export function useAllProfiles(initialData?: ProfileType[]) {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: fetchAllProfiles,
    initialData,
    staleTime: 1000 * 60 * 5, // Prevent immediate refetch for 5 mins
    refetchOnMount: false, // Don't refetch when component mounts if we have initialData
    refetchOnWindowFocus: false, // Don't reshuffle when switching tabs
  });
}

// Sync fallback for non-hook contexts
export function getAllProfiles(): ProfileType[] {
  return mockProfiles;
}
