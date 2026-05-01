import LocationPageClient from "@/screens/LocationPage";
import { fetchProfilesByLocation } from "@/data/allProfiles";
import type { Metadata } from 'next';

// 3600 = 1 hour. This means Supabase is only hit ONCE per hour per location.
// Vercel's Edge Network serves all other traffic for free!
export const revalidate = 3600; 
export const dynamicParams = true;

type Props = {
  params: { location: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawLocation = params.location.replace(/-/g, ' ');
  const locationName = rawLocation.charAt(0).toUpperCase() + rawLocation.slice(1).toLowerCase();
  
  return {
    title: `${locationName} Escorts - #1 Verified Sexy Call Girls & Hookups`,
    description: `Looking for hot escorts in ${locationName}? Browse our exclusive selection of verified Ugandan call girls, VIP companions, and discreet hookups in ${locationName}.`,
    keywords: `escorts in ${locationName}, ${locationName} call girls, hookups ${locationName}, hot girls ${locationName}`,
    openGraph: {
      title: `Top Escorts & Call Girls in ${locationName}`,
      description: `Browse verified sexy escorts and hot girls available in ${locationName}, Uganda. 100% Real & Verified profiles.`,
      url: `https://www.hexescortsug.xyz/escorts-in/${params.location}`,
      siteName: 'Hex Escorts UG',
    },
    alternates: {
      canonical: `https://www.hexescortsug.xyz/escorts-in/${params.location}`,
    }
  }
}

export default async function EscortsInLocationPage({ params }: Props) {
  const { location } = params;
  const formattedLocation = location.replace(/-/g, ' ');
  const locationName = formattedLocation.charAt(0).toUpperCase() + formattedLocation.slice(1).toLowerCase();

  // Fetch only the specific profiles for this location (Cache-protected)
  const locationProfiles = await fetchProfilesByLocation(formattedLocation);

  // Fresh seed for client-side shuffling
  const seed = Math.random().toString(36).substring(2, 10);

  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Are the escorts in ${locationName} verified?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, all escorts listed on Hex Escorts UG for ${locationName} go through a strict verification process to ensure authenticity, safety, and a premium experience.`
        }
      },
      {
        "@type": "Question",
        "name": `How much do escorts cost in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Prices vary depending on the companion, duration, and specific services. You can view individual rates on each verified profile for escorts available in ${locationName}.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I book an outcall to my hotel in ${locationName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. Many of our high-class call girls in ${locationName} offer discreet outcall services to premium hotels, apartments, and private residences.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocationPageClient 
        cityParam={formattedLocation} 
        initialProfiles={locationProfiles} 
        shuffleSeed={seed} 
      />
    </>
  );
}
