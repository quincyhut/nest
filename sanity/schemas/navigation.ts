import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
            }),
            defineField({
              name: 'isHighlighted',
              title: 'Highlighted (Button Style)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'mobileContactTitle',
      title: 'Mobile Contact Title',
      type: 'string',
      initialValue: 'רוצים לדבר איתנו?',
    }),
    defineField({
      name: 'mobileContactSubtext',
      title: 'Mobile Contact Subtext',
      type: 'string',
      initialValue: 'צוות NEST זמין לשאלות, לייעוץ ולהצטרפות.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
