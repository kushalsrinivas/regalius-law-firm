import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/attorneys`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch practice areas dynamically
  let practiceAreas: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${baseUrl}/api/practice-areas`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (res.ok) {
      const data = await res.json()
      practiceAreas = data.practiceAreas.map((area: any) => ({
        url: `${baseUrl}/practice-areas/${area.slug}`,
        lastModified: new Date(area.updatedAt || area.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.85, // High priority for practice areas
      }))
    }
  } catch (error) {
    console.error('Failed to fetch practice areas for sitemap:', error)
  }

  // Fetch services dynamically
  let services: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${baseUrl}/api/services`, { 
      next: { revalidate: 3600 }
    })
    if (res.ok) {
      const data = await res.json()
      services = data.services.map((service: any) => ({
        url: `${baseUrl}/service-details/${service.slug}`,
        lastModified: new Date(service.updatedAt || service.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch services for sitemap:', error)
  }

  // Fetch attorneys dynamically
  let attorneys: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${baseUrl}/api/attorneys`, { 
      next: { revalidate: 3600 }
    })
    if (res.ok) {
      const data = await res.json()
      attorneys = data.attorneys.map((attorney: any) => ({
        url: `${baseUrl}/attorneys/${attorney.slug}`,
        lastModified: new Date(attorney.updatedAt || attorney.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch attorneys for sitemap:', error)
  }

  // Fetch blogs dynamically
  let blogs: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${baseUrl}/api/blogs`, { 
      next: { revalidate: 3600 }
    })
    if (res.ok) {
      const data = await res.json()
      blogs = data.blogs.map((blog: any) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error)
  }

  return [
    ...staticPages,
    ...practiceAreas,
    ...services,
    ...attorneys,
    ...blogs,
  ]
}

