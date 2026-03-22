import HomePage from "@/screens/HomePage";
import { fetchAllProfiles } from "@/data/allProfiles";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const rawProfiles = await fetchAllProfiles();
  const initialProfiles = [...rawProfiles];
  for (let i = initialProfiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [initialProfiles[i], initialProfiles[j]] = [initialProfiles[j], initialProfiles[i]];
  }
  return <HomePage initialProfiles={initialProfiles} />;
}
