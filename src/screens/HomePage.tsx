"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileGrid } from "@/components/profiles/ProfileGrid";
import { useAllProfiles } from "@/hooks/use-all-profiles";
import { ProfileType } from "@/types/profile";
import { Button } from "@/components/ui/button";

import { AdCarousel } from "@/components/profiles/AdCarousel";

const PAGE_SIZE = 12;

const cities = [
  { name: "Kampala", path: "/escorts-in/kampala" },
  { name: "Entebbe", path: "/escorts-in/entebbe" },
  { name: "Jinja", path: "/escorts-in/jinja" },
  { name: "Mbarara", path: "/escorts-in/mbarara" },
  { name: "Gulu", path: "/escorts-in/gulu" },
  { name: "Mbale", path: "/escorts-in/mbale" },
  { name: "Tororo", path: "/escorts-in/tororo" },
  { name: "Fort Portal", path: "/escorts-in/fort-portal" },
  { name: "Mukono", path: "/escorts-in/mukono" },
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
    <div className="pt-20 lg:pt-6 min-h-screen max-w-[100vw] overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4">
        {/* SEO Header */}
        <div className="mb-6 sm:mb-8 overflow-x-hidden">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary mb-4 break-words">
            Verified Escorts in Uganda
          </h1>
          
          {/* Top Sliding Section */}
          <div className="w-full overflow-hidden mb-6">
            <AdCarousel profiles={allProfiles} />
          </div>

          <nav aria-label="Browse by city" className="flex flex-wrap gap-1.5 sm:gap-2">
            {cities.map((c) => (
              <Link
                key={c.name}
                href={c.path}
                className="text-[9px] sm:text-[11px] bg-gradient-to-r from-[#db0061] to-[#ff1493] text-white hover:from-[#ff1493] hover:to-[#db0061] px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-black transition-all duration-300 shadow-[0_2px_10px_rgba(255,20,147,0.3)] hover:shadow-[0_2px_15px_rgba(255,20,147,0.5)] hover:-translate-y-0.5 active:scale-95 text-center break-words max-w-full"
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
        <div className="mt-16 text-center text-muted-foreground prose prose-invert mx-auto max-w-4xl border-t border-gray-800 pt-12 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">#1 Verified Escort Directory in Uganda</h2>
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-400">
            <p>
              Welcome to <strong>Escorts UG</strong> – Uganda's most trusted platform for finding high-class, verified companions. 
              Whether you are looking for <strong>Kampala escorts</strong>, <strong>Entebbe call girls</strong>, or companions in 
              <strong> Jinja</strong>, <strong>Mbarara</strong>, and <strong>Gulu</strong>, our directory offers a safe and discreet way to connect.
            </p>
            
            <h3 className="text-xl font-semibold text-white">Why Choose Hex Escorts UG?</h3>
            <p>
              In a market filled with fake profiles, we stand out by ensuring that every <strong>Uganda escort</strong> listed on our site 
              undergoes a strict manual verification process. We check photos, contact details, and reviews to provide you with a premium 
              experience. Browse through <strong>sexy girls in Uganda</strong>, elite <strong>VIP companions</strong>, and independent 
              ladies available for both incalls and outcalls.
            </p>

            <h3 className="text-xl font-semibold text-white">Safe & Discreet Hookups in Kampala</h3>
            <p>
              Our platform is designed for privacy. We understand the importance of discretion in the <strong>Ugandan escort industry</strong>. 
              From <strong>thick escorts in Kampala</strong> to <strong>slim and curvy models</strong>, you can find the perfect match 
              for your desires. Our location-based search allows you to find girls in your specific suburb, making it easier than ever 
               to book a verified companion near you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
