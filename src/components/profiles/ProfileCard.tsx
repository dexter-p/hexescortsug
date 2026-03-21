"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProfileType } from "@/types/profile";
import { useState } from "react";
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
  const isMobile = useIsMobile();
  const { handlePhoneClick } = usePhoneHandler();
  
  // Use the phone number from the profile data
  const phoneNumber = profile.phone || "0706089641";
  
  // All profiles show VIP badge
  const isVip = true;
  
  // Determine premium deterministically from profile id (no flicker)
  const isPremium = profile.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 2 === 0;

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
            {/* VIP Badge */}
            {isVip && (
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10">
                <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-1 py-0.5 text-[8px] sm:text-[10px] md:text-xs font-bold rounded">
                  VIP
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
            
            <Link href={`/profile/${profile.id}`}>
              <div className="w-full h-full overflow-hidden">
                <Image 
                  src={profile.profileImage} 
                  alt={`${profile.name} - escort in ${profile.location}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={priority}
                  width={300}
                  height={400}
                />
              </div>
              
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                <span className="text-pink-500 text-xs sm:text-sm md:text-base font-bold">HEXDATE</span>
              </div>
            </Link>
          
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-1 sm:p-2 text-white">
              <div className="text-center">
                <h3 className="font-bold text-xs sm:text-sm truncate">{profile.name}</h3>
                
                <div className="flex items-center justify-center text-[10px] sm:text-xs text-gray-300 mt-0.5">
                  <MapPin className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5" />
                  <span className="truncate">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mt-1 sm:mt-2 w-full flex items-center gap-1.5 sm:gap-2">
          <Button 
            variant="default" 
            className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white text-[10px] sm:text-xs py-0.5 h-7 sm:h-9"
            onMouseEnter={() => setShowContact(true)}
            onMouseLeave={() => setShowContact(false)}
            onClick={handleContactClick}
          >
            {showContact ? phoneNumber : "Contact Me"}
          </Button>
          <a 
            href={`https://wa.me/${phoneNumber.replace(/[\s\(\)\-+]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-7 h-7 sm:w-9 sm:h-9 transition-colors shadow-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            aria-label="Contact on WhatsApp"
          >
            <Image 
              src="/assets/whatsapp-icon.jpg" 
              alt="WhatsApp" 
              width={36} 
              height={36} 
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
