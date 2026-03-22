import HomePage from "@/screens/HomePage";
import { fetchAllProfiles } from "@/data/allProfiles";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const rawProfiles = await fetchAllProfiles();
  const initialProfiles = [...rawProfiles];

  // Deterministic shuffle using an hourly seed to ensure SEO stability and prevent mobile double-shuffling.
  const d = new Date();
  const seed = `${d.toDateString()}-${d.getHours()}`;
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
