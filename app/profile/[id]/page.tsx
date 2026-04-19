import ProfileDetailPageClient from "@/screens/ProfileDetailPage";
import { fetchAllProfiles, fetchProfileById } from "@/data/allProfiles";
import type { Metadata, ResolvingMetadata } from 'next';
import { slugify } from "@/lib/utils";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  
  const profile = await fetchProfileById(id);

  if (!profile) {
    return { title: 'Profile Not Found | Escorts UG' };
  }

  return {
    title: `${profile.name} - Verified Sexy Escort in ${profile.location} | Hex Escorts UG`,
    description: `Book ${profile.name}, a verified companion in ${profile.location}, Uganda. View pictures and services on Hex Escorts UG.`,
    keywords: `${profile.name}, escorts ${profile.location}, sexy girls ${profile.location}, hot girls Uganda, hex escorts, companions Uganda`,
    openGraph: {
      title: `${profile.name} - Verified Escort in ${profile.location}`,
      description: `Book ${profile.name}, a verified sexy companion located in ${profile.location}. Contact on Hex Escorts UG.`,
      images: [profile.profileImage],
    },
    alternates: {
      canonical: `/profile/${slugify(profile.name)}`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { id } = params;
  
  const profile = await fetchProfileById(id);

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
