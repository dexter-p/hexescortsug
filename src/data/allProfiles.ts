import { ProfileType } from "@/types/profile";
import { mockProfiles } from "@/data/mockProfiles";
import { staticProfiles } from "@/data/staticProfiles";
import { supabase } from "@/integrations/supabase/client";

// Set this to false to use live database updates while serving images locally to save quota
const FORCE_STATIC_DATA = false;

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
  // Helper to convert Supabase storage URLs to local ones
  const transformUrl = (url: string | null | undefined): string => {
    if (!url) return "/placeholder.svg";
    if (url.includes(".supabase.co/storage/v1/object/public/")) {
      return url.replace(/https:\/\/.*\.supabase\.co\/storage\/v1\/object\/public\//g, '/storage/');
    }
    return url;
  };

  return {
    id: String(p.id),
    name: p.name,
    age: p.age ?? undefined,
    height: p.height ?? undefined,
    bodyType: p.body_type ?? undefined,
    complexion: p.complexion ?? undefined,
    location: p.location,
    rating: Number(p.rating) || 4.5,
    profileImage: transformUrl(p.profile_image || (p.images && p.images.length > 0 ? p.images[0] : null)),
    images: (p.images && p.images.length > 0) ? p.images.map(transformUrl) : [transformUrl(p.profile_image)],
    shortBio: p.short_bio || "",
    description: p.description || "",
    phone: p.phone ?? undefined,
    whatsapp: p.whatsapp ?? undefined,
    email: p.email ?? undefined,
    instagram: p.instagram ?? undefined,
    services: p.services || [],
    videos: (p.videos || []).map(transformUrl),
    reviews: [],
    isPinned: p.is_pinned || false,
    isArchived: p.is_archived || false,
    isVip: p.is_vip || false,
    isPremium: p.is_premium || false,
  };
}

export async function fetchAllProfiles(seed?: string) {
  if (FORCE_STATIC_DATA) {
    return seed ? sortAndShuffleProfiles(staticProfiles, seed) : staticProfiles;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("No Supabase URL; using static fallback.");
    return seed ? sortAndShuffleProfiles(staticProfiles, seed) : staticProfiles;
  }
  
  try {
    // @ts-ignore – Supabase type chain depth limit
    const { data, error } = await (supabase as any)
      .from("profiles")
      .select("*")
      .eq("is_archived", false)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error (likely quota hit), using local backup:", error);
      return seed ? sortAndShuffleProfiles(staticProfiles, seed) : staticProfiles;
    }

    const dbProfiles: ProfileType[] = (data || []).map(mapDbProfile);
    return seed ? sortAndShuffleProfiles(dbProfiles, seed) : dbProfiles;
  } catch (err) {
    console.error("Fetch exception, using static fallback:", err);
    return seed ? sortAndShuffleProfiles(staticProfiles, seed) : staticProfiles;
  }
}

export async function fetchProfileById(id: string) {
  if (FORCE_STATIC_DATA) {
    return staticProfiles.find(p => p.id === id) || null;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  try {
    // @ts-ignore – Supabase type chain depth limit
    const { data, error } = await (supabase as any)
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return staticProfiles.find(p => p.id === id) || null;
    }

    return mapDbProfile(data);
  } catch (err) {
    return staticProfiles.find(p => p.id === id) || null;
  }
}
