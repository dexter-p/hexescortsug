"use client";

import { ProfileGrid } from "@/components/profiles/ProfileGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { useState, useEffect } from "react";
import { Menu, ChevronDown, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileType } from "@/types/profile";

const cityMeta: Record<string, { title: string; description: string; heading: string; body: string }> = {
  kampala: {
    title: "Kampala Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Kampala, Uganda. Browse authentic profiles from Nakasero, Kololo, Bugolobi and all major Kampala areas.",
    heading: "Escorts in Kampala",
    body: "Kampala is the vibrant capital of Uganda and our premier location for connecting with verified, high-class companions. Whether you are traveling for business, staying in upscale neighborhoods like Kololo, Nakasero, or Bugolobi, or experiencing the bustling nightlife of the city centre, our diverse directory of Kampala escorts offers the perfect match for your specific desires. From elegant dinner dates and corporate event companions to private, discreet encounters, the companions listed on Escorts UG are thoroughly vetted for authenticity. Kampala's fast-paced lifestyle demands flexible and professional companionship. Our platform features local beauties, university students, and professional models who know the city intimately. By browsing our verified profiles, you gain access to high-quality photos, detailed service lists, and genuine availability. We prioritize your privacy and safety, ensuring that every interaction is smooth and confidential. Choose from a variety of categories, including VIP companions, GFE (Girlfriend Experience) specialists, and travel companions ready to accompany you to luxury hotels or private residences across the metropolitan area. If you are looking for an unforgettable experience in Uganda's heartbeat, you have found the definitive directory. Filter by your preferences to find your ideal match today and discover the best of what Kampala has to offer with an intelligent and discreet companion by your side.",
  },
  entebbe: {
    title: "Entebbe Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Entebbe, Uganda. Browse authentic companion profiles near Entebbe International Airport and lakeside areas.",
    heading: "Escorts in Entebbe",
    body: "Entebbe is renowned for its serene lakeside environment, luxurious resorts, and proximity to the Entebbe International Airport, making it a prime hub for traveling professionals, tourists, and expatriates. Our exclusive directory of Entebbe escorts provides you with access to verified, sophisticated companions perfectly suited for the relaxed yet upscale atmosphere of this beautiful peninsula. Whether you require a discreet companion for a relaxing weekend getaway at a Lake Victoria resort, a beautiful date for a sunset cruise, or unwinding after a long corporate flight, our profiles feature the most reliable and stunning companions in the area. Each profile is rigorously reviewed to ensure 100% authenticity, giving you ultimate peace of mind. Entebbe companions offer a wide variety of services tailored to your needs, from casual meetups to extensive overnight bookings at leading hotels. Skip the uncertainty of unverified classifieds and use our filtered search to find your perfect match. With Escorts UG, your privacy is safeguarded, allowing you to focus on enjoying unparalleled companionship in Uganda's most relaxing city.",
  },
  jinja: {
    title: "Jinja Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Jinja, the adventure capital of Uganda. Browse authentic companion profiles near the Nile source.",
    heading: "Escorts in Jinja",
    body: "Welcome to Jinja, the undisputed adventure capital of East Africa and the historic source of the River Nile. Whether you are visiting for thrilling white-water rafting, a scenic corporate retreat, or simply looking to escape the hustle of the capital, our premium directory of Jinja escorts is here to elevate your experience. Jinja boasts a vibrant, growing community of beautiful, intelligent, and verified companions ready to help you unwind after a long day of adventure. Our platform connects you with local companions, touring models, and discreet professionals who understand the unique dynamic of this tourist hotspot. From sharing a quiet drink overlooking the Nile to engaging in a passionate, private encounter in one of Jinja's beautiful boutique lodges, our verified profiles ensure you meet exactly who you see. We enforce strict verification standards so your stay in Jinja is secure, private, and immensely satisfying. Browse through comprehensive galleries, check exact service offerings, and confidently arrange your perfect date in Uganda's most scenic city.",
  },
  mbarara: {
    title: "Mbarara Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Mbarara, western Uganda. Browse authentic companion profiles in this growing city.",
    heading: "Escorts in Mbarara",
    body: "Mbarara is the fastest-growing city in Western Uganda, a bustling center of commerce, agriculture, and hospitality. As the city expands, so does the demand for premium, private companionship. Our definitive directory of Mbarara escorts provides residents and visiting businessmen with direct access to the most beautiful and verified companions in the western region. Avoid the stress of unreliable classifieds and browse a curated selection of genuine profiles. Whether you are attending a conference, managing regional business, or simply enjoying the local hospitality, an elegant companion can transform your downtime into an unforgettable experience. The companions featured on Escorts UG in Mbarara cater to a variety of sophisticated tastes, offering everything from standard discreet meetups to extensive weekend arrangements. Every escort undergoes our verification process, ensuring that their photos and descriptions are entirely accurate. Explore our Mbarara listings to find stunning local beauties who provide top-tier companionship, absolute discretion, and pure satisfaction in the heart of Western Uganda.",
  },
  gulu: {
    title: "Gulu Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Gulu, northern Uganda. Browse authentic companion profiles.",
    heading: "Escorts in Gulu",
    body: "Gulu has transformed into the major economic and social hub of Northern Uganda, attracting NGO workers, business executives, and travelers from across the globe. To meet the needs of this diverse and dynamic population, Escorts UG offers a trusted directory of verified Gulu escorts. Our platform brings safety, privacy, and absolute reliability to finding a companion in the north. Whether you're seeking a gorgeous local to guide you through the city's nightlife, or a discreet partner to help you unwind in your hotel room after a demanding week of work, our verified profiles are the standard for quality. We understand that privacy is paramount, especially for visiting professionals, which is why our service emphasizes 100% discretion and authentic representation. Review detailed biographies, high-resolution galleries, and explicit service lists to make an informed choice. Connect directly with the finest companions in Northern Uganda and experience a new level of passion and professionalism in Gulu.",
  },
  "fort-portal": {
    title: "Fort Portal Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Fort Portal, western Uganda. Browse authentic companion profiles near the Rwenzori Mountains.",
    heading: "Escorts in Fort Portal",
    body: "Fort Portal, nestled at the foot of the Rwenzori Mountains and surrounded by stunning crater lakes, is one of Uganda's most picturesque cities. Whether you are visiting for eco-tourism, a business trip, or a mountain retreat, Escorts UG connects you with verified, discreet companions in this serene western Ugandan city. Our Fort Portal directory features elegant, professional escorts who understand the unique pace of this beautiful destination. From quiet evenings by the crater lakes to sophisticated dinner companionship in the city's growing hospitality scene, our listed companions deliver premium, personalized experiences. Browse verified profiles with genuine photos and detailed bios to find your perfect match in the Pearl of the Mountains.",
  },
  mbale: {
    title: "Mbale Escorts – Verified Profiles | Escorts UG",
    description: "Find verified escorts in Mbale, eastern Uganda. Browse authentic companion profiles near Mount Elgon.",
    heading: "Escorts in Mbale",
    body: "Mbale, sitting at the gateway to the magnificent Mount Elgon National Park, is the commercial heart of eastern Uganda. As the city grows and attracts increasing business investment, so does the demand for quality, discreet companionship. Escorts UG's Mbale directory provides residents and visiting professionals with direct access to beautiful, verified companions who cater to sophisticated tastes. Whether you need an engaging companion for a corporate dinner, a relaxing partner after a long trek on Mount Elgon, or a discreet meetup in the city centre, our platform ensures you connect with genuine, authentic escorts. Every profile is reviewed for accuracy, giving you complete confidence in who you contact. Explore verified Mbale listings and find your perfect companion in eastern Uganda's most dynamic city.",
  },
};

