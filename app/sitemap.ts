import { MetadataRoute } from 'next'
import { fetchAllProfiles } from '@/data/allProfiles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.hexescortsug.xyz'
  
  // Fetch profiles dynamically from the DB
  const profiles = await fetchAllProfiles()
  
  const profileUrls = profiles.map((p) => ({
    url: `${baseUrl}/profile/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cities = ['kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale']
  const kampalaSuburbs = [
    "banda", "bugolobi", "bukesa", "bukoto", "bunamwaya", "bunga", 
    "busega", "buwate", "buziga", "bwaise", "central", "ggaba", "kabalagala", "kabowa", 
    "kamwokya", "kansanga", "kanyanya", "kasubi", "katooke", 
    "kawempe", "kazo", "kibuli", "kireka", "kirinnya", "kisaasi", "kisugu", 
    "kitintale", "kiwatule", "kololo", "komamboga", "kulambiro", "kyaliwajjala", 
    "kyambogo", "kyanja", "kyebando", "lubaga", "lugala", "lugogo", "lungujja", 
    "luzira", "makerere", "makindye", "masajja", "masanafu", "mbuya", 
    "mengo", "mpererwe", "mulago", "munyonyo", "mutundwe", "mutungo", 
    "muyenga", "naalya", "nabulagala", "nabweru", "naguru", "najjanankumbi", 
    "najjera", "nakasero", "nakawa", "nakulabye", "namasuba", "namirembe", 
    "namungoona", "namuwongo", "nateete", "nsambya", "ntinda", "wandegeya"
  ]

  const locationUrls = cities.map((city) => ({
    url: `${baseUrl}/location/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const suburbUrls = kampalaSuburbs.map((suburb) => ({
    url: `${baseUrl}/location/kampala/${suburb}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...locationUrls,
    ...suburbUrls,
    ...profileUrls,
  ]
}
