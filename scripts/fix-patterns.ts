import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyvoxvfy',
  dataset: 'staging',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Correct background patterns matching original design
const correctPatterns = [
  {
    _key: 'bottomRight',
    enabled: true,
    position: 'bottomRight',
    color: '#508B58',
    opacity: 33, // 33% for green
  },
  {
    _key: 'topLeft',
    enabled: true,
    position: 'topLeft',
    color: '#EDF2EC',
    opacity: 100, // 100% for light grey-green
  },
  {
    _key: 'topRight',
    enabled: true,
    position: 'topRight',
    color: '#EDF2EC',
    opacity: 100, // 100% for light grey-green
  },
]

async function updatePatterns() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('SANITY_API_TOKEN is required')
    process.exit(1)
  }

  const pages = await client.fetch('*[_type == "page"] { _id, title }')

  for (const page of pages) {
    await client.patch(page._id).set({ backgroundPatterns: correctPatterns }).commit()
    console.log(`Updated patterns for: ${page.title}`)
  }

  console.log('\nAll pages updated with correct background patterns!')
}

updatePatterns().catch(console.error)
