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
  const [isMounted, setIsMounted] = useState(false);
  const { data: queryProfiles } = useAllProfiles(initialProfiles);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allProfiles = (isMounted && queryProfiles?.length) ? queryProfiles : (initialProfiles || []);
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
            Escorts in Uganda – Verified &amp; Real Profiles
          </h2>
          <h3 className="text-lg lg:text-xl text-pink-400 mb-4">
            #1 Escort Directory in Uganda | Kampala, Entebbe, Jinja, Mbarara &amp; More
          </h3>
          <div className="max-w-4xl mx-auto text-muted-foreground space-y-3">
            <p className="text-base">
              Welcome to <strong className="text-primary">Escorts UG</strong> — Uganda's number one verified escort directory.
              Whether you are searching for <strong>escorts in Uganda</strong>, <strong>UG escorts</strong>,{" "}
              <strong>call girls in Kampala</strong>, or simply <strong>girls in Uganda</strong> to meet and spend time with,
              you have found the right place. Every profile on our platform is manually reviewed for authenticity,
              so you always connect with real people.
            </p>
            <p className="text-sm">
              Our directory covers all major Uganda cities:{" "}
              <Link href="/location/kampala" className="text-primary hover:underline font-semibold">Kampala escorts</Link>,{" "}
              <Link href="/location/entebbe" className="text-primary hover:underline font-semibold">Entebbe escorts</Link>,{" "}
              <Link href="/location/jinja" className="text-primary hover:underline font-semibold">Jinja escorts</Link>,{" "}
              <Link href="/location/mbarara" className="text-primary hover:underline font-semibold">Mbarara escorts</Link>,{" "}
              <Link href="/location/gulu" className="text-primary hover:underline font-semibold">Gulu escorts</Link>,{" "}
              <Link href="/location/fort-portal" className="text-primary hover:underline font-semibold">Fort Portal escorts</Link>,{" "}
              and <Link href="/location/mbale" className="text-primary hover:underline font-semibold">Mbale escorts</Link>.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">🏆 Uganda's #1 Escort Directory</h3>
            <p className="text-sm text-muted-foreground">
              The most trusted escort directory in Uganda. Find <strong>escorts in Uganda</strong>,{" "}
              <strong>UG escorts</strong>, and <strong>companions in Kampala</strong> — all verified and real.
            </p>
          </div>
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">✅ Verified, Real Profiles</h3>
            <p className="text-sm text-muted-foreground">
              All escorts listed here are reviewed for authenticity. No fake profiles — only genuine{" "}
              <strong>girls in Uganda</strong> looking to meet you.
            </p>
          </div>
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">🌍 All Uganda Locations</h3>
            <div className="text-sm text-muted-foreground">
              <strong>Escorts in Uganda</strong> from{" "}
              <Link href="/location/kampala" className="text-primary hover:underline">Kampala</Link>,{" "}
              <Link href="/location/entebbe" className="text-primary hover:underline">Entebbe</Link>,{" "}
              <Link href="/location/jinja" className="text-primary hover:underline">Jinja</Link>,{" "}
              <Link href="/location/mbarara" className="text-primary hover:underline">Mbarara</Link> and{" "}
              <Link href="/location/gulu" className="text-primary hover:underline">Gulu</Link>.
            </div>
          </div>
        </div>

        {/* Keyword-rich SEO paragraph — targets all the missing search terms */}
        <div className="max-w-4xl mx-auto bg-muted/20 border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-primary mb-3">Find Escorts &amp; Girls in Uganda</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Looking for <strong>escorts in Uganda</strong>? Escorts UG is the most comprehensive and
              trusted directory for finding <strong>verified escorts in Uganda</strong>. Unlike other sites,
              every profile is reviewed before going live. Whether you want{" "}
              <strong>Kampala escorts</strong>, <strong>Entebbe escorts</strong>, or escorts anywhere across Uganda,
              browse real profiles with genuine photos right here.
            </p>
            <p>
              We are Uganda's answer to finding <strong>UG escorts</strong> safely. Our platform is the best
              alternative to searching random classifieds for <strong>call girls in Uganda</strong> or{" "}
              <strong>girls in Uganda</strong> — you get clean, verified, authentic profiles in one place.
              Find your match for a date, companionship, or social event across all Uganda cities.
            </p>
            <p>
              Escorts UG is the most complete <strong>escort directory in Uganda</strong> — covering Kampala,
              Entebbe, Jinja, Mbarara, Gulu, Fort Portal and Mbale. We are the go-to platform for anyone
              looking to meet <strong>hot girls in Uganda</strong>, book a companion, or find{" "}
              <strong>independent escorts in Uganda</strong>. Browse now — it's free, discreet, and safe.
            </p>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-4">Why Choose Escorts UG?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Premium Escort Profiles</h4>
                <p className="text-muted-foreground text-sm">
                  Access professional <strong>escorts across Uganda</strong>, available for social events, travel companionship, and more.
                  Find <strong>Kampala escorts</strong>, <strong>Entebbe escorts</strong> and more.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Safe &amp; Verified Listings</h4>
                <p className="text-muted-foreground text-sm">
                  Every listing is reviewed before going live. Whether you're searching for{" "}
                  <strong>escorts in Uganda</strong> or <strong>call girls in Kampala</strong>,
                  all profiles are genuine and verified.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">City-by-City Escort Search</h4>
                <div className="text-muted-foreground text-sm">
                  Find <strong>escorts in Uganda</strong> by city —{" "}
                  <Link href="/location/kampala" className="text-primary hover:underline">Kampala</Link>,{" "}
                  <Link href="/location/entebbe" className="text-primary hover:underline">Entebbe</Link>,{" "}
                  <Link href="/location/jinja" className="text-primary hover:underline">Jinja</Link>,{" "}
                  <Link href="/location/mbarara" className="text-primary hover:underline">Mbarara</Link> and more.
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Available 24/7 Across Uganda</h4>
                <p className="text-muted-foreground text-sm">
                  Browse <strong>UG escorts</strong> any time of day. Many companions across Uganda are available
                  around the clock for bookings and inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
