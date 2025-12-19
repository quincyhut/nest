import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for the CMS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path (e.g., "about" for /about). Leave empty for homepage.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'isHomepage',
      title: 'Is Homepage',
      type: 'boolean',
      description: 'Check this if this is the homepage (will be served at /)',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title shown in browser tab and search results',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
    }),
    defineField({
      name: 'backgroundPatterns',
      title: 'Background Patterns',
      type: 'array',
      of: [{ type: 'backgroundPattern' }],
      description: 'Decorative SVG patterns shown behind the page content',
    }),
    defineField({
      name: 'layout',
      title: 'Page Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Hero with Image (standard)', value: 'heroWithImage' },
          { title: 'Two Column Grid', value: 'twoColumn' },
          { title: 'Full Width Content', value: 'fullWidth' },
          { title: 'Privacy/Legal', value: 'privacy' },
          { title: 'Contact Form', value: 'contact' },
        ],
      },
      initialValue: 'heroWithImage',
    }),
    defineField({
      name: 'pageImage',
      title: 'Page Image',
      type: 'object',
      description: 'Main image displayed alongside page content (for heroWithImage layout)',
      fields: [
        defineField({ name: 'image', title: 'Image (Sanity Asset)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imagePath', title: 'Image Path (Local)', type: 'string', description: 'Path to local image (e.g., /page-0/boy.png)' }),
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        defineField({
          name: 'clipType',
          title: 'Clip Type',
          type: 'string',
          options: { list: [{ title: 'Arch', value: 'arch' }, { title: 'Circle', value: 'circle' }] },
          initialValue: 'arch',
        }),
        defineField({ name: 'clipLeft', title: 'Clip Left Half Only', type: 'boolean', initialValue: false }),
        defineField({ name: 'hideOnMobile', title: 'Hide on Mobile', type: 'boolean', initialValue: false }),
      ],
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'textSectionBlock' },
        { type: 'faqBlock' },
        { type: 'iconGridBlock' },
        { type: 'processStepsBlock' },
        { type: 'featureListBlock' },
        { type: 'highlightBoxBlock' },
        { type: 'twoColumnBlock' },
        { type: 'disclaimerBlock' },
        { type: 'privacySectionBlock' },
        { type: 'contactFormBlock' },
        { type: 'ctaButton' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isHomepage: 'isHomepage',
    },
    prepare({ title, slug, isHomepage }) {
      return {
        title: title || 'Untitled Page',
        subtitle: isHomepage ? '/ (Homepage)' : `/${slug || ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
