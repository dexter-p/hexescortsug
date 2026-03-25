import LocationPageClient from "@/screens/LocationPage";
import type { Metadata } from 'next';
import { fetchAllProfiles } from "@/data/allProfiles";

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
    title: `${locationName} Escorts - Verified Sexy Call Girls & Companions | Hex Escorts UG`,
    description: `Browse verified sexy escorts, hot girls, and call girls available in ${locationName}, Uganda. Discover genuine hookups and premium companions on Hex Escorts UG.`,
    keywords: `escorts ${locationName}, call girls ${locationName}, sexy girls ${locationName}, hookups ${locationName}, hot girls ${locationName}, ${locationName} escorts, hex escorts`,
    openGraph: {
      title: `Escorts in ${locationName} - Verified Sexy Companions`,
      description: `Browse verified sexy escorts and hot girls available in ${locationName}, Uganda. Browse Hex Escorts UG.`
    }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const city = slug?.[0];
  const suburb = slug?.[1];

  // Fresh seed for every visit
  const seed = Math.random().toString(36).substring(2, 10);
  
  const rawProfiles = await fetchAllProfiles(seed);

  return <LocationPageClient cityParam={city} suburbParam={suburb} initialProfiles={rawProfiles} shuffleSeed={seed} />;
}
