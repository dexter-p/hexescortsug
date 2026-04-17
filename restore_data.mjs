import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BACKUP_DIR = './backup';
const OLD_PROJECT_ID = 'dkyikirsvpauhbexbhvu';
const NEW_PROJECT_ID = 'lusvuwwlcdgowauvdpoh';

async function restoreProfiles() {
  console.log('Restoring profiles...');
  const profilesData = JSON.parse(fs.readFileSync(path.join(BACKUP_DIR, 'profiles.json'), 'utf8'));

  // Update URLs in profile data
  const updatedProfiles = profilesData.map(p => {
    const json = JSON.stringify(p);
    const updatedJson = json.split(OLD_PROJECT_ID).join(NEW_PROJECT_ID);
    return JSON.parse(updatedJson);
  });

  // Batch insert
  for (let i = 0; i < updatedProfiles.length; i += 20) {
    const batch = updatedProfiles.slice(i, i + 20);
    const { error } = await supabase.from('profiles').upsert(batch);
    if (error) {
      console.error('Error inserting profiles batch:', error);
    } else {
      console.log(`✅ Restored profiles batch ${i / 20 + 1}`);
    }
  }
}

async function uploadFile(bucket, localPath, fileName) {
    const fileBuffer = fs.readFileSync(localPath);
    const { error } = await supabase.storage.from(bucket).upload(fileName, fileBuffer, {
        upsert: true,
        contentType: fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' : 
                     fileName.endsWith('.webp') ? 'image/webp' : 
                     fileName.endsWith('.png') ? 'image/png' : 
                     fileName.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream'
    });

    if (error) {
        console.error(`Error uploading ${fileName}:`, error.message);
    } else {
        console.log(`✅ Uploaded: ${fileName}`);
    }
}

async function restoreStorage() {
    console.log('Restoring storage files...');
    const storageDir = path.join(BACKUP_DIR, 'storage');
    const buckets = fs.readdirSync(storageDir);

    for (const bucket of buckets) {
        const bucketPath = path.join(storageDir, bucket);
        if (!fs.statSync(bucketPath).isDirectory()) continue;

        const files = fs.readdirSync(bucketPath);
        console.log(`Uploading ${files.length} files to ${bucket}...`);
        
        for (const file of files) {
            const filePath = path.join(bucketPath, file);
            await uploadFile(bucket, filePath, file);
        }
    }
}

async function runRestore() {
  await restoreProfiles();
  await restoreStorage();
  console.log('✅ RESTORATION COMPLETE');
}

runRestore().catch(console.error);
