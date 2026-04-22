import { defineCollection, z } from 'astro:content';

const apps = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum(['live', 'coming-soon', 'beta']),
    shopifyUrl: z.string().url().optional(),
    logo: z.string().optional(),
    rating: z.number().nullable().optional(),
    reviewCount: z.number().nullable().optional(),
    features: z.array(z.string()),
    pricing: z.object({
      free: z.string().optional(),
      paid: z.array(z.object({
        name: z.string(),
        price: z.string(),
        includes: z.array(z.string())
      })).optional()
    }),
    competitors: z.array(z.object({
      name: z.string(),
      url: z.string().optional(),
      pricing: z.string(),
      strength: z.string(),
      weakness: z.string()
    })).optional(),
    keywords: z.array(z.string()),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string()
    })).optional(),
    testimonials: z.array(z.object({
      quote: z.string(),
      author: z.string(),
      rating: z.number()
    })).optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional()
  })
});

const listicles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date(),
    heroImage: z.string().optional(),
    entries: z.array(z.object({
      rank: z.number(),
      name: z.string(),
      tagline: z.string(),
      isOurs: z.boolean().default(false),
      pricing: z.string(),
      rating: z.number().nullable().optional(),
      bestFor: z.string(),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
      url: z.string().optional()
    })),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string()
    }))
  })
});

const comparisons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ourApp: z.string(),
    competitor: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date(),
    verdictSummary: z.string(),
    matrix: z.array(z.object({
      feature: z.string(),
      ours: z.string(),
      theirs: z.string()
    })),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string()
    }))
  })
});

const howto = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    relatedApp: z.string().optional(),
    publishedAt: z.date(),
    updatedAt: z.date(),
    readingTime: z.number().optional()
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.string().default('Win-Win Apps'),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { apps, listicles, comparisons, howto, blog };
