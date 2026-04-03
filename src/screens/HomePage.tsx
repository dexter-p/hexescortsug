"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileGrid } from "@/components/profiles/ProfileGrid";
import { useAllProfiles } from "@/hooks/use-all-profiles";
import { ProfileType } from "@/types/profile";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const cities = [
  { name: "Kampala", path: "/location/kampala" },
  { name: "Entebbe", path: "/location/entebbe" },
  { name: "Jinja", path: "/location/jinja" },
  { name: "Mbarara", path: "/location/mbarara" },
  { name: "Gulu", path: "/location/gulu" },
  { name: "Mbale", path: "/location/mbale" },
  { name: "Tororo", path: "/location/tororo" },
  { name: "Fort Portal", path: "/location/fort-portal" },
  { name: "Mukono", path: "/location/mukono" },
];

interface HomePageProps {
  initialProfiles?: ProfileType[];
  shuffleSeed?: string;
}

const HomePage = ({ initialProfiles = [], shuffleSeed }: HomePageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: queryProfiles } = useAllProfiles(initialProfiles, shuffleSeed);
  const allProfiles = queryProfiles || initialProfiles || [];

  const visibleProfiles = allProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < allProfiles.length;
  const isInitialLoading = allProfiles.length === 0;

  // Mark all pinned profiles as featured
  const featuredIds = allProfiles.filter(p => p.isPinned).map(p => p.id);

  return (
    <div className="pt-20 lg:pt-6 min-h-screen">
      <div className="container mx-auto px-4">
        {/* SEO Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-primary mb-4">
            Verified Escorts in Uganda
          </h1>
          <nav aria-label="Browse by city" className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link
                key={c.name}
                href={c.path}
                className="text-[10px] sm:text-[11px] bg-gradient-to-r from-[#db0061] to-[#ff1493] text-white hover:from-[#ff1493] hover:to-[#db0061] px-4 py-2 rounded-full font-black transition-all duration-300 shadow-[0_2px_10px_rgba(255,20,147,0.3)] hover:shadow-[0_2px_15px_rgba(255,20,147,0.5)] hover:-translate-y-0.5 active:scale-95"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Profile Grid */}
        <div className="space-y-8">
          <ProfileGrid
            profiles={visibleProfiles}
            title="🔥 Verified Top Profiles"
            featuredIds={featuredIds}
            loading={isInitialLoading}
          />

          {!isInitialLoading && hasMore && (
            <div className="flex justify-center pt-2 pb-4">
              <Button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-2 rounded-full font-semibold shadow-[0_0_18px_4px_rgba(236,72,153,0.55)] hover:shadow-[0_0_28px_8px_rgba(236,72,153,0.75)] transition-shadow duration-300 animate-pulse"
              >
                Load More Profiles
              </Button>
            </div>
          )}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 text-center text-muted-foreground prose prose-invert mx-auto">
          <h2 className="text-2xl font-bold text-primary">#1 Escort Directory in Uganda</h2>
          <p>
            Welcome to <strong>Escorts UG</strong> – the most trusted source for verified, real companions 
            in Kampala, Entebbe, and Jinja. Every profile is manually checked to ensure a safe experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
