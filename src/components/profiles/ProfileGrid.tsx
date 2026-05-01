"use client";
import { ProfileType } from "@/types/profile";
import { ProfileCard } from "./ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileGridProps {
  profiles: ProfileType[];
  title?: string;
  featuredIds?: string[];
  loading?: boolean;
}

const SkeletonCard = () => (
  <div className="w-full space-y-3">
    <Skeleton className="h-[250px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  </div>
);

export function ProfileGrid({ profiles, title, featuredIds = [], loading = false }: ProfileGridProps) {
  const showSkeletons = loading;

  return (
    <div className="space-y-4 md:space-y-6 max-w-full overflow-hidden">
      {title && (
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-pink-500">{title}</h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6 w-full">
        {showSkeletons
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex w-full">
                <SkeletonCard />
              </div>
            ))
          : profiles.map((profile, index) => (
              <div key={profile.id} className="flex w-full">
                <ProfileCard 
                  profile={profile} 
                  featured={featuredIds.includes(profile.id)} 
                  priority={index < 4}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
