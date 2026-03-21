import ProfileDetailPageClient from "@/screens/ProfileDetailPage";
import { fetchAllProfiles } from "@/data/allProfiles";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  
  const profiles = await fetchAllProfiles();
  const profile = profiles.find(p => p.id === id) || profiles.find(p => p.id.includes(id));

  if (!profile) {
    return { title: 'Profile Not Found | Escorts UG' };
  }

  return {
    title: `${profile.name} - Verified Escort in ${profile.location}`,
    description: `Book ${profile.name}, a verified companion located in ${profile.location}, Uganda. Browse ${profile.name}'s pictures and services on Escorts UG.`,
    openGraph: {
      title: `${profile.name} - Verified Escort in ${profile.location}`,
      description: `Book ${profile.name}, a verified companion located in ${profile.location}.`,
      images: [profile.profileImage],
    },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  
  const profiles = await fetchAllProfiles();
  const profile = profiles.find(p => p.id === id) || profiles.find(p => p.id.includes(id));

  const jsonLd = profile ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${profile.name} - Escort Services in ${profile.location}`,
    "provider": {
      "@type": "Person",
      "name": profile.name,
      "image": profile.profileImage,
    },
    "areaServed": {
      "@type": "City",
      "name": profile.location,
      "addressCountry": "UG"
    },
    "description": profile.description || profile.shortBio,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProfileDetailPageClient profileId={id} initialProfile={profile} />
    </>
  );
}
