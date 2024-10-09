import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-03-07",
  useCdn: true,
  token: process.env.TOKEN
  // Set to false if statically generating pages, using ISR or tag-based revalidation
})
