import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.includes('zdiosdkoxcimlovewroz.supabase.co/storage/v1/object/public/')) {
    return url.replace('https://zdiosdkoxcimlovewroz.supabase.co/storage/v1/object/public/', '/api/media/');
  }
  return url;
}
