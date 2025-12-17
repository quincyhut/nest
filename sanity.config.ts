import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Sanity Studio requires these values - they're safe to expose (public project identifiers)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lyvoxvfy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'staging'

// Custom structure for singleton documents
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      // Singleton: Navigation
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),

      S.divider(),

      // Pages - regular list
      S.documentTypeListItem('page').title('Pages'),
    ])

export default defineConfig({
  name: 'nest-studio',
  title: 'NEST Content Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
