import 'server-only'
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'

if (!projectId || !dataset) {
  // We don't throw at import time to avoid breaking non-CMS routes in dev,
  // but CMS pages will check and error gracefully if missing.
}

export const sanityClient = createClient({
  projectId: projectId!,
  dataset: dataset!,
  apiVersion,
  useCdn: true,
})
