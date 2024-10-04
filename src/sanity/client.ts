import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "l7whyd9g",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
