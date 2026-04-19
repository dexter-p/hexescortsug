import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return '/placeholder.svg';
  // If it's already a local path, return as is
  if (url.startsWith('/storage/')) return url;
  
  // Handle various Supabase storage URLs
  if (url.includes('.supabase.co/storage/v1/object/public/')) {
    return url.replace(/https:\/\/.*\.supabase\.co\/storage\/v1\/object\/public\//g, '/storage/');
  }
  
  return url;
}