interface LocationPageProps {
  cityParam?: string;
  suburbParam?: string;
  initialProfiles?: ProfileType[];
}

const LocationPage = ({ cityParam, suburbParam, initialProfiles }: LocationPageProps = {}) => {
  const city = cityParam;
  const suburb = suburbParam;
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [selectedCategory, setSelectedCategory] = useState("Escorts");

  const meta = city ? cityMeta[city.toLowerCase()] : null;
  
  const getLocationTitle = () => {
    if (!city) return "All Locations";
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    if (!suburb) return cityName;
    const suburbName = suburb.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `${suburbName}, ${cityName}`;
  };
  
  const allProfiles = initialProfiles || [];
  const getLocationProfiles = () => {
    if (!city) return allProfiles;

    // Hardcoded array of common suburbs ensuring all are included in district searches
    const kampalaSuburbs = [
      "banda", "bugolobi", "bukesa", "bukoto", "bunamwaya", "bunga", 
      "busega", "buwate", "buziga", "bwaise", "central", "ggaba", "kabalagala", "kabowa", 
      "kampala town", "kamwokya", "kansanga", "kanyanya", "kasubi", "katooke", 
      "kawempe", "kazo", "kibuli", "kireka", "kirinnya", "kisaasi", "kisugu", 
      "kitintale", "kiwatule", "kololo", "komamboga", "kulambiro", "kyaliwajjala", 
      "kyambogo", "kyanja", "kyebando", "lubaga", "lugala", "lugogo", "lungujja", 
      "luzira", "makerere", "makindye", "masajja", "masanafu", "mawanda road", 
      "mbuya", "mengo", "mpererwe", "mulago", "munyonyo", "mutundwe", "mutungo", 
      "muyenga", "naalya", "nabulagala", "nabweru", "naguru", "najjanankumbi", 
      "najjera", "nakasero", "nakawa", "nakulabye", "namasuba", "namirembe", 
      "namungoona", "namuwongo", "nateete", "nkuba", "nsambya", "ntinda", 
      "rubaga", "salaama rd", "sir apollo kagwa", "wandegeya"
    ];

    return allProfiles.filter(profile => {
      const profileLoc = profile.location.toLowerCase();
      const targetCity = city.toLowerCase();

      // If they clicked a specific suburb (e.g. Bugolobi only)
      if (suburb) {
        const targetSuburb = suburb.toLowerCase().replace(/-/g, ' ');
        return profileLoc === targetSuburb || profileLoc.includes(targetSuburb);
      }

      // If they clicked "Kampala", return "Kampala" OR any of the 70+ Kampala suburbs
      if (targetCity === 'kampala') {
        const isKampala = profileLoc === 'kampala' || profileLoc.includes('kampala');
        const isSuburb = kampalaSuburbs.some(sub => profileLoc.includes(sub));
        return isKampala || isSuburb;
      }

      // Flexible fallback for all other districts
      return profileLoc === targetCity || profileLoc.includes(targetCity);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setShowSidebar(true);
      else setShowSidebar(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const locationProfiles = getLocationProfiles();
  const featuredIds = locationProfiles.slice(0, 2).map(p => p.id);

  const categories = [
    "Escorts"
  ];

  const NoEscortsMessage = () => (
    <div className="text-center py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/8406e35d-f51f-416d-92d1-35e8afd6657c.png"
              alt="Beautiful escort"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/f42f3c58-40f8-4d5e-8a35-2a1be91bdd32.png"
              alt="Beautiful escort"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4">
          There are no escorts in this area at the moment
        </h2>
        <p className="text-sm lg:text-base text-muted-foreground mb-6">
          We're constantly expanding our network. Check back soon or explore other locations.
        </p>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/" className="inline-block">
            Browse All Locations
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed top navigation bar for mobile */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-black py-2 px-3 flex justify-between items-center lg:hidden">
        <Logo size={32} textSize="xl" />
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
            <Link href="/become-escort">
              <UserPlus className="h-3 w-3 mr-1" />
              Become an escort
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-white h-7 w-7"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="nav-menu px-1 py-2 mt-10 lg:mt-0 sticky top-10 lg:top-0 z-20 overflow-x-auto no-scrollbar">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {categories.map((category) => (
              <button 
                key={category}
                className={`nav-item text-xs sm:text-sm ${selectedCategory === category ? 'active' : ''} whitespace-nowrap`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Become an escort button for desktop */}
          <div className="hidden lg:block">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/become-escort">
                <UserPlus className="h-4 w-4 mr-2" />
                Become an escort
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar - Shown on larger screens or when toggled */}
        <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed top-0 left-0 h-full w-64 bg-sidebar pt-12 lg:pt-4 z-20 transition-transform duration-300 overflow-y-auto`}>
          <div className="p-3 lg:p-4">
            <div className="hidden lg:block mb-6">
              <Logo textSize="xl" />
            </div>
            
            <h3 className="text-base lg:text-lg font-bold mb-2 text-white">Find your match</h3>
            <ul className="space-y-1 text-sm">
              {[
                "Kampala", "Entebbe", "Jinja", "Mbarara", "Gulu", 
                "Fort Portal", "Mbale", "Masaka", "Arua", "Mityana",
                "Hoima", "Kabale", "Soroti", "Moroto", "Kasese"
              ].map((location) => (
                <li key={location} className="border-b border-gray-700 pb-1">
                  {location === "Kampala" ? (
                    <div>
                      <button className="flex items-center w-full text-white hover:text-red-400">
                        <ChevronDown className="mr-2 h-4 w-4" />
                        <span className={city?.toLowerCase() === location.toLowerCase() ? "text-red-500" : "text-white"}>
                          {location}
                        </span>
                      </button>
                      <ul className="ml-6 mt-1 space-y-1 mb-2">
                        {[
                          "Banda", "Bugolobi", "Bukesa", "Bukoto", "Bunamwaya", "Bunga",
                          "Busega", "Buwate", "Buziga", "Bwaise", "Central"
                        ].map((sub) => (
                          <li key={sub}>
                            <Link href={`/location/kampala/${sub.toLowerCase()}`} className="text-sm text-gray-300 hover:text-red-400">
                              {sub}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link href={`/location/kampala`} className="text-sm text-primary hover:underline">
                            See all areas...
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link 
                      href={`/location/${location.toLowerCase()}`} 
                      className={`flex items-center ${city?.toLowerCase() === location.toLowerCase() ? "text-red-500" : "text-white"} hover:text-red-400`}
                    >
                      {location}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 pl-0 lg:pl-64 pt-1 pb-4 lg:pb-6">
          <div className="container mx-auto px-2 lg:px-4">
            <div className="mb-4 lg:mb-6">
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 text-primary">
                {meta ? meta.heading : `Escorts in ${getLocationTitle()}`}
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                {locationProfiles.length > 0 
                  ? `Discover ${locationProfiles.length} verified profiles in ${getLocationTitle()}`
                  : `Browse available escorts in ${getLocationTitle()}`
                }
              </p>
            </div>

            {locationProfiles.length > 0 ? (
              <ProfileGrid profiles={locationProfiles} featuredIds={featuredIds} />
            ) : (
              <NoEscortsMessage />
            )}

            {/* City SEO footer – unique content per city */}
            {meta && (
              <div className="mt-10 mb-4 border-t border-border pt-6">
                <h2 className="text-lg font-bold text-primary mb-3">
                  About Escorts in {getLocationTitle()}
                </h2>
                <p className="text-sm text-muted-foreground max-w-3xl mb-4">{meta.body}</p>
                <p className="text-sm text-muted-foreground max-w-3xl">
                  All profiles on Escorts UG are reviewed for authenticity before going live. Browse other cities:{" "}
                  {["Kampala","Entebbe","Jinja","Mbarara","Gulu"].filter(c => c.toLowerCase() !== city?.toLowerCase()).map((c, i, arr) => (
                    <span key={c}>
                      <Link href={`/location/${c.toLowerCase()}`} className="text-primary hover:underline">{c}</Link>
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {showSidebar && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default LocationPage;
