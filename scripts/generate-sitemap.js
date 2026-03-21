import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://zdiosdkoxcimlovewroz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkaW9zZGtveGNpbWxvdmV3cm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDYyNjYsImV4cCI6MjA4NTYyMjI2Nn0.YwJqsPmFPlCpCvd2V1ElJscRWkNMeepRb98p4rTqTes";

const BASE_URL = "https://www.hexescortsug.xyz";
const TODAY = new Date().toISOString().split("T")[0];

const STATIC_PAGES = [
  { path: "/",               priority: "1.0", changefreq: "daily" },
  { path: "/location",       priority: "0.9", changefreq: "daily" },
  { path: "/location/kampala",  priority: "0.9", changefreq: "daily" },
  { path: "/location/entebbe",  priority: "0.8", changefreq: "daily" },
  { path: "/location/jinja",    priority: "0.8", changefreq: "daily" },
  { path: "/location/mbarara",  priority: "0.8", changefreq: "daily" },
  { path: "/become-escort",  priority: "0.7", changefreq: "weekly" },
  { path: "/about",          priority: "0.6", changefreq: "weekly" },
  { path: "/faq",            priority: "0.6", changefreq: "weekly" },
];

function urlEntry({ loc, lastmod, changefreq, priority, image }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${
    image
      ? `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
    </image:image>`
      : ""
  }
  </url>`;
}

async function generate() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, name, location, profile_image, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("⚠️  Could not fetch profiles from Supabase:", error.message);
    console.warn("   Sitemap will only contain static pages.");
  }

  const staticEntries = STATIC_PAGES.map((page) =>
    urlEntry({
      loc: `${BASE_URL}${page.path}`,
      lastmod: TODAY,
      changefreq: page.changefreq,
      priority: page.priority,
      image:
        page.path === "/"
          ? {
              loc: `${BASE_URL}/lovable-uploads/c239adf5-9d90-4d71-aabe-1eacedc3bc09.png`,
              title: "Uganda's Premier Escort Directory",
            }
          : null,
    })
  );

  const profileEntries = (profiles || []).map((p) => {
    const lastmod = p.updated_at
      ? p.updated_at.split("T")[0]
      : TODAY;
    return urlEntry({
      loc: `${BASE_URL}/profile/db-${p.id}`,
      lastmod,
      changefreq: "weekly",
      priority: "0.7",
      image:
        p.profile_image && p.profile_image !== "/placeholder.svg"
          ? { loc: p.profile_image, title: `${p.name} – ${p.location} Escort` }
          : null,
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...staticEntries, ...profileEntries].join("\n")}
</urlset>`;

  const outPath = resolve(__dirname, "../public/sitemap.xml");
  writeFileSync(outPath, xml, "utf-8");
  console.log(
    `✅ Sitemap generated: ${staticEntries.length} static + ${profileEntries.length} profile URLs → public/sitemap.xml`
  );
}

generate().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});
