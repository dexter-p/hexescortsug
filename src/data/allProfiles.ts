import { ProfileType } from "@/types/profile";
import { mockProfiles } from "@/data/mockProfiles";
import { supabase } from "@/integrations/supabase/client";

export function createSeededRand(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

export function shuffleArray<T>(array: T[], rand?: () => number): T[] {
  const arr = [...array];
  const r = rand || Math.random;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function sortAndShuffleProfiles(profiles: ProfileType[], seed?: string): ProfileType[] {
  if (!seed) return profiles;
  const rand = createSeededRand(seed);
  const pinned = profiles.filter(p => p.isPinned);
  const regular = profiles.filter(p => !p.isPinned);

  return [...shuffleArray(pinned, rand), ...shuffleArray(regular, rand)];
}

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
    isVip: p.is_vip || false,
    isPremium: p.is_premium || false,
  };
}

export async function fetchAllProfiles(seed?: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("Skipping Supabase fetch during build since credentials are missing.");
    return seed ? sortAndShuffleProfiles(mockProfiles, seed) : mockProfiles;
  }
  
  // @ts-ignore – Supabase type chain depth limit; works correctly at runtime
  const { data, error } = await (supabase as any)
    .from("profiles")
    .select("*")
    .eq("is_archived", false)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
    return seed ? sortAndShuffleProfiles(mockProfiles, seed) : mockProfiles;
  }

  const dbProfiles: ProfileType[] = (data || []).map(mapDbProfile);
  const combined = [...dbProfiles, ...mockProfiles];
  
  return seed ? sortAndShuffleProfiles(combined, seed) : combined;
}

export async function fetchProfileById(id: string) {
  const mock = mockProfiles.find(p => p.id === id);
  if (mock) return mock;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  // @ts-ignore – Supabase type chain depth limit; works correctly at runtime
  const { data, error } = await (supabase as any)
    .from("profiles")
    .select("*")
    .eq("is_archived", false)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile by id:", error);
    return null;
  }

  return data ? mapDbProfile(data) : null;
}
