"use server"

import {sanityClient} from "@lib/sanity/client"
import {PAGE_BY_SLUG, ALL_PAGE_SLUGS} from "@lib/sanity/queries"

export type CmsPage = {
  _id: string
  title: string
  slug: string
  description?: string
  content?: any[]
}

export const getCmsPageBySlug = async (slug: string): Promise<CmsPage | null> => {
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
    return null
  }

  return sanityClient.fetch<CmsPage | null>(PAGE_BY_SLUG, {slug})
}

export const getAllCmsPageSlugs = async (): Promise<string[]> => {
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
    return []
  }

  return sanityClient.fetch<string[]>(ALL_PAGE_SLUGS)
}
