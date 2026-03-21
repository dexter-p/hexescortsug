import HomePage from "@/screens/HomePage";
import { fetchAllProfiles } from "@/data/allProfiles";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const initialProfiles = await fetchAllProfiles();
  return <HomePage initialProfiles={initialProfiles} />;
}
