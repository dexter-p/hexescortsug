import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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

async function downloadMissing() {
  const { data: profiles } = await supabase.from('profiles').select('name, profile_image, images, videos').eq('is_archived', false);
  
  const localStorage = 'public/storage/profile-images';
  if (!fs.existsSync(localStorage)) fs.mkdirSync(localStorage, { recursive: true });
  
  const localFiles = new Set(fs.readdirSync(localStorage));
  
  console.log("Checking for missing files (Images + Videos)...");
  
  const toDownload = [];
  profiles.forEach(p => {
    const assets = [p.profile_image, ...(p.images || []), ...(p.videos || [])];
    assets.forEach(url => {
      if (!url) return;
      const fileName = url.split('/').pop().split('?')[0];
      if (!localFiles.has(fileName) && url.includes('supabase.co')) {
        toDownload.push({ url, fileName });
      }
    });
  });

  console.log(`Found ${toDownload.length} files to download.`);

  for (const item of toDownload) {
    try {
      const resp = await fetch(item.url);
      if (resp.ok) {
        const buffer = Buffer.from(await resp.arrayBuffer());
        fs.writeFileSync(path.join(localStorage, item.fileName), buffer);
        console.log(`✅ Downloaded: ${item.fileName}`);
      } else {
        console.error(`❌ Failed: ${item.fileName} (${resp.status})`);
      }
    } catch (e) {
      console.error(`🔥 Error: ${item.fileName}`, e.message);
    }
  }
  console.log("Done.");
}

downloadMissing();
