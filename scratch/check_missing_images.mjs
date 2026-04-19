import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Manually read .env.local since dotenv is missing
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkImages() {
  const { data: profiles, error } = await supabase.from('profiles').select('name, profile_image, images').eq('is_archived', false);
  
  if (error) {
    console.error("Supabase Error:", error);
    return;
  }

  const localStorage = 'public/storage/profile-images';
  const localFiles = new Set(fs.existsSync(localStorage) ? fs.readdirSync(localStorage) : []);
  
  console.log(`Checking ${profiles.length} profiles...`);
  
  let missingCount = 0;
  profiles.forEach(p => {
    const images = [p.profile_image, ...(p.images || [])];
    images.forEach(img => {
      if (!img) return;
      // Get filename from URL
      const fileName = img.split('/').pop().split('?')[0]; // Remove query params
      if (!localFiles.has(fileName)) {
        console.log(`❌ Missing for ${p.name}: ${fileName}`);
        missingCount++;
      }
    });
  });
  
  console.log(`Total missing files: ${missingCount}`);
}

checkImages();
