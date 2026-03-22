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

export default async function Page({ params }: Props) {
  const { slug } = params;
  const city = slug?.[0];
  const suburb = slug?.[1];
  return <LocationPageClient cityParam={city} suburbParam={suburb} />;
}
