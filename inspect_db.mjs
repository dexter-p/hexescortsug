const SUPABASE_URL = 'https://zdiosdkoxcimlovewroz.supabase.co';
const ANON_KEY = 'sb_publishable_pg7b6mpjYgY0K1a1gjFP9w_tUclvTut';

async function check() {
  console.log('Checking database content...');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?limit=1`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data.length > 0) {
      console.log('Sample profile found:');
      console.log(`ID: ${data[0].id}`);
      console.log(`Profile Image: ${data[0].profile_image}`);
      
      const img = data[0].profile_image;
      if (img && img.startsWith('http')) {
        console.log('Database stores FULL URLs. The proxy should work if configured correctly.');
      } else {
        console.log('Database stores RELATIVE paths.');
      }
    } else {
      console.log('No profiles found.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

check();
