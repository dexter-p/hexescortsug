const SUPABASE_URL = 'https://dkyikirsvpauhbexbhvu.supabase.co';
const ANON_KEY = 'sb_publishable_NIsgsCFGKiauX5ekp9qJeQ_rfoT4Bkm';
async function test() {
  const res = await fetch(SUPABASE_URL + '/rest/v1/profiles?select=*', {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`
    }
  });
  const data = await res.json();
  console.log('Status HTTP:', res.status);
  console.log('Data length:', data.length);
}
test();
