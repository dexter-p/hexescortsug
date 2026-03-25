import HomePage from "@/screens/HomePage";
import { fetchAllProfiles } from "@/data/allProfiles";

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Generate a fresh seed for every request to ensure a new shuffle on refresh
  const seed = Math.random().toString(36).substring(2, 10);
  
  const rawProfiles = await fetchAllProfiles(seed);
  return <HomePage initialProfiles={rawProfiles} shuffleSeed={seed} />;
}
