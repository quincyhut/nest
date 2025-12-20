import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyvoxvfy',
  dataset: 'staging',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Pattern configurations per page based on original design
const pagePatterns: Record<string, Array<{
  _key: string
  enabled: boolean
  position: string
  color: string
  opacity: number
}>> = {
  // Homepage: all 3 patterns
  home: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: true, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
  // About: only top-left
  about: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: false, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: false, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
  // Parents: swapped colors - topRight is green, bottomRight is light
  parents: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: true, position: 'topRight', color: '#508B58', opacity: 33 },
    { _key: 'bottomRight', enabled: true, position: 'bottomRight', color: '#EDF2EC', opacity: 100 },
  ],
  // Insurance: standard pattern (same as homepage)
  insurance: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: true, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
  // FAQ: standard pattern (same as homepage)
  faq: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: true, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
  // Contact: standard pattern (same as homepage)
  contact: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: true, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
  // Partners: only top-left
  partners: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: false, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: false, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
  // Privacy: only top-left
  privacy: [
    { _key: 'topLeft', enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 100 },
    { _key: 'topRight', enabled: false, position: 'topRight', color: '#EDF2EC', opacity: 100 },
    { _key: 'bottomRight', enabled: false, position: 'bottomRight', color: '#508B58', opacity: 33 },
  ],
}

async function updatePatterns() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('SANITY_API_TOKEN is required')
    process.exit(1)
  }

  const pages = await client.fetch('*[_type == "page"] { _id, title, "slug": slug.current, isHomepage }')

  for (const page of pages) {
    const slug = page.isHomepage ? 'home' : page.slug
    const patterns = pagePatterns[slug]

    if (patterns) {
      await client.patch(page._id).set({ backgroundPatterns: patterns }).commit()
      console.log(`✓ Updated patterns for: ${page.title} (${slug})`)
      console.log(`  - TopLeft: ${patterns[0].enabled ? patterns[0].color + ' @ ' + patterns[0].opacity + '%' : 'disabled'}`)
      console.log(`  - TopRight: ${patterns[1].enabled ? patterns[1].color + ' @ ' + patterns[1].opacity + '%' : 'disabled'}`)
      console.log(`  - BottomRight: ${patterns[2].enabled ? patterns[2].color + ' @ ' + patterns[2].opacity + '%' : 'disabled'}`)
    } else {
      console.log(`⚠ No pattern config for: ${page.title} (${slug})`)
    }
  }

  console.log('\nAll pages updated with correct background patterns!')
}

updatePatterns().catch(console.error)
