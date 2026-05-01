"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, getMediaUrl, slugify } from "@/lib/utils";
import { ProfileType } from "@/types/profile";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePhoneHandler } from "@/hooks/use-phone-handler";

interface ProfileCardProps {
  profile: ProfileType;
  featured?: boolean;
  priority?: boolean;
}

export function ProfileCard({ profile, featured = false, priority = false }: ProfileCardProps) {
  const [showContact, setShowContact] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  const { handlePhoneClick } = usePhoneHandler();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use the phone number from the profile data
  const phoneNumber = profile.phone || "0706089641";
  // Convert to international format for WhatsApp: 07XXXXXXXX → 256XXXXXXXX
  const toWhatsAppNumber = (num: string) => {
    const cleaned = num.replace(/[\s\(\)\-+]/g, "");
    if (cleaned.startsWith("256")) return cleaned;
    if (cleaned.startsWith("0")) return "256" + cleaned.slice(1);
    return "256" + cleaned;
  };
  const waNumber = toWhatsAppNumber(profile.whatsapp || phoneNumber);

  // Stable badges based on data or deterministic ID-based logic
  const isPremium = profile.isPremium ?? (profile.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 3 === 0);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlePhoneClick(phoneNumber);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <Card className={cn(
          "overflow-hidden border-gray-800 h-full relative group",
          featured ? "border-pink-500/30" : "",
          "transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1"
        )}>
          <div className="relative aspect-[3/4] overflow-hidden">
            {/* Golden Crown Corner Sash - Elite Royal Design */}
            {profile.isPinned && (
              <div className="absolute top-0 left-0 z-20 overflow-hidden w-24 h-24 pointer-events-none select-none">
                <div className="absolute top-0 left-0 bg-gradient-to-br from-[#ffd700] via-[#fff1a8] to-[#b8860b] text-black w-32 py-1 text-center font-black text-[10px] tracking-[0.2em] transform -rotate-45 -translate-x-10 translate-y-4 shadow-[0_2px_10px_rgba(0,0,0,0.5)] border-b border-yellow-200/50 flex items-center justify-center gap-1.5 uppercase">
                   {/* Shine Sweep Animation */}
                   <div className="absolute inset-0 w-full h-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full" />
                   
                   <span className="text-xs">👑</span>
                   <span className="drop-shadow-sm">VIP</span>
                </div>
              </div>
            )}
            
            {/* PREMIUM Badge */}
            {isPremium && (
              <div className="absolute top-0 right-0 z-10">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black text-[8px] sm:text-[10px] py-0.5 px-2 rotate-45 translate-x-[20%] translate-y-[-30%] shadow-md">
                  PREMIUM
                </div>
              </div>
            )}
            
            <Link href={`/profile/${slugify(profile.name)}`} prefetch={false}>
              <div className="w-full h-full overflow-hidden">
                <Image 
                  src={getMediaUrl(profile.profileImage)} 
                  alt={`${profile.name} - verified sexy call girl and erotic companion in ${profile.location} - Hex Escorts UG`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={priority}
                  width={300}
                  height={400}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-pink-500 text-[9px] sm:text-[10px] font-bold">HEX ESCORTS UG</span>
              </div>
            </Link>
          
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-1 pb-1 pt-3 text-white">
              <h3 className="font-bold text-[10px] sm:text-xs text-center truncate leading-tight">{profile.name}</h3>
              <div className="flex items-center justify-center text-[8px] sm:text-[9px] text-gray-300 mt-0.5">
                <MapPin className="h-1.5 w-1.5 mr-0.5 shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Action buttons */}
        <div className="mt-1 w-full flex items-center gap-1">
          <Button 
            variant="default" 
            className="flex-1 min-w-0 bg-primary hover:bg-primary/90 text-white text-[8px] sm:text-[10px] h-5 sm:h-7 px-1 shadow-[0_0_8px_rgba(235,0,115,0.3)] transition-all duration-300"
            onMouseEnter={() => setShowContact(true)}
            onMouseLeave={() => setShowContact(false)}
            onClick={handleContactClick}
          >
            <span suppressHydrationWarning className="truncate block">
              {!isMounted ? "Contact" : (showContact ? phoneNumber : "Contact")}
            </span>
          </Button>
          <a 
            href={`whatsapp://send?phone=${waNumber}&text=${encodeURIComponent("Hi, i got your contact from https://www.hexescortsug.xyz")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-5 h-5 sm:w-7 sm:h-7 transition-colors shadow-sm overflow-hidden shrink-0"
            onClick={(e) => e.stopPropagation()}
            aria-label="Contact on WhatsApp"
          >
            <Image 
              src="/assets/whatsapp-icon.jpg" 
              alt="WhatsApp" 
              width={24} 
              height={24} 
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
