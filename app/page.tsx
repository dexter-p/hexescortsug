import HomePage from "@/screens/HomePage";
import { fetchAllProfiles } from "@/data/allProfiles";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const rawProfiles = await fetchAllProfiles();
  const initialProfiles = [...rawProfiles];

  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);
  
  // Use a stable daily seed for Googlebot/crawlers.
  // Otherwise, use the dynamically generated seed from middleware (which changes on F5 refresh).
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
  return <HomePage initialProfiles={initialProfiles} />;
}
