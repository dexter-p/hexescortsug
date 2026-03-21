import HomePage from "@/screens/HomePage";
import { fetchAllProfiles } from "@/data/allProfiles";

export default async function Page() {
  const initialProfiles = await fetchAllProfiles();
  return <HomePage initialProfiles={initialProfiles} />;
}
