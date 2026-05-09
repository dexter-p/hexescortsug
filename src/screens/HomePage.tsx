"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileGrid } from "@/components/profiles/ProfileGrid";
import { useAllProfiles } from "@/hooks/use-all-profiles";
import { ProfileType } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AdCarousel } from "@/components/profiles/AdCarousel";
import { Crown } from "lucide-react";

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

  const isInitialLoading = allProfiles.length === 0;

  // Split profiles into VIP and Ordinary
  const vipProfiles = allProfiles.filter(p => p.isPinned);
  const ordinaryProfiles = allProfiles.filter(p => !p.isPinned);
  
  const visibleOrdinary = ordinaryProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < ordinaryProfiles.length;

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

        {/* Profile Grid Section */}
        <div className="space-y-16 sm:space-y-24">
          
          {/* VIP SECTION */}
          {vipProfiles.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center sm:items-start">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl lg:text-5xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-yellow-400 via-white to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-pulse flex items-center gap-3"
                >
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                  Elite VIP Escorts
                </motion.h2>
                <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-transparent mt-1" />
              </div>
              <ProfileGrid
                profiles={vipProfiles}
                featuredIds={vipProfiles.map(p => p.id)}
                loading={isInitialLoading}
              />
            </div>
          )}

          {/* OTHER SECTION */}
          <div className="space-y-6">
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90 tracking-tight">
                Other Escorts
              </h2>
              <div className="h-0.5 w-24 bg-gray-700 mt-1" />
            </div>
            <ProfileGrid
              profiles={visibleOrdinary}
              loading={isInitialLoading}
            />

            {!isInitialLoading && hasMore && (
              <div className="flex justify-center pt-8 pb-4">
                <Button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-2 rounded-full font-semibold shadow-[0_0_18px_4px_rgba(236,72,153,0.55)] hover:shadow-[0_0_28px_8px_rgba(236,72,153,0.75)] transition-shadow duration-300"
                >
                  Load More Profiles
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-24 text-center text-muted-foreground prose prose-invert mx-auto max-w-4xl border-t border-gray-800 pt-16 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">#1 Verified Escort Directory in Uganda</h2>
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-400">
            <p>
              Welcome to <strong>Escorts UG</strong> – Uganda's most trusted platform for finding <strong>discreet, high-class, verified companions</strong> with <strong>real photos</strong>. 
              Whether you are looking for <strong>Kampala escorts</strong>, <strong>Entebbe call girls</strong>, or <strong>direct WhatsApp contacts</strong> for companions in 
              <strong> Jinja</strong>, <strong>Mbarara</strong>, and <strong>Gulu</strong>, our directory offers a safe and discreet way to connect countrywide.
            </p>
            
            <h3 className="text-xl font-semibold text-white">Why Choose Hex Escorts UG?</h3>
            <p>
              In a market filled with fake profiles, we stand out by ensuring that every <strong>discreet Uganda escort</strong> listed on our site 
              undergoes a strict manual verification process with <strong>real photos</strong>. We provide <strong>direct contacts</strong> and verified 
              social links to ensure a premium experience. Browse through <strong>sexy girls in Uganda</strong>, elite <strong>VIP companions</strong>, and independent 
              ladies available for both incalls and outcalls across all major towns.
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
