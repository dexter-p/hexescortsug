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

async function backupTable(tableName) {
  console.log(`Backing up table: ${tableName}...`);
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error(`Error backing up table ${tableName}:`, error);
    return;
  }
  fs.writeFileSync(
    path.join(BACKUP_DIR, `${tableName}.json`),
    JSON.stringify(data, null, 2)
  );
  console.log(`✅ Table ${tableName} backed up.`);
}

async function downloadFile(bucket, fileName) {
  const filePath = path.join(BACKUP_DIR, 'storage', bucket, fileName);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Skipping ${fileName} (already exists)`);
    return;
  }

  const { data, error } = await supabase.storage.from(bucket).download(fileName);
  if (error) {
    console.error(`Error downloading ${fileName} from ${bucket}:`, error);
    return;
  }

  const buffer = Buffer.from(await data.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ Downloaded: ${fileName}`);
}

const filesToDownload = [
  {"name":"21304f02-5886-44e1-a78a-9d632985e059-0.9450942297021463.jpg","bucket_id":"avatars"},
  {"name":"2b6e8ad5-6f78-4cde-a8cd-bd3769cc6900-0.7668916711807351.webp","bucket_id":"avatars"},
  {"name":"57ea90e2-5612-4334-8f26-1539f0633316-0.710948972602206.jpg","bucket_id":"avatars"},
  {"name":"7b57894a-f642-46a1-8950-904de4103843-0.2685750007733684.png","bucket_id":"avatars"},
  {"name":"7f64d673-5aa8-4b4e-9af6-24a21063e2ca-0.5510574834747994.jpg","bucket_id":"avatars"},
  {"name":"7f64d673-5aa8-4b4e-9af6-24a21063e2ca-0.612878943539783.jpg","bucket_id":"avatars"},
  {"name":"de8a040a-849d-4b1f-88b3-253e5a6a4fb7-0.19235708472285562.jfif","bucket_id":"avatars"},
  {"name":"ec73e9ed-b222-4ade-968a-ce91a350c132-1c0497b2-c528-4f81-929f-96aa5bdec83b.jpg","bucket_id":"avatars"},
  {"name":"ec73e9ed-b222-4ade-968a-ce91a350c132-7ed19eaf-2322-4521-9bf6-e9b1872bac54.jpg","bucket_id":"avatars"},
  {"name":"ec73e9ed-b222-4ade-968a-ce91a350c132-7fb55ccb-a7a0-44b7-ab2d-9eca5f64a143.jpg","bucket_id":"avatars"},
  {"name":"ec73e9ed-b222-4ade-968a-ce91a350c132-9e995701-bdec-48d8-a418-2b0c5b1e8117.jpg","bucket_id":"avatars"},
  {"name":"ec73e9ed-b222-4ade-968a-ce91a350c132-df119c4a-ab7d-4d14-a9cd-2d192650e601.jpg","bucket_id":"avatars"},
  {"name":"ec87b581-39ad-41b5-aa9a-62a3578ca615-6549d93c-fa84-4564-813c-30f413c4948d.jpeg","bucket_id":"avatars"},
  {"name":"f0b4ea0c-4118-4e4d-a03e-b5736a1b7643-0.8753667844670324.jfif","bucket_id":"avatars"},
  {"name":"f43ec825-1be3-4a2e-9cc1-17cca4e4d4da-0337f55c-6459-46f4-9fb0-800e0cc4e0d8.jpg","bucket_id":"avatars"},
  {"name":"f43ec825-1be3-4a2e-9cc1-17cca4e4d4da-a7e6c551-2724-4082-b615-85e6f1f569a0.webp","bucket_id":"avatars"},
  {"name":"1775299005357-w1fqh2rrnj.jpg","bucket_id":"profile-images"},
  {"name":"1775299014804-t0wfezqvus.jpg","bucket_id":"profile-images"},
  {"name":"1775299048506-xy18auq6ql.jpg","bucket_id":"profile-images"},
  {"name":"1775299062736-hrif9c8y625.jpg","bucket_id":"profile-images"},
  {"name":"1775299155080-9fvozjvg8qa.jpg","bucket_id":"profile-images"},
  {"name":"1775299158358-gs7fntyj2k.jpg","bucket_id":"profile-images"},
  {"name":"1775299269076-x4uyilvg9jm.jpg","bucket_id":"profile-images"},
  {"name":"1775299346495-esq8npo722m.jpg","bucket_id":"profile-images"},
  {"name":"1775299377420-i802aitjrwg.jpg","bucket_id":"profile-images"},
  {"name":"1775299464236-airrssifn79.jpg","bucket_id":"profile-images"},
  {"name":"1775299501964-xvbwmxpjl3r.jpg","bucket_id":"profile-images"},
  {"name":"1775299515727-w5ehhxn95vj.jpg","bucket_id":"profile-images"},
  {"name":"1775299595463-jwwoh16vtj.jpg","bucket_id":"profile-images"},
  {"name":"1775299623817-2p6u8ocpyvg.jpg","bucket_id":"profile-images"},
  {"name":"1775299672768-64e5r3l6h4p.jpg","bucket_id":"profile-images"},
  {"name":"1775299683174-mqh8wut6n2n.jpg","bucket_id":"profile-images"},
  {"name":"1775299691619-zhu6qtw7blm.mp4","bucket_id":"profile-images"},
  {"name":"1775299699560-dbt6k0i1ies.mp4","bucket_id":"profile-images"},
  {"name":"1775299795710-wum9yr5k4a7.jpg","bucket_id":"profile-images"},
  {"name":"1775299805874-hskeoyv8zx.jpg","bucket_id":"profile-images"},
  {"name":"1775299813232-54b1fpqctw.jpg","bucket_id":"profile-images"},
  {"name":"1775299815729-4ngz7gofego.jpg","bucket_id":"profile-images"},
  {"name":"1775299918040-szeso3o9fv.jpg","bucket_id":"profile-images"},
  {"name":"1775299999807-rr7tt1p214.jpg","bucket_id":"profile-images"},
  {"name":"1775300097389-6gcrxoocmdt.jpg","bucket_id":"profile-images"},
  {"name":"1775300106497-qiscfekxm6.jpg","bucket_id":"profile-images"},
  {"name":"1775300137198-ot8m0mya87r.jpg","bucket_id":"profile-images"},
  {"name":"1775300241184-pghfhr099y.jpg","bucket_id":"profile-images"},
  {"name":"1775300276356-tmdyb58c29.jpg","bucket_id":"profile-images"},
  {"name":"1775300305791-qt9zpbdx5w.jpg","bucket_id":"profile-images"},
  {"name":"1775300365181-05xxh8ofpx6.jpg","bucket_id":"profile-images"},
  {"name":"1775300536281-tsw5rih2cjl.jpg","bucket_id":"profile-images"},
  {"name":"1775300541744-hps6slj23iu.jpg","bucket_id":"profile-images"},
  {"name":"1775300595938-fzkt4tbji0i.jpg","bucket_id":"profile-images"},
  {"name":"1775300605030-qkaft94vd1b.jpg","bucket_id":"profile-images"},
  {"name":"1775300701643-pln1ddo08jf.jpg","bucket_id":"profile-images"},
  {"name":"1775300728800-4vv33lk71ok.jpg","bucket_id":"profile-images"},
  {"name":"1775300786206-mf9bibqc1h.mp4","bucket_id":"profile-images"},
  {"name":"1775300903484-hdf182brj5.jpg","bucket_id":"profile-images"},
  {"name":"1775300947706-zz59f63n7b.jpg","bucket_id":"profile-images"},
  {"name":"1775300955829-p7s7p2mpgnc.jpg","bucket_id":"profile-images"},
  {"name":"1775300961695-9xul6v5fxud.jpg","bucket_id":"profile-images"},
  {"name":"1775300963193-kpjf4zgkpq.jpg","bucket_id":"profile-images"},
  {"name":"1775300966727-tyko8fot3po.jpg","bucket_id":"profile-images"},
  {"name":"1775300974924-4cpowmlivkn.jpg","bucket_id":"profile-images"},
  {"name":"1775300984305-cahnxx3osdd.mp4","bucket_id":"profile-images"},
  {"name":"1775300990073-oc09ima8lat.jpg","bucket_id":"profile-images"},
  {"name":"1775301016113-3f70iz6uso.jpg","bucket_id":"profile-images"},
  {"name":"1775301021296-8txm48d6rke.jpg","bucket_id":"profile-images"},
  {"name":"1775301070206-ue4eh1l2gh.mp4","bucket_id":"profile-images"},
  {"name":"1775301234756-zofu8caqjyi.jpg","bucket_id":"profile-images"},
  {"name":"1775301246795-gpsdltirw5.jpg","bucket_id":"profile-images"},
  {"name":"1775301376168-7dnlq3wzmb9.jpg","bucket_id":"profile-images"},
  {"name":"1775301386593-meocgoht7nb.jpg","bucket_id":"profile-images"},
  {"name":"1775301393537-m7kg5v486tr.jpg","bucket_id":"profile-images"},
  {"name":"1775301401678-b92oqz423cg.jpg","bucket_id":"profile-images"},
  {"name":"1775301582935-80p53dh3jja.jpg","bucket_id":"profile-images"},
  {"name":"1775301633224-h3zuu65btmi.jpg","bucket_id":"profile-images"},
  {"name":"1775301642969-roidq0cpex9.jpg","bucket_id":"profile-images"},
  {"name":"1775301648895-eqb050iw18i.jpg","bucket_id":"profile-images"},
  {"name":"1775301765700-tl7o485lk5a.jpg","bucket_id":"profile-images"},
  {"name":"1775301778082-ckn510wyvx.jpg","bucket_id":"profile-images"},
  {"name":"1775301819040-2w0dyzbwyiw.jpg","bucket_id":"profile-images"},
  {"name":"1775302045009-0q1c1qhdrf8.jpg","bucket_id":"profile-images"},
  {"name":"1775302053100-99wk1pbkmuc.jpg","bucket_id":"profile-images"},
  {"name":"1775302061650-6j57wnv2z8.jpg","bucket_id":"profile-images"},
  {"name":"1775302067326-1tau877uh64.jpg","bucket_id":"profile-images"},
  {"name":"1775302189065-qv1sdayd19f.jpg","bucket_id":"profile-images"},
  {"name":"1775302211720-erxv89wq0c5.jpg","bucket_id":"profile-images"},
  {"name":"1775302323653-b7szrlss06c.jpg","bucket_id":"profile-images"},
  {"name":"1775302329710-ad72ilzdpv.jpg","bucket_id":"profile-images"},
  {"name":"1775302490810-mxo3skz8k6.jpg","bucket_id":"profile-images"},
  {"name":"1775302513305-njbx0rsymsg.mp4","bucket_id":"profile-images"},
  {"name":"1775302590917-gme6m2fk7ia.jpg","bucket_id":"profile-images"},
  {"name":"1775302598603-lo11uxa6el.jpg","bucket_id":"profile-images"},
  {"name":"1775302727752-xfc5hx8jj1i.jpg","bucket_id":"profile-images"},
  {"name":"1775302735632-55la8k4gm4m.jpg","bucket_id":"profile-images"},
  {"name":"1775302743005-ar3vv0zdbxs.mp4","bucket_id":"profile-images"},
  {"name":"1775302850675-2365fxl6r0h.jpg","bucket_id":"profile-images"},
  {"name":"1775302856147-gnv5kgsfu5u.jpg","bucket_id":"profile-images"},
  {"name":"1775303165775-nnapdcneqw.jpg","bucket_id":"profile-images"},
  {"name":"1775303179145-62lfzvg82vy.jpg","bucket_id":"profile-images"},
  {"name":"1775303192204-5g6ca8bnb9p.jpg","bucket_id":"profile-images"},
  {"name":"1775303199976-nisqq9qnggh.jpg","bucket_id":"profile-images"},
  {"name":"1775303208215-v1b6a6e0hej.mp4","bucket_id":"profile-images"},
  {"name":"1775303224068-hcy2gbl4hio.jpg","bucket_id":"profile-images"},
  {"name":"1775303543643-6yjsfyv2aub.jpg","bucket_id":"profile-images"},
  {"name":"1775304166134-40y3nktuwt7.jpg","bucket_id":"profile-images"},
  {"name":"1775304221823-dnutudt7x6l.jpg","bucket_id":"profile-images"},
  {"name":"1775304228200-3ldo5ej7dz4.jpg","bucket_id":"profile-images"},
  {"name":"1775304250574-3dte6ok788n.jpg","bucket_id":"profile-images"},
  {"name":"1775304264835-jth3mc6rj1.jpg","bucket_id":"profile-images"},
  {"name":"1775304279661-h9g46t6367s.jpg","bucket_id":"profile-images"},
  {"name":"1775306523787-ls2ia005mr9.jpg","bucket_id":"profile-images"},
  {"name":"1775306594528-o24jk4qb8y7.jpg","bucket_id":"profile-images"},
  {"name":"1775330487708-h6qfb4wzrkp.jpg","bucket_id":"profile-images"},
  {"name":"1775376366422-o4ddattcz8.jpg","bucket_id":"profile-images"},
  {"name":"1775376379045-mv0z2shp6z.jpg","bucket_id":"profile-images"},
  {"name":"1775383126879-onu1k02tvzn.jpg","bucket_id":"profile-images"},
  {"name":"1775388153156-w48lximt3c.jpg","bucket_id":"profile-images"},
  {"name":"1775388197658-vvdjttb6fhm.jpg","bucket_id":"profile-images"},
  {"name":"1775430367662-1cdhkr6xad7.jpg","bucket_id":"profile-images"},
  {"name":"1775430840575-u83l3sbztcf.jpg","bucket_id":"profile-images"},
  {"name":"1775939810646-id4g18u0j8.jpg","bucket_id":"profile-images"},
  {"name":"1775939835821-o9h48ia5fsg.mp4","bucket_id":"profile-images"},
  {"name":"1775939877011-fhj57o3s8xk.mp4","bucket_id":"profile-images"},
  {"name":"1776250857419-2l7bchjhcqa.jpg","bucket_id":"profile-images"},
  {"name":"1776250950531-xxt7ooy7qk.mp4","bucket_id":"profile-images"},
  {"name":"1776251180548-v5dq5l0ypaf.jpg","bucket_id":"profile-images"},
  {"name":"1776251196960-f4ohh2f6ac9.jpg","bucket_id":"profile-images"},
  {"name":"1776251250880-mshkqvkf0tb.jpg","bucket_id":"profile-images"},
  {"name":"1776251502209-3k879238r2f.jpg","bucket_id":"profile-images"},
  {"name":"1776251554745-gsbq2k4pw9j.jpg","bucket_id":"profile-images"},
  {"name":"1776324934476-lld6i95gcwm.jpg","bucket_id":"profile-images"},
  {"name":"1776324973786-nt7cfiu7cg.jpg","bucket_id":"profile-images"},
  {"name":"1776325019107-jalhenfwtsl.jpg","bucket_id":"profile-images"},
  {"name":"1776328643970-iquv4jd72dj.jpg","bucket_id":"profile-images"},
  {"name":"1776328687368-11us12nxan9.mp4","bucket_id":"profile-images"},
  {"name":"1776367704012-rasa4oux6um.jpg","bucket_id":"profile-images"},
  {"name":"1776367731615-tju7piadu4i.jpg","bucket_id":"profile-images"},
  {"name":"1776369446364-jhtpwtiolch.jpg","bucket_id":"profile-images"},
  {"name":"1776369595911-1n5l6ronuzz.jpg","bucket_id":"profile-images"}
];

async function runBackup() {
  await backupTable('profiles');
  await backupTable('user_roles');
  
  console.log(`Starting download of ${filesToDownload.length} files...`);
  for (const file of filesToDownload) {
    await downloadFile(file.bucket_id, file.name);
  }
  console.log('✅ ALL BACKUPS COMPLETE.');
}

runBackup().catch(console.error);
