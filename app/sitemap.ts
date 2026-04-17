import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.hexescortsug.xyz'

// Static profile IDs from the database backup.
// This ensures the sitemap ALWAYS works even if Supabase is down.
// Update this list when you add new profiles.
const PROFILE_IDS = [
  "2007e5c8-daee-4b84-89ef-3fd7be4db279",
  "01ea2985-2bc1-459e-a08c-289c2dc157a8",
  "b74aa325-8c81-44bd-8720-bf0aa23597a5",
  "2178ebb1-e061-4aec-9446-5c83d64bb505",
  "228840cf-065b-4568-b636-a27be90343bc",
  "c8fd13ef-c553-4e99-a99b-89ecca5bc707",
  "5cb8c468-775d-4d2c-a9d2-08a1fd52d0a9",
  "f8884d1f-9402-428f-a2e4-771b02839dd7",
  "9b5866c6-b788-4ff1-bb57-77703ed6714c",
  "1d65e700-b175-41d4-8c81-f22395e6170d",
  "3f4bd7bf-e4b8-4631-be03-05fa65157dfd",
  "138eef54-9c0c-4fb2-a035-1ae9b66669ac",
  "4b625482-765f-4e25-8de8-809d274f1130",
  "cf1c260c-d1ea-4939-8ba7-b916395774ed",
  "43a9317f-3a4b-4fef-8694-464548b3f0a0",
  "67637d3e-e48a-48a2-8a68-db8e04fac8d8",
  "ab88686d-01df-4feb-8eea-c397e63bc3a2",
  "ad613b34-86ed-4549-8890-f98161d45aec",
  "6dffeabc-75e8-42f3-a5c3-94610ac7faae",
  "fc4e081b-bc54-4dc6-9f24-7710e253fee2",
  "38f78722-925b-478d-a6f1-7fddf00b2862",
  "4ccf90fb-440f-4563-be7f-a635af52cced",
  "f3edbc13-5107-4aa9-a723-db9bbc833372",
  "4b70c23c-757b-4674-917b-76667cdfdc5b",
  "fc5f3d44-17ee-4359-b33b-183be800bdcc",
  "44798490-9a99-421b-90ad-40638e1dfc0d",
  "79311fa0-a8bd-402d-ba51-19793d5541ff",
  "ec5cd15e-c225-4250-b5fb-b465d52bac0b",
  "08155db7-ed47-4f96-becd-3659ccda2d17",
  "4c272994-00be-4fe1-a8c5-ff4c2d8ebc20",
  "00e10dfb-b888-4748-a357-d17c1e5b4e40",
  "d8aa96bb-19fe-4afd-adf9-04ea39ddaf11",
  "567dc084-fe58-4fd4-b6f4-237fce4e103b",
  "d4391c41-2c1b-4600-ba4d-e62b949db6bf",
  "541d15d0-c0c0-480c-ac56-b47da6762695",
  "1cb0ece8-726c-4a4a-b404-d41cb607bec5",
  "68f8139d-333e-4825-9a11-2873b3039a34",
  "18500d89-65de-442f-9eed-370a266defcb",
  "1a94a013-f251-47c9-b9f0-2292743273ae",
  "6f41a5c6-f442-47d0-8c2d-ae8a4067c73a",
  "f76d89d3-0def-4be3-b2d5-8a33d81b4ce6",
  "3c485a70-d5db-4366-871a-46ebfd10defa",
  "3887a4cf-ea87-419f-9504-61b9b61bc377",
  "43bf8ced-53e6-4ab9-9af1-d4ba8b73fe1f",
  "22edaf7b-2a4e-4703-8d35-679edf1bbe34",
  "54af91c3-9691-4420-b176-9f6951e412bd",
  "613ea9fb-c3a2-43aa-a086-1b8de131fc63",
  "b72ca5e0-f0e5-4eb4-bc52-827385482bfa",
  "ff84648f-0b1a-4bd0-92fc-9cbc3d7b894f",
  "b074025f-bd46-4094-85f8-507b8d9ceea7",
  "47a102ee-a557-4c56-a543-3d23316e0943",
  "beffed36-23e9-428c-922a-ce6cef7bc9ca",
  "c9fb406b-ee06-4f4c-916a-08fcf6e2e68e",
  "c90ab695-4e8d-4a28-93c5-8d9ebd47be10",
  "ff37a478-85d9-4b53-bca4-71e06acbc5b8",
  "abbab417-d002-4957-bd11-3daad5ee5fdb",
  "b4a391c7-1899-4811-bdea-ed2dcf3c7b8a",
  "323e82b5-327c-4cdf-be50-46893d8a4953",
]

const CITIES = ['kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale', 'tororo', 'mukono']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: now, changeFrequency: 'daily',   priority: 1    },
    { url: `${BASE_URL}/about`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE_URL}/faq`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE_URL}/become-escort`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE_URL}/vip`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE_URL}/location`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
  ]

  const locationUrls: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/location/${city}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const profileUrls: MetadataRoute.Sitemap = PROFILE_IDS.map((id) => ({
    url: `${BASE_URL}/profile/${id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...locationUrls, ...profileUrls]
}
