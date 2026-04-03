const SUPABASE_URL = 'https://zdiosdkovxcimlovewroz.supabase.co';
const ANON_KEY = 'sb_publishable_pg7b6mpjYgY0K1a1gjFP9w_tUclvTut';

async function verify() {
  console.log('Verifying data in the NEW project (zdiosdkov)...');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=count`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Range-Unit': 'items',
        'Range': '0-0',
        'Prefer': 'count=exact'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const countHeader = res.headers.get('content-range');
    const total = countHeader ? countHeader.split('/')[1] : '0';
    
    console.log(`Successfully connected!`);
    console.log(`Found ${total} profiles in the database.`);
    
    if (parseInt(total) === 0) {
      console.warn('\nWARNING: The "profiles" table is EMPTY. You need to migrate your data from the old project.');
    } else {
      console.log('\nSUCCESS: Your data is already in the new project! You are safe to use this one.');
    }

    // Now check for buckets
    console.log('\nChecking for storage buckets...');
    const storageRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
      }
    });
    
    if (storageRes.ok) {
        const buckets = await storageRes.json();
        const hasBucket = buckets.some(b => b.name === 'profile-images');
        if (hasBucket) {
            console.log('Found "profile-images" bucket.');
        } else {
            console.warn('WARNING: "profile-images" bucket NOT found in storage. You must create it and set it to public.');
        }
    } else {
        console.warn('Could not list buckets (this is normal for anon keys if RLS is strict).');
    }

  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}

verify();
