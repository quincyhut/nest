import { createClient, type SanityClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Check if Sanity is configured
export const isSanityConfigured = Boolean(projectId)

// Create client only if configured, otherwise create a mock client
export const client: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : ({
      fetch: async () => null,
    } as unknown as SanityClient)

// Preview client for draft content
export const previewClient: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : ({
      fetch: async () => null,
    } as unknown as SanityClient)

export const getClient = (preview?: boolean) => (preview ? previewClient : client)
