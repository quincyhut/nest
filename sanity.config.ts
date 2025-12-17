import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Sanity Studio requires these values - they're safe to expose (public project identifiers)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lyvoxvfy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging'

export default defineConfig({
  name: 'nest-studio',
  title: 'NEST Content Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
