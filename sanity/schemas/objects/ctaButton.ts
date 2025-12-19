import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Internal path (e.g., /contact) or external URL',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Green)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      link: 'link',
    },
    prepare({ title, link }) {
      return {
        title: title || 'Button',
        subtitle: link,
      }
    },
  },
})
