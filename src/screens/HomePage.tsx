"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileGrid } from "@/components/profiles/ProfileGrid";
import { useAllProfiles } from "@/data/allProfiles";
import { ProfileType } from "@/types/profile";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const cities = [
  { name: "Kampala", path: "/location/kampala" },
  { name: "Entebbe", path: "/location/entebbe" },
  { name: "Jinja", path: "/location/jinja" },
  { name: "Mbarara", path: "/location/mbarara" },
  { name: "Gulu", path: "/location/gulu" },
  { name: "Fort Portal", path: "/location/fort-portal" },
  { name: "Mbale", path: "/location/mbale" },
];

interface HomePageProps {
  initialProfiles?: ProfileType[];
}

const HomePage = ({ initialProfiles }: HomePageProps) => {
  const { data: queryProfiles } = useAllProfiles(initialProfiles);
  const allProfiles = queryProfiles || initialProfiles || [];
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featuredIds = ["1", "5", "7", "9"];
  const visibleProfiles = allProfiles.slice(0, visibleCount);
  const hasMore = visibleCount < allProfiles.length;
  const isInitialLoading = allProfiles.length === 0;

  return (
    <div className="pt-20 lg:pt-6">
      <div className="container mx-auto px-2 lg:px-4">
        {/* H1 above the fold — critical for SEO */}
        <div className="mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">
            Verified Escorts in Uganda
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse authentic companion profiles from Kampala, Entebbe, Jinja, Mbarara and more.
          </p>
          {/* City links — internal linking for SEO */}
          <nav aria-label="Browse by city" className="flex flex-wrap gap-2 mt-3">
            {cities.map((c) => (
              <Link
                key={c.name}
                href={c.path}
                className="text-xs bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-1.5 rounded-full font-medium transition-colors shadow-sm shadow-primary/20"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <ProfileGrid
            profiles={visibleProfiles}
            title="🔥 Top Profiles"
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
      </div>

      {/* SEO content below profiles */}
      <div className="container mx-auto px-2 lg:px-4 mt-12 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Uganda's Premier Escort Directory
          </h2>
          <h3 className="text-lg lg:text-xl text-pink-400 mb-4">
            Verified Companion Profiles Across Kampala, Entebbe, Jinja &amp; More
          </h3>
          <div className="max-w-4xl mx-auto text-muted-foreground space-y-3">
            <div className="text-lg">
              Browse verified companion profiles from across Uganda's major cities. Every profile on our platform is reviewed for authenticity so you can connect with confidence.
            </div>
            <div>
              Whether you're in{" "}
              <Link href="/location/kampala" className="text-primary hover:underline font-semibold">Kampala</Link>,{" "}
              <Link href="/location/entebbe" className="text-primary hover:underline font-semibold">Entebbe</Link>,{" "}
              <Link href="/location/jinja" className="text-primary hover:underline font-semibold">Jinja</Link>, or{" "}
              <Link href="/location/mbarara" className="text-primary hover:underline font-semibold">Mbarara</Link>,
              our directory gives you access to professional companions for events, social occasions, and more.
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">🏆 Uganda's #1 Directory</h3>
            <p className="text-sm text-muted-foreground">The most trusted and comprehensive companion directory in Uganda, with profiles from all major cities.</p>
          </div>
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">✅ Verified Profiles</h3>
            <p className="text-sm text-muted-foreground">All profiles go through a verification process to ensure authenticity and quality for your peace of mind.</p>
          </div>
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">🌍 Nationwide Coverage</h3>
            <div className="text-sm text-muted-foreground">
              Find companions in{" "}
              <Link href="/location/kampala" className="text-primary hover:underline">Kampala</Link>,{" "}
              <Link href="/location/entebbe" className="text-primary hover:underline">Entebbe</Link>,{" "}
              <Link href="/location/jinja" className="text-primary hover:underline">Jinja</Link>,{" "}
              <Link href="/location/mbarara" className="text-primary hover:underline">Mbarara</Link> and{" "}
              <Link href="/location/gulu" className="text-primary hover:underline">Gulu</Link>.
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-4">What We Offer</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Premium Companion Profiles</h4>
                <p className="text-muted-foreground text-sm">Access professional companions from across Uganda, available for social events, travel, and more.</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Safe &amp; Verified Listings</h4>
                <p className="text-muted-foreground text-sm">Every listing is reviewed before going live, so you can browse knowing the profiles you see are genuine.</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">City-by-City Search</h4>
                <div className="text-muted-foreground text-sm">
                  Filter by location — find companions in{" "}
                  <Link href="/location/kampala" className="text-primary hover:underline">Kampala</Link>,{" "}
                  <Link href="/location/entebbe" className="text-primary hover:underline">Entebbe</Link>,{" "}
                  <Link href="/location/jinja" className="text-primary hover:underline">Jinja</Link> and more.
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Available 24/7</h4>
                <p className="text-muted-foreground text-sm">Browse profiles any time of day. Many companions are available around the clock for bookings and inquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
