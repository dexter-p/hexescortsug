import LocationPageClient from "@/screens/LocationPage";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const city = slug?.[0];
  
  const locationName = city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : 'Uganda';
  
  return {
    title: `Escorts in ${locationName} - Verified Companions | Escorts UG`,
    description: `Browse verified escorts and companions available in ${locationName}, Uganda. Genuine, reviewed profiles.`,
    openGraph: {
      title: `Escorts in ${locationName} - Verified Companions`,
      description: `Browse verified escorts and companions available in ${locationName}, Uganda.`
    }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const city = slug?.[0];
  const suburb = slug?.[1];
  return <LocationPageClient cityParam={city} suburbParam={suburb} />;
}
