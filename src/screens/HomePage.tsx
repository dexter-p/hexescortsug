"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileGrid } from "@/components/profiles/ProfileGrid";
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allProfiles = initialProfiles || [];
  const featuredIds = allProfiles.slice(0, 4).map(p => p.id);
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
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-full font-semibold shadow-[0_0_22px_6px_rgba(235,0,115,0.6)] hover:shadow-[0_0_32px_10px_rgba(235,0,115,0.8)] transition-all duration-300 animate-pulse"
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
            <h3 className="text-xl font-bold text-primary mb-4">Why Choose Hex Escorts Uganda?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Independent & Verified Companions</h4>
                <p className="text-muted-foreground text-sm">We provide a premium directory for independent escorts and call girls across Uganda. Our platform is built on trust, with every profile manually verified to ensure you are meeting genuine, beautiful companions in your area.</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Luxury & Discretion</h4>
                <p className="text-muted-foreground text-sm">Whether you are looking for a dinner date in Kololo or a weekend companion in Entebbe, our girls offer the highest level of professionalism and discretion. Hex Escorts is the preferred choice for high-class erotics in Kampala.</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Explore Uganda's Nightlife</h4>
                <div className="text-muted-foreground text-sm">
                  From the vibrant bars of Kabalagala to the luxury hotels in Nakasero, our escorts know the best spots in the city. Find your perfect match in 
                  <Link href="/location/kampala" className="text-primary hover:underline ml-1">Kampala</Link>, 
                  <Link href="/location/jinja" className="text-primary hover:underline ml-1">Jinja</Link>, or 
                  <Link href="/location/gulu" className="text-primary hover:underline ml-1">Gulu</Link>.
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Available for Bookings 24/7</h4>
                <p className="text-muted-foreground text-sm">Our directory is updated daily with fresh profiles of sexy girls for hookups and long-term companionship. Contact them directly via WhatsApp or Phone for immediate bookings in Kampala and beyond.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-widest">Premium Uganda Call Girls & Hookups</h2>
          <div className="max-w-3xl mx-auto text-gray-500 text-xs leading-relaxed">
            Hex Escorts UG is the leading independent escort directory in Uganda, serving Kampala, Entebbe, Jinja, MBale, and Mbarara. We feature only the most beautiful and verified sexy girls ready for companionship, dating, and erotic services. Our mission is to connect you with the best independent call girls in Uganda with 100% discretion and safety. Explore our profiles today and find the hottest girls to fuck in Uganda or simply beautiful companions for your social events. All profiles are genuine and reviewed by our team.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
