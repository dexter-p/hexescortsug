import LocationPageClient from "@/screens/LocationPage";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const city = slug?.[0];
  
  const locationName = city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : 'Uganda';
  
  return {
    title: `Verified Sexy Escorts in ${locationName} - Hot Girls & Companions | Hex Escorts UG`,
    description: `Browse verified sexy escorts, hot girls, and erotics available in ${locationName}, Uganda. Discover genuine companion profiles and premium services on Hex Escorts UG.`,
    keywords: `escorts ${locationName}, sexy girls ${locationName}, hot girls Uganda, ${locationName} erotics, hex escorts, companions ${locationName}`,
    openGraph: {
      title: `Escorts in ${locationName} - Verified Sexy Companions`,
      description: `Browse verified sexy escorts and hot girls available in ${locationName}, Uganda. Browse Hex Escorts UG.`
    }
  }
}

import { fetchAllProfiles } from "@/data/allProfiles";
import { headers } from "next/headers";

export default async function Page({ params }: Props) {
  const { slug } = params;
  const city = slug?.[0];
  const suburb = slug?.[1];

  const rawProfiles = await fetchAllProfiles();
  const initialProfiles = [...rawProfiles];

  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);
  
  let seed = headersList.get('x-shuffle-seed');
  if (isBot) {
    seed = `${new Date().toDateString()}`;
  } else if (!seed) {
    seed = `${new Date().toDateString()}-${new Date().getHours()}`; // Fallback hourly seed
  }
  const createSeededRand = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    return () => {
      h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
      h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
      h = (h ^ (h >>> 16)) >>> 0;
      return h / 4294967296;
    };
  };
  const rand = createSeededRand(seed);

  for (let i = initialProfiles.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [initialProfiles[i], initialProfiles[j]] = [initialProfiles[j], initialProfiles[i]];
  }

  return <LocationPageClient cityParam={city} suburbParam={suburb} initialProfiles={initialProfiles} />;
}
