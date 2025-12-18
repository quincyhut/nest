import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lyvoxvfy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('SANITY_API_TOKEN is required to delete documents')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// IDs of older duplicate pages to delete (created at 20:14-20:15)
const duplicateIds = [
  'fJXfQL6SQOxLJJo5a4vNMN', // אודות (old)
  'yF0MRMAlPLbkU9RvPAuSED', // דף הבית (old)
  'jXePv2PWJu0qR7gBcwllkF', // מדיניות פרטיות (old)
  'fJXfQL6SQOxLJJo5a4vRuc', // מידע להורים (old)
  'jXePv2PWJu0qR7gBcwlglL', // פירוט ביטוחי (old)
  'yF0MRMAlPLbkU9RvPAuUAD', // צרו קשר (old)
  'fJXfQL6SQOxLJJo5a4vQYR', // שאלות ותשובות (old)
  'fJXfQL6SQOxLJJo5a4vTab', // שותפים מקצועי (old)
]

async function cleanup() {
  console.log('Deleting duplicate pages...')

  for (const id of duplicateIds) {
    try {
      await client.delete(id)
      console.log(`✓ Deleted: ${id}`)
    } catch (error) {
      console.error(`✗ Failed to delete ${id}:`, error)
    }
  }

  console.log('\nCleanup complete!')

  // Verify remaining pages
  const remaining = await client.fetch('*[_type == "page"] | order(title asc) { _id, title, "slug": slug.current }')
  console.log('\nRemaining pages:')
  remaining.forEach((p: { _id: string; title: string; slug: string }) => {
    console.log(`  ${p.title} (${p.slug})`)
  })
}

cleanup().catch(console.error)
