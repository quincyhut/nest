import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featureListBlock',
  title: 'Feature List',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
            defineField({
              name: 'hasIcon',
              title: 'Has Custom Icon',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              hidden: ({ parent }) => !parent?.hasIcon,
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'listStyle',
      title: 'List Style',
      type: 'string',
      options: {
        list: [
          { title: 'Bullet Points', value: 'bullet' },
          { title: 'No Bullets', value: 'none' },
        ],
      },
      initialValue: 'bullet',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Feature List',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
