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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
    return mockProfiles;
  }

  const dbProfiles: ProfileType[] = (data || []).map(mapDbProfile);
  const combined = [...dbProfiles, ...mockProfiles];

  // Seeded shuffle that changes twice a day (at 00:00 and 12:00)
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const period = now.getHours() < 12 ? 0 : 1;
  const seed = (now.getFullYear() * 1000) + (dayOfYear * 2) + period;

  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  // Seeded Fisher-Yates shuffle
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined;
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
    staleTime: 1000 * 60 * 5, 
    refetchOnMount: false, 
    refetchOnWindowFocus: false, 
  });
}

export function getAllProfiles(): ProfileType[] {
  return mockProfiles;
}
