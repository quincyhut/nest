import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'NEST',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color (Hex)',
      type: 'string',
      initialValue: '#508b58',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@nestinsure.co.il',
    }),
    defineField({
      name: 'copyrightYear',
      title: 'Copyright Year',
      type: 'string',
      initialValue: '2025',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'רוצים לדבר איתנו?',
    }),
    defineField({
      name: 'footerSubtext',
      title: 'Footer Subtext',
      type: 'string',
      initialValue: 'צוות NEST זמין לשאלות, לייעוץ ולהצטרפות.',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
})
