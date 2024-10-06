import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "l7whyd9g",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
  token: "skiv2BTjJJBYd4JNz74gy5t7NBGNLnLL37nWzukDBn7i3aGwhjhjcYv9DTb0BxQGHFsodTmwhJWGrLN8yVrPuY7YlAWmVeQje8M89fnaX0xDsCEc4QxxRYRXv5X8qxP4aw4lS2idZYbA1MzC50zwPAG2YBZQT6eZx8jgSBWOJOxIOAGcbhs6"
  // Set to false if statically generating pages, using ISR or tag-based revalidation
})
