import { ProfileType } from "@/types/profile";
import { mockProfiles } from "@/data/mockProfiles";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

function mapDbProfile(p: any): ProfileType {
  return {
    id: String(p.id),
    name: p.name,
    age: p.age ?? undefined,
    height: p.height ?? undefined,
    bodyType: p.body_type ?? undefined,
    complexion: p.complexion ?? undefined,
    location: p.location,
    rating: Number(p.rating) || 4.5,
    profileImage: p.profile_image || (p.images && p.images.length > 0 ? p.images[0] : "/placeholder.svg"),
    images: (p.images && p.images.length > 0) ? p.images : [p.profile_image || "/placeholder.svg"],
    shortBio: p.short_bio || "",
    description: p.description || "",
    phone: p.phone ?? undefined,
    email: p.email ?? undefined,
    instagram: p.instagram ?? undefined,
    services: p.services || [],
    videos: p.videos || [],
    reviews: [],
    isPinned: p.is_pinned || false,
  };
}

export async function fetchAllProfiles() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("Skipping Supabase fetch during build since credentials are missing.");
    return mockProfiles;
  }
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
    return mockProfiles;
  }

  const dbProfiles: ProfileType[] = (data || []).map(mapDbProfile);
  return [...dbProfiles, ...mockProfiles];
}

export async function fetchProfileById(id: string) {
  // If it's a mock profile
  const mock = mockProfiles.find(p => p.id === id);
  if (mock) return mock;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  // Otherwise check DB
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile by id:", error);
    return null;
  }

  return data ? mapDbProfile(data) : null;
}

export function useAllProfiles(initialData?: ProfileType[]) {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: fetchAllProfiles,
    initialData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function getAllProfiles(): ProfileType[] {
  return mockProfiles;
}
