"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileDetail } from "@/components/profiles/ProfileDetail";
import { useAllProfiles } from "@/data/allProfiles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoList } from "@/components/videos/VideoList";
import { PhotoList } from "@/components/photos/PhotoList";
import { useEffect } from "react";
import { ProfileType } from "@/types/profile";

interface ProfileDetailPageProps {
  profileId: string;
  initialProfile?: ProfileType;
}

const ProfileDetailPage = ({ profileId, initialProfile }: ProfileDetailPageProps) => {
  const id = profileId;
  
  const { data: allProfiles = [], isLoading } = useAllProfiles();
  // Use initialProfile immediately (server-rendered data) while client query loads
  const profile = (allProfiles.length > 0 ? allProfiles.find(p => p.id === id) : undefined) ?? initialProfile;

  // Scroll to top when component mounts or profile ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // While loading, show skeleton to avoid premature 404
  if (isLoading && !profile) {
    return (
      <div className="lg:pl-64 relative">
        <div className="lg:hidden h-16"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
            <div className="h-64 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center lg:pl-72">
        <div className="lg:hidden h-16"></div>
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="mb-6">The profile you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    );
  }


  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: profile.name, text: `Check out ${profile.name} on Hex Escorts UG`, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="lg:pl-64 relative">
      <div className="lg:hidden h-16"></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to profiles
            </Link>
          </Button>
          
        </div>
        
        <ProfileDetail profile={profile} onShare={handleShare} />

        <div className="mt-8">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="gallery" className="flex-1">Gallery</TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="p-4">
              <PhotoList 
                profileId={profile.id} 
              />
            </TabsContent>

            <TabsContent value="videos" className="p-4">
              <VideoList 
                profileId={profile.id} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailPage;
