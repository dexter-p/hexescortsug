"use client";

import { ProfileCard } from "./ProfileCard";
import { ProfileType } from "@/types/profile";

interface ProfileGridProps {
  profiles: ProfileType[];
  title?: string;
  featuredIds?: string[];
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-card border border-border animate-pulse">
      <div className="aspect-[3/4] bg-muted" />
      <div className="p-2 space-y-2">
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export function ProfileGrid({ profiles, title, featuredIds = [], loading = false }: ProfileGridProps) {
  const showSkeletons = loading;

  const sortedProfiles = [...profiles].sort((a, b) => {
    const aIsFeatured = featuredIds.includes(a.id);
    const bIsFeatured = featuredIds.includes(b.id);
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;
    return 0;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      {title && (
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-pink-500">{title}</h2>
      )}
      
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {showSkeletons
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex w-full">
                <SkeletonCard />
              </div>
            ))
          : sortedProfiles.map((profile, index) => (
              <div key={profile.id} className="flex w-full">
                <ProfileCard 
                  profile={profile} 
                  featured={featuredIds.includes(profile.id)}
                  priority={index < 2}
                />
              </div>
            ))
        }
      </div>
    </div>
  );
}
